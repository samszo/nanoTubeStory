/**
 * Client CRUD pour l'API REST Omeka S
 * Stocke les cartographies de nanotubes comme Items dans un ItemSet
 */

export class OmekaClient {
  constructor(config = {}) {
    this.baseUrl    = config.url      || '';
    this.keyId      = config.keyId    || '';
    this.keyCred    = config.keyCred  || '';
    this.itemSetId  = config.itemSetId || 1;
    this.connected  = false;
  }

  configure(config) {
    this.baseUrl   = config.url      || this.baseUrl;
    this.keyId     = config.keyId    || this.keyId;
    this.keyCred   = config.keyCred  || this.keyCred;
    this.itemSetId = config.itemSetId || this.itemSetId;
  }

  _authParams() {
    if (!this.keyId || !this.keyCred) return '';
    return `key_identity=${encodeURIComponent(this.keyId)}&key_credential=${encodeURIComponent(this.keyCred)}`;
  }

  _url(path, extra = '') {
    const auth = this._authParams();
    const sep  = auth ? '&' : '';
    return `${this.baseUrl}${path}?${auth}${extra ? sep + extra : ''}`;
  }

  async _fetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Omeka S ${res.status}: ${txt}`);
    }
    return res.json();
  }

  async ping() {
    try {
      await this._fetch(this._url('/api'));
      this.connected = true;
      return true;
    } catch {
      this.connected = false;
      return false;
    }
  }

  // ── Cartographies (Items Omeka) ────────────────────────────────────

  async listMaps() {
    const items = await this._fetch(
      this._url('/api/items', `item_set_id=${this.itemSetId}&per_page=50`)
    );
    return items.map(i => ({
      id: i['o:id'],
      title: i['dcterms:title']?.[0]?.['@value'] || `Carte #${i['o:id']}`,
      modified: i['o:modified']?.['@value'],
    }));
  }

  async getMap(id) {
    const item = await this._fetch(this._url(`/api/items/${id}`));
    return this._parseMapItem(item);
  }

  /** Crée ou met à jour une cartographie */
  async saveMap(mapData) {
    const body = this._buildOmekaItem(mapData);
    if (mapData.omekaId) {
      return this._fetch(this._url(`/api/items/${mapData.omekaId}`), {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    }
    return this._fetch(this._url('/api/items'), {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async deleteMap(id) {
    await fetch(this._url(`/api/items/${id}`), { method: 'DELETE' });
  }

  // ── Resource templates ─────────────────────────────────────────────

  async listResourceTemplates() {
    const items = await this._fetch(this._url('/api/resource_templates', 'per_page=50'));
    return items.map(t => ({ id: t['o:id'], label: t['o:label'] || `Template #${t['o:id']}` }));
  }

  async getResourceTemplate(id) {
    const t = await this._fetch(this._url(`/api/resource_templates/${id}`));
    return {
      id: t['o:id'],
      label: t['o:label'],
      properties: (t['o:resource_template_property'] || []).map(p => ({
        term:  p['o:property']?.['o:term'] || '',
        label: p['o:alternate_label'] || p['o:property']?.['o:label'] || p['o:property']?.['o:term'] || '',
        type:  p['o:data_type']?.[0] || 'literal',
      })),
    };
  }

  async saveHexItem(hexData, itemSetId) {
    const props = {};
    (hexData.properties || []).forEach(({ term, value }) => {
      if (value) props[term] = [{ '@value': value, type: 'literal' }];
    });
    const body = {
      '@type': ['o:Item'],
      'o:item_set': [{ 'o:id': itemSetId || this.itemSetId }],
      'dcterms:title': [{ '@value': hexData.title || 'Hexagone nanotube', type: 'literal' }],
      'dcterms:description': [{ '@value': JSON.stringify(hexData), type: 'literal' }],
      'dcterms:subject': [{ '@value': 'nanotube:hex', type: 'literal' }],
      ...props,
    };
    if (hexData.omekaId) {
      return this._fetch(this._url(`/api/items/${hexData.omekaId}`), { method: 'PATCH', body: JSON.stringify(body) });
    }
    return this._fetch(this._url('/api/items'), { method: 'POST', body: JSON.stringify(body) });
  }

  // ── Sérialisation ──────────────────────────────────────────────────

  _buildOmekaItem(mapData) {
    return {
      '@type': ['o:Item'],
      'o:item_set': [{ 'o:id': this.itemSetId }],
      'dcterms:title': [{ '@value': mapData.title || 'Cartographie NanoTube', type: 'literal' }],
      'dcterms:description': [{
        '@value': JSON.stringify({
          tubes:    mapData.tubes,
          gridRadius: mapData.gridRadius,
          orientation: mapData.orientation,
          version: '1.0',
        }),
        type: 'literal',
      }],
      'dcterms:subject': [{ '@value': 'nanotube-cartography', type: 'literal' }],
    };
  }

  _parseMapItem(item) {
    try {
      const desc = item['dcterms:description']?.[0]?.['@value'];
      const data = desc ? JSON.parse(desc) : {};
      return {
        omekaId: item['o:id'],
        title: item['dcterms:title']?.[0]?.['@value'] || `Carte #${item['o:id']}`,
        tubes: data.tubes || [],
        gridRadius: data.gridRadius || 5,
        orientation: data.orientation || 'pointy',
      };
    } catch {
      return { omekaId: item['o:id'], title: `Carte #${item['o:id']}`, tubes: [], gridRadius: 5, orientation: 'pointy' };
    }
  }
}

/** Config persistée dans localStorage */
export function loadOmekaConfig() {
  try {
    return JSON.parse(localStorage.getItem('omeka-config') || '{}');
  } catch { return {}; }
}

export function saveOmekaConfig(cfg) {
  localStorage.setItem('omeka-config', JSON.stringify(cfg));
}
