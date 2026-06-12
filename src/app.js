/**
 * Contrôleur principal — orchestre tous les modules
 */
import { Hex, hexSpiral } from './hex/hex.js';
import { HexMap }         from './hex/hexMap.js';
import { Scene3D }        from './scene/scene3d.js';
import { NanoCharts }     from './charts/charts.js';
import { Nanotube, randomNanotube } from './nanotube/nanotube.js';
import { OmekaClient, loadOmekaConfig, saveOmekaConfig } from './api/omeka.js';

/** Version du format JSON d'import/export */
const MAP_JSON_VERSION = '1.1';

export class App {
  constructor() {
    this.hexMap   = null;
    this.scene3d  = null;
    this.charts   = null;
    this.omeka    = new OmekaClient();
    this.tubes    = new Map();   // hexKey → Nanotube
    this.horizTubes = new Map(); // faceKey → THREE.Group (nanotubes enfants)
    /** faceKey → { tube: Nanotube, center: {x,y,z}, normal: {x,y,z}, centerMode: string } */
    this.horizTubesData = new Map();
    this.hexFaceData = new Map(); // faceKey → { omekaId, templateId, properties }
    this.selectedKey = null;
    this.currentMapId = null;
    this.gridRadius   = 5;
    this.orientation  = 'pointy';
    this.view = '3d';
    this._activeHexFace = null; // { hexKey, hexFaceIdx, hexFacePos, worldPos, … }
  }

  init() {
    this._loadSettings();
    this._initHexMap();
    this._initScene3D();
    this._initCharts();
    this._initUI();
    // Attendre que le layout soit rendu avant de construire la grille
    requestAnimationFrame(() => {
      this._buildGrid();
      this._pingOmeka();
      this._loadOmekaList();
    });
  }

  // ── Initialisation des modules ─────────────────────────────────────

  _initHexMap() {
    const svg = document.getElementById('hex-svg');
    this.hexMap = new HexMap(svg);
    this.hexMap.onSelect(key => this._onHexSelect(key));
    this.hexMap.onAddTube(key => this._addTubeAt(key));
  }

  _initScene3D() {
    const canvas = document.getElementById('canvas-3d');
    this.scene3d = new Scene3D(canvas);
    this.scene3d.onSelect(key => {
      this.hexMap.selectHex(key);
      this._onHexSelect(key);
    });
    this.scene3d.onTubeHexSelect(info => this._onTubeHexSelect(info));
  }

  _initCharts() {
    this.charts = new NanoCharts(
      document.getElementById('chart-distribution'),
      document.getElementById('chart-properties')
    );
  }

  _buildGrid() {
    const hexes = hexSpiral(new Hex(0, 0, 0), this.gridRadius);
    this.hexMap.build(this.gridRadius, this.orientation);
    this.scene3d.buildGrid(hexes, this.orientation);
    this.charts.update(this.tubes);
  }

  // ── Sélection d'hexagone ───────────────────────────────────────────

  _onHexSelect(key) {
    this.selectedKey = key;
    const tube = this.tubes.get(key);
    this._updateTubeEditor(tube);
    this.scene3d.highlightTube(key);
    document.getElementById('selected-hex-label').textContent =
      tube ? `Nanotube (${tube.m},${tube.n}) — ${tube.type}` : `Cellule [${key}]`;
  }

  // ── CRUD Nanotubes ─────────────────────────────────────────────────

  _addTubeAt(hexKey) {
    if (this.tubes.has(hexKey)) { this._onHexSelect(hexKey); return; }
    const tube = randomNanotube(hexKey);
    this._setTube(hexKey, tube);
    this._onHexSelect(hexKey);
  }

  _setTube(hexKey, tube) {
    tube.hexKey = hexKey;
    this.tubes.set(hexKey, tube);
    this.hexMap.setTube(hexKey, tube);
    this.scene3d.setTube(hexKey, tube);
    this.charts.update(this.tubes);
  }

  _removeTube(hexKey) {
    if (!hexKey) return;
    this.tubes.delete(hexKey);
    this.hexMap.removeTube(hexKey);
    this.scene3d.removeTube(hexKey);
    this.charts.update(this.tubes);
    this._updateTubeEditor(null);
    this.selectedKey = null;
  }

  // ── Éditeur de nanotube ────────────────────────────────────────────

  _updateTubeEditor(tube) {
    const m = tube?.m ?? 5, n = tube?.n ?? 5;
    document.getElementById('input-m').value = m;
    document.getElementById('input-n').value = n;
    document.getElementById('input-length').value   = tube?.length   ?? 20;
    document.getElementById('input-rotation').value = tube?.rotation ?? 0;
    document.getElementById('input-color').value    = tube?.color    ?? '#4ade80';
    document.getElementById('length-val').textContent   = tube?.length   ?? 20;
    document.getElementById('rotation-val').textContent = tube?.rotation ?? 0;

    if (tube) {
      const badge = document.getElementById('tube-type-badge');
      badge.textContent = tube.type.charAt(0).toUpperCase() + tube.type.slice(1);
      badge.className = `badge badge-${tube.type}`;
      document.getElementById('prop-diameter').textContent    = `${tube.diameter.toFixed(3)} nm`;
      document.getElementById('prop-conductivity').textContent = tube.conductivity;
      document.getElementById('prop-bandgap').textContent     = tube.isMetallic ? '0 eV' : `${tube.bandGap} eV`;
    } else {
      document.getElementById('tube-type-badge').textContent = '—';
      document.getElementById('tube-type-badge').className = 'badge';
      document.getElementById('prop-diameter').textContent = '—';
      document.getElementById('prop-conductivity').textContent = '—';
      document.getElementById('prop-bandgap').textContent = '—';
    }
  }

  _applyTubeEdits() {
    if (!this.selectedKey) return;
    const m = parseInt(document.getElementById('input-m').value) || 5;
    const n = parseInt(document.getElementById('input-n').value) || 5;
    const existing = this.tubes.get(this.selectedKey) || new Nanotube({ hexKey: this.selectedKey });
    const updated = new Nanotube({
      ...existing.toJSON(),
      m, n,
      length:   parseFloat(document.getElementById('input-length').value)   || 20,
      rotation: parseFloat(document.getElementById('input-rotation').value) || 0,
      color:    document.getElementById('input-color').value,
      hexKey:   this.selectedKey,
    });
    this._setTube(this.selectedKey, updated);
    this._updateTubeEditor(updated);
  }

  // ── Clic sur hexagone du tube ──────────────────────────────────────

  _onTubeHexSelect({ hexKey, hexFaceIdx, hexFacePos, worldPos, hexCenterWorld, hexNormalWorld, faceCentroidWorld, loopCentroidWorld }) {
    this._activeHexFace = { hexKey, hexFaceIdx, hexFacePos, worldPos, hexCenterWorld, hexNormalWorld, faceCentroidWorld, loopCentroidWorld };
    const faceKey = `${hexKey}:${hexFaceIdx}`;

    document.getElementById('hf-tube-key').textContent = hexKey;
    document.getElementById('hf-position').textContent = `i=${hexFacePos.i} j=${hexFacePos.j}`;

    // Calculer les indices du nanotube enfant depuis le cercle inscrit de l'hexagone
    const { m: childM, n: childN, diameterNm } = this._computeChildTubeChirality(hexKey);
    document.getElementById('hf-horiz-m').value = childM;
    document.getElementById('hf-horiz-n').value = childN;
    document.getElementById('hf-horiz-diameter-info').textContent =
      `⌀ inscrit ≈ ${diameterNm.toFixed(3)} nm`;

    // Pré-remplir les champs si données déjà saisies
    const saved = this.hexFaceData.get(faceKey) || {};
    document.getElementById('hf-template-select').value = saved.templateId || '';
    if (saved.templateId) this._renderTemplateFields(saved.properties || []);

    document.getElementById('hf-omeka-status').textContent = '';
    document.getElementById('hex-face-panel').classList.remove('hidden');

    // Charger les templates si pas encore fait
    this._loadTemplates();
  }

  /** Calcule les indices chiraux (armchair) dont le diamètre = cercle inscrit de l'hexagone parent */
  _computeChildTubeChirality(hexKey) {
    const tube = this.tubes.get(hexKey)
               || (this.horizTubesData.get(hexKey)?.tube);
    if (!tube) return { m: 5, n: 5, diameterNm: 0 };
    const NM_TO_SCENE = 2.5;
    const nHex = Math.max(6, tube.n + tube.m);
    const radius = tube.diameter * NM_TO_SCENE * 8 / 2;
    const circumference = 2 * Math.PI * radius;
    const d_scene = circumference / (nHex * Math.sqrt(3));
    const inscribed_d_nm = Math.sqrt(3) * d_scene / (NM_TO_SCENE * 8);
    const n = Math.max(1, Math.round(Math.PI * inscribed_d_nm / (0.246 * Math.sqrt(3))));
    return { m: n, n, diameterNm: inscribed_d_nm };
  }

  async _loadTemplates() {
    const sel = document.getElementById('hf-template-select');
    if (sel.options.length > 1) return;
    try {
      const templates = await this.omeka.listResourceTemplates();
      templates.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.label;
        sel.appendChild(opt);
      });
    } catch { /* Omeka non connecté */ }
  }

  async _onTemplateChange(templateId) {
    document.getElementById('hf-template-fields').innerHTML = '';
    if (!templateId) return;
    try {
      const tpl = await this.omeka.getResourceTemplate(templateId);
      const faceKey = `${this._activeHexFace?.hexKey}:${this._activeHexFace?.hexFaceIdx}`;
      const saved = this.hexFaceData.get(faceKey) || {};
      this._renderTemplateFields(tpl.properties, saved.properties);
    } catch (e) {
      document.getElementById('hf-template-fields').innerHTML =
        `<span style="color:var(--red);font-size:11px">Erreur template: ${e.message}</span>`;
    }
  }

  _renderTemplateFields(properties, savedValues = []) {
    const container = document.getElementById('hf-template-fields');
    container.innerHTML = '';
    properties.forEach(p => {
      const saved = savedValues.find(s => s.term === p.term);
      const label = document.createElement('label');
      label.textContent = p.label || p.term;
      const input = document.createElement('input');
      input.type = 'text';
      input.dataset.term = p.term;
      input.value = saved?.value || '';
      label.appendChild(input);
      container.appendChild(label);
    });
  }

  async _saveHexToOmeka() {
    if (!this._activeHexFace) return;
    const { hexKey, hexFaceIdx, hexFacePos } = this._activeHexFace;
    const faceKey = `${hexKey}:${hexFaceIdx}`;
    const templateId = document.getElementById('hf-template-select').value;
    const inputs = document.querySelectorAll('#hf-template-fields input[data-term]');
    const properties = Array.from(inputs).map(inp => ({ term: inp.dataset.term, value: inp.value }));
    const saved = this.hexFaceData.get(faceKey) || {};

    const hexData = {
      omekaId: saved.omekaId || null,
      templateId,
      title: `Hex ${hexKey} [${hexFacePos.i},${hexFacePos.j}]`,
      hexKey, hexFaceIdx, hexFacePos,
      properties,
    };

    const status = document.getElementById('hf-omeka-status');
    status.textContent = 'Sauvegarde…';
    try {
      const result = await this.omeka.saveHexItem(hexData);
      hexData.omekaId = result?.['o:id'] || hexData.omekaId;
      this.hexFaceData.set(faceKey, hexData);
      status.textContent = `✓ Sauvegardé (Omeka #${hexData.omekaId})`;
    } catch (e) {
      status.style.color = 'var(--red)';
      status.textContent = `✗ ${e.message}`;
    }
  }

  _spawnChildTube() {
    if (!this._activeHexFace) return;
    const { hexKey, hexFaceIdx, hexCenterWorld, hexNormalWorld, faceCentroidWorld, loopCentroidWorld } = this._activeHexFace;
    const faceKey = `${hexKey}:${hexFaceIdx}`;

    const m          = parseInt(document.getElementById('hf-horiz-m').value) || 5;
    const n          = parseInt(document.getElementById('hf-horiz-n').value) || 5;
    const length     = parseFloat(document.getElementById('hf-horiz-length').value) || 20;
    const color      = document.getElementById('hf-horiz-color').value;
    const centerMode = document.getElementById('hf-center-mode').value;

    const center = centerMode === 'centroid' ? (faceCentroidWorld  || hexCenterWorld || { x: 0, y: 0, z: 0 })
                 : centerMode === 'loop'     ? (loopCentroidWorld  || hexCenterWorld || { x: 0, y: 0, z: 0 })
                 :                             (hexCenterWorld || { x: 0, y: 0, z: 0 });
    const normal = hexNormalWorld || { x: 1, y: 0, z: 0 };

    const tube  = new Nanotube({ m, n, length, color, rotation: 0 });
    const group = this.scene3d.addChildTube(tube, center, normal, faceKey);
    this.horizTubes.set(faceKey, group);
    // Stocker tube + positionnement pour l'export JSON
    this.horizTubesData.set(faceKey, { tube, center, normal, centerMode, hexKey, hexFaceIdx });

    document.getElementById('hex-face-panel').classList.add('hidden');
    this._jsonLog('system', `⬡ Nanotube enfant (${m},${n}) ajouté sur ${faceKey}`);
  }

  // ── Vue ────────────────────────────────────────────────────────────

  _setView(view) {
    this.view = view;
    const viewport = document.getElementById('viewport');
    const left     = document.getElementById('panel-left');
    ['3d', 'hex', 'split'].forEach(v => {
      document.getElementById(`btn-view-${v}`).classList.remove('btn-active');
    });
    document.getElementById(`btn-view-${view}`).classList.add('btn-active');

    if (view === '3d') {
      viewport.style.display = '';
      left.style.display = 'none';
    } else if (view === 'hex') {
      viewport.style.display = 'none';
      left.style.display = '';
      left.style.width = '100%';
    } else {
      viewport.style.display = '';
      left.style.display = '';
      left.style.width = '260px';
    }
    setTimeout(() => this.scene3d._onResize(), 50);
  }

  // ── Omeka S ────────────────────────────────────────────────────────

  async _pingOmeka() {
    const dot   = document.getElementById('status-indicator');
    const label = document.getElementById('status-label');
    dot.className = 'status-dot status-wait';
    const ok = await this.omeka.ping();
    dot.className = `status-dot ${ok ? 'status-ok' : 'status-err'}`;
    label.textContent = ok ? 'Omeka S ✓' : 'Omeka S ✗';
  }

  async _loadOmekaList() {
    const list = document.getElementById('omeka-list');
    list.innerHTML = '<span style="color:#7a8fa8;font-size:11px">Chargement…</span>';
    try {
      const maps = await this.omeka.listMaps();
      list.innerHTML = '';
      if (maps.length === 0) {
        list.innerHTML = '<span style="color:#7a8fa8;font-size:11px">Aucune carte</span>';
        return;
      }
      maps.forEach(m => {
        const card = document.createElement('div');
        card.className = 'omeka-item-card';
        card.innerHTML = `<span>${m.title}</span><span class="id">#${m.id}</span>`;
        card.addEventListener('click', () => this._loadMap(m.id));
        list.appendChild(card);
      });
    } catch (e) {
      list.innerHTML = `<span style="color:#f87171;font-size:11px">${e.message}</span>`;
    }
  }

  async _saveMap() {
    const title = document.getElementById('omeka-item-title').value || 'Cartographie NanoTube';
    const tubesData = Array.from(this.tubes.values()).map(t => t.toJSON());
    try {
      const result = await this.omeka.saveMap({
        omekaId: this.currentMapId,
        title, tubes: tubesData,
        gridRadius: this.gridRadius,
        orientation: this.orientation,
      });
      this.currentMapId = result?.['o:id'] || this.currentMapId;
      document.getElementById('omeka-item-id').textContent = this.currentMapId || '—';
      this._loadOmekaList();
      this._jsonLog('system', `💾 Carte sauvegardée (Omeka #${this.currentMapId})`);
    } catch (e) {
      this._jsonLog('error', `❌ Erreur sauvegarde: ${e.message}`);
    }
  }

  async _loadMap(id) {
    try {
      const data = await this.omeka.getMap(id);
      this.currentMapId = data.omekaId;
      this.gridRadius   = data.gridRadius || 5;
      this.orientation  = data.orientation || 'pointy';
      document.getElementById('input-grid-radius').value = this.gridRadius;
      document.getElementById('input-grid-orient').value = this.orientation;
      document.getElementById('omeka-item-title').value  = data.title;
      document.getElementById('omeka-item-id').textContent = data.omekaId;

      this.tubes.clear();
      this._buildGrid();
      data.tubes.forEach(td => {
        const tube = Nanotube.fromJSON(td);
        if (tube.hexKey) this._setTube(tube.hexKey, tube);
      });
      this._jsonLog('system', `📂 Carte Omeka chargée: ${data.title}`);
    } catch (e) {
      this._jsonLog('error', `❌ Erreur chargement: ${e.message}`);
    }
  }

  // ── Import / Export JSON ───────────────────────────────────────────

  /**
   * Exporte la carte complète (tubes parents + enfants + métadonnées hexFaces) en JSON.
   * Déclenche un téléchargement du fichier.
   * @returns {object} Le données JSON exportées
   */
  exportMapJSON() {
    const title = document.getElementById('omeka-item-title').value || 'Cartographie NanoTube';

    const mapData = {
      version:     MAP_JSON_VERSION,
      title,
      exportedAt:  new Date().toISOString(),
      gridRadius:  this.gridRadius,
      orientation: this.orientation,

      // Tubes parents (un par cellule hexagonale)
      parentTubes: Array.from(this.tubes.values()).map(t => t.toJSON()),

      // Tubes enfants (un par face hexagonale de tube)
      childTubes: Array.from(this.horizTubesData.entries()).map(([faceKey, data]) => ({
        faceKey,
        hexKey:     data.hexKey,
        hexFaceIdx: data.hexFaceIdx,
        centerMode: data.centerMode || 'junction',
        center:     { x: data.center.x, y: data.center.y, z: data.center.z },
        normal:     { x: data.normal.x, y: data.normal.y, z: data.normal.z },
        tube: data.tube.toJSON(),
      })),

      // Métadonnées Omeka S par face hexagonale
      hexFaceData: Array.from(this.hexFaceData.entries()).map(([faceKey, fd]) => ({
        faceKey,
        templateId:  fd.templateId  || null,
        omekaId:     fd.omekaId     || null,
        hexKey:      fd.hexKey      || null,
        hexFaceIdx:  fd.hexFaceIdx  !== undefined ? fd.hexFaceIdx : null,
        hexFacePos:  fd.hexFacePos  || null,
        properties:  fd.properties  || [],
      })),
    };

    // Téléchargement automatique
    const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${title.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this._jsonLog('system', `📤 Exporté : ${mapData.parentTubes.length} tubes parents, ${mapData.childTubes.length} tubes enfants`);
    return mapData;
  }

  /**
   * Importe une carte depuis un objet JSON (déjà parsé).
   * Recharge la grille, les tubes parents et enfants, les métadonnées.
   * @param {object} mapData — données JSON parsées
   */
  importMapJSON(mapData) {
    if (!mapData || typeof mapData !== 'object') {
      this._jsonLog('error', '❌ Fichier JSON invalide');
      return;
    }

    // ── Métadonnées ────────────────────────────────────────────────
    const title       = mapData.title       || 'Carte importée';
    const gridRadius  = mapData.gridRadius  || 5;
    const orientation = mapData.orientation || 'pointy';

    this.gridRadius  = gridRadius;
    this.orientation = orientation;
    document.getElementById('input-grid-radius').value = gridRadius;
    document.getElementById('input-grid-orient').value = orientation;
    document.getElementById('omeka-item-title').value  = title;
    document.getElementById('omeka-item-id').textContent = '—';
    this.currentMapId = null;

    // ── Réinitialisation ────────────────────────────────────────────
    this.tubes.clear();
    this.horizTubesData.clear();
    this.horizTubes.clear();
    this.hexFaceData.clear();
    this._buildGrid();

    // ── Tubes parents ───────────────────────────────────────────────
    const parents = mapData.parentTubes || mapData.tubes || [];
    let parentCount = 0;
    for (const td of parents) {
      const tube = Nanotube.fromJSON(td);
      if (tube.hexKey) { this._setTube(tube.hexKey, tube); parentCount++; }
    }

    // ── Tubes enfants ───────────────────────────────────────────────
    const children = mapData.childTubes || [];
    let childCount = 0;
    for (const cd of children) {
      if (!cd.faceKey || !cd.tube || !cd.center || !cd.normal) continue;
      const tube  = Nanotube.fromJSON(cd.tube);
      const group = this.scene3d.addChildTube(tube, cd.center, cd.normal, cd.faceKey);
      this.horizTubes.set(cd.faceKey, group);
      this.horizTubesData.set(cd.faceKey, {
        tube,
        center:     cd.center,
        normal:     cd.normal,
        centerMode: cd.centerMode || 'junction',
        hexKey:     cd.hexKey,
        hexFaceIdx: cd.hexFaceIdx,
      });
      childCount++;
    }

    // ── Métadonnées hexFaces ────────────────────────────────────────
    for (const fd of (mapData.hexFaceData || [])) {
      if (fd.faceKey) this.hexFaceData.set(fd.faceKey, fd);
    }

    this.charts.update(this.tubes);
    this._jsonLog('system',
      `✅ Importé "${title}" — ${parentCount} tubes parents, ${childCount} tubes enfants`);
  }

  /** Ouvre le sélecteur de fichier et importe le JSON choisi */
  _importFromFile() {
    const input = document.getElementById('import-file-input');
    input.onchange = e => {
      const file = e.target.files?.[0];
      if (!file) return;
      document.getElementById('import-filename').textContent = file.name;
      document.getElementById('import-status').textContent  = 'Import…';
      document.getElementById('import-status').className    = 'badge badge-thinking';
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          this.importMapJSON(data);
          document.getElementById('import-status').textContent = 'Importé ✓';
          document.getElementById('import-status').className   = 'badge badge-done';
        } catch (err) {
          this._jsonLog('error', `❌ Erreur de parsing : ${err.message}`);
          document.getElementById('import-status').textContent = 'Erreur';
          document.getElementById('import-status').className   = 'badge badge-err';
        }
        input.value = '';
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /** Charge l'exemple JSON fourni avec l'application */
  async _importExample() {
    this._jsonLog('system', '⏳ Chargement de l\'exemple…');
    try {
      const res  = await fetch('/example-map.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.importMapJSON(data);
    } catch (e) {
      this._jsonLog('error', `❌ Impossible de charger l'exemple : ${e.message}`);
    }
  }

  /** Ajoute un message dans le log du panneau import/export */
  _jsonLog(type, text) {
    const log = document.getElementById('import-log');
    if (!log) return;
    const div = document.createElement('div');
    div.className = `agent-msg ${type === 'error' ? 'system' : type}`;
    div.style.color = type === 'error' ? 'var(--red, #f87171)' : '';
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = 9999;
  }

  // ── Paramètres ─────────────────────────────────────────────────────

  _loadSettings() {
    const cfg = loadOmekaConfig();
    if (cfg.url) this.omeka.configure(cfg);
    if (cfg.url) document.getElementById('set-omeka-url')?.setAttribute('value', cfg.url);
    if (cfg.keyId) document.getElementById('set-omeka-key-id')?.setAttribute('value', cfg.keyId);
    if (cfg.itemSetId) document.getElementById('set-omeka-set-id')?.setAttribute('value', cfg.itemSetId);

    const envUrl    = import.meta.env?.VITE_OMEKA_URL;
    const envKeyId  = import.meta.env?.VITE_OMEKA_KEY_IDENTITY;
    const envKeyCred = import.meta.env?.VITE_OMEKA_KEY_CREDENTIAL;
    const envSetId  = import.meta.env?.VITE_OMEKA_ITEM_SET_ID;
    if (envUrl) this.omeka.configure({ url: envUrl, keyId: envKeyId, keyCred: envKeyCred, itemSetId: envSetId });
  }

  _saveSettings() {
    const cfg = {
      url:       document.getElementById('set-omeka-url').value,
      keyId:     document.getElementById('set-omeka-key-id').value,
      keyCred:   document.getElementById('set-omeka-key-cred').value,
      itemSetId: parseInt(document.getElementById('set-omeka-set-id').value) || 1,
    };
    saveOmekaConfig(cfg);
    this.omeka.configure(cfg);
    document.getElementById('settings-panel').classList.add('hidden');
    this._pingOmeka();
  }

  // ── Liaison UI ─────────────────────────────────────────────────────

  _initUI() {
    // Toolbar
    document.getElementById('btn-new-map').addEventListener('click', () => {
      this.tubes.clear(); this.currentMapId = null;
      document.getElementById('omeka-item-title').value = '';
      document.getElementById('omeka-item-id').textContent = '—';
      this._buildGrid();
    });
    document.getElementById('btn-save-map').addEventListener('click', () => this._saveMap());
    document.getElementById('btn-load-map').addEventListener('click', () => this._loadOmekaList());
    document.getElementById('btn-export').addEventListener('click', () => {
      const url = this.scene3d.screenshot();
      const a = document.createElement('a'); a.href = url; a.download = 'nanotube-scene.png'; a.click();
    });
    document.getElementById('btn-view-3d').addEventListener('click', () => this._setView('3d'));
    document.getElementById('btn-view-hex').addEventListener('click', () => this._setView('hex'));
    document.getElementById('btn-view-split').addEventListener('click', () => this._setView('split'));
    document.getElementById('btn-settings').addEventListener('click', () => {
      document.getElementById('settings-panel').classList.toggle('hidden');
    });

    // Left panel
    document.getElementById('btn-add-tube').addEventListener('click', () => {
      if (this.selectedKey) this._addTubeAt(this.selectedKey);
    });
    document.getElementById('btn-clear-selection').addEventListener('click', () => {
      this.selectedKey = null; this._updateTubeEditor(null);
    });
    document.getElementById('input-grid-radius').addEventListener('change', e => {
      this.gridRadius = parseInt(e.target.value) || 5;
      this.tubes.clear(); this._buildGrid();
    });
    document.getElementById('input-grid-orient').addEventListener('change', e => {
      this.orientation = e.target.value;
      this._buildGrid();
    });

    // Tube editor
    document.getElementById('input-length').addEventListener('input', e => {
      document.getElementById('length-val').textContent = e.target.value;
    });
    document.getElementById('input-rotation').addEventListener('input', e => {
      document.getElementById('rotation-val').textContent = e.target.value;
    });
    document.getElementById('input-m').addEventListener('change', () => this._liveUpdateType());
    document.getElementById('input-n').addEventListener('change', () => this._liveUpdateType());
    document.getElementById('btn-apply-tube').addEventListener('click', () => this._applyTubeEdits());
    document.getElementById('btn-delete-tube').addEventListener('click', () => this._removeTube(this.selectedKey));

    // Viewport controls
    document.getElementById('btn-reset-camera').addEventListener('click', () => this.scene3d.resetCamera());
    document.getElementById('btn-toggle-grid').addEventListener('click', () => this.scene3d.toggleGrid());
    document.getElementById('btn-toggle-hexfaces').addEventListener('click', () => this.scene3d.toggleHexFaces());
    document.getElementById('btn-screenshot').addEventListener('click', () => {
      const url = this.scene3d.screenshot();
      const a = document.createElement('a'); a.href = url; a.download = 'nanotube-scene.png'; a.click();
    });

    // Import / Export JSON
    document.getElementById('trace-toggle').addEventListener('click', e => {
      if (e.target.closest('button')) return;
      document.getElementById('trace-body').classList.toggle('collapsed');
      document.getElementById('btn-collapse-trace').textContent =
        document.getElementById('trace-body').classList.contains('collapsed') ? '▼' : '▲';
    });
    document.getElementById('btn-import-json').addEventListener('click', () => this._importFromFile());
    document.getElementById('btn-export-json').addEventListener('click', () => this.exportMapJSON());
    document.getElementById('btn-import-example').addEventListener('click', () => this._importExample());

    // Settings
    document.getElementById('btn-save-settings').addEventListener('click', () => this._saveSettings());
    document.getElementById('settings-close').addEventListener('click', () => {
      document.getElementById('settings-panel').classList.add('hidden');
    });

    // Hex face panel
    document.getElementById('hex-face-close').addEventListener('click', () => {
      document.getElementById('hex-face-panel').classList.add('hidden');
    });
    document.getElementById('hf-template-select').addEventListener('change', e => {
      this._onTemplateChange(e.target.value);
    });
    document.getElementById('hf-save-omeka').addEventListener('click', () => this._saveHexToOmeka());
    document.getElementById('hf-spawn-tube').addEventListener('click', () => this._spawnChildTube());
    document.getElementById('hf-horiz-length').addEventListener('input', e => {
      document.getElementById('hf-horiz-length-val').textContent = e.target.value;
    });

    // Modal
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('modal-overlay').classList.add('hidden');
    });
    document.getElementById('modal-cancel').addEventListener('click', () => {
      document.getElementById('modal-overlay').classList.add('hidden');
    });
  }

  _liveUpdateType() {
    const m = parseInt(document.getElementById('input-m').value) || 0;
    const n = parseInt(document.getElementById('input-n').value) || 0;
    const tmp = new Nanotube({ m, n });
    const badge = document.getElementById('tube-type-badge');
    badge.textContent = tmp.type.charAt(0).toUpperCase() + tmp.type.slice(1);
    badge.className = `badge badge-${tmp.type}`;
    document.getElementById('prop-diameter').textContent = `${tmp.diameter.toFixed(3)} nm`;
    document.getElementById('prop-conductivity').textContent = tmp.conductivity;
    document.getElementById('prop-bandgap').textContent = tmp.isMetallic ? '0 eV' : `${tmp.bandGap} eV`;
  }
}
