/**
 * Gestionnaire de la scène Three.js 3D
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildNanotubeGroup, buildHexBase, buildHexOutline, buildTubeHexFaces, NM_SCALE } from '../nanotube/geometry.js';
const NM_TO_SCENE = NM_SCALE;
import { Layout, LAYOUT_POINTY, LAYOUT_FLAT, Point } from '../hex/hex.js';

const HEX_SIZE_3D = 14; // unités scène pour la taille d'un hexagone

export class Scene3D {
  constructor(canvas) {
    this.canvas    = canvas;
    this.tubeObjects = new Map(); // hexKey → THREE.Group
    this.hexObjects  = new Map(); // hexKey → THREE.Group (base + outline)
    this.selectedKey = null;
    this.showGrid    = true;
    this.showLabels  = false;
    this.orientation = 'pointy';
    this._onSelectCallbacks    = [];
    this._onTubeHexCallbacks   = [];
    this.hexFaceObjects = new Map(); // hexKey → [Mesh, ...]

    this._initRenderer();
    this._initScene();
    this._initCamera();
    this._initControls();
    this._initLights();
    this._initRaycaster();
    this._animate();
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x0a0e17);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this._resizeObserver = new ResizeObserver(() => this._onResize());
    this._resizeObserver.observe(this.canvas.parentElement);
    this._onResize();
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0a0e17, 400, 900);

    // Grille de fond
    this.gridHelper = new THREE.GridHelper(400, 40, 0x1e2736, 0x1e2736);
    this.scene.add(this.gridHelper);
  }

  _initCamera() {
    const w = this.canvas.clientWidth  || 800;
    const h = this.canvas.clientHeight || 600;
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
    this.camera.position.set(80, 120, 160);
    this.camera.lookAt(0, 30, 0);
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping  = true;
    this.controls.dampingFactor  = 0.08;
    this.controls.maxPolarAngle  = Math.PI / 1.8;
    this.controls.minDistance    = 20;
    this.controls.maxDistance    = 600;
    this.controls.target.set(0, 20, 0);
  }

  _initLights() {
    const ambient = new THREE.AmbientLight(0x334466, 0.8);
    this.scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1.8);
    sun.position.set(100, 200, 100);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.far = 800;
    this.scene.add(sun);

    const fill = new THREE.DirectionalLight(0x4488ff, 0.5);
    fill.position.set(-100, 50, -100);
    this.scene.add(fill);

    // Point lights colorés
    const pl1 = new THREE.PointLight(0x22d3ee, 0.6, 200);
    pl1.position.set(0, 80, 0);
    this.scene.add(pl1);
  }

  _initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.canvas.addEventListener('click', e => this._onCanvasClick(e));
  }

  _onCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Priorité 1 : clic sur une face hexagonale de tube
    const faceTargets = [];
    this.hexFaceObjects.forEach(meshes => faceTargets.push(...meshes));
    const faceHits = this.raycaster.intersectObjects(faceTargets);
    if (faceHits.length > 0) {
      const mesh   = faceHits[0].object;
      const hexKey = mesh.userData.tubeHexKey;
      if (hexKey && mesh.parent) {
        const nanotube    = mesh.parent.userData.nanotube;
        const hexFacePos  = mesh.userData.hexFacePos;

        // Centre de l'hexagone et normale sortante calculés en espace monde
        let hexCenterWorld = faceHits[0].point.clone();
        let hexNormalWorld = faceHits[0].point.clone()
          .sub(mesh.parent.position).setY(0).normalize();

        // Centroïde pondéré par les aires des triangles (formule de Shoelace 3D).
        // Sur un cylindre, les 4 triangles du fan n'ont pas la même aire :
        // la pondération déplace le centroïde par rapport à la moyenne des sommets.
        // Buffer layout (fan depuis pts[0]) : indices 0,1,2 | 3,4,5 | 6,7,8 | 9,10,11
        // pts distincts : p0=idx0, p1=idx1, p2=idx2, p3=idx5, p4=idx8, p5=idx11
        let faceCentroidWorld = faceHits[0].point.clone();
        {
          const pos  = mesh.geometry.attributes.position;
          const p0   = new THREE.Vector3().fromBufferAttribute(pos, 0);
          const ring = [1, 2, 5, 8, 11].map(i => new THREE.Vector3().fromBufferAttribute(pos, i));
          let totalArea = 0;
          const weighted = new THREE.Vector3();
          const ab = new THREE.Vector3(), ac = new THREE.Vector3();
          for (let k = 0; k < 4; k++) {
            const pB = ring[k], pC = ring[k + 1];
            ab.subVectors(pB, p0);
            ac.subVectors(pC, p0);
            const area = ab.clone().cross(ac).length() / 2;
            const triCentroid = new THREE.Vector3().addVectors(p0, pB).add(pC).divideScalar(3);
            weighted.addScaledVector(triCentroid, area);
            totalArea += area;
          }
          if (totalArea > 0) weighted.divideScalar(totalArea);
          faceCentroidWorld = weighted.applyMatrix4(mesh.matrixWorld);
        }

        if (nanotube && hexFacePos) {
          const r     = nanotube.diameter * NM_TO_SCENE * 8 / 2;
          const theta = hexFacePos.cx / r;
          // Centre de la face en coordonnées locales du tube
          const localCenter = new THREE.Vector3(
            Math.cos(theta) * r, hexFacePos.cy, Math.sin(theta) * r
          );
          hexCenterWorld = localCenter.clone().applyMatrix4(mesh.parent.matrixWorld);
          // Normale sortante (direction radiale en XZ dans l'espace local)
          hexNormalWorld = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta))
            .transformDirection(mesh.parent.matrixWorld).normalize();
        }

        this._onTubeHexCallbacks.forEach(cb => cb({
          hexKey,
          hexFaceIdx:    mesh.userData.hexFaceIdx,
          hexFacePos,
          worldPos:      faceHits[0].point,
          hexCenterWorld,
          hexNormalWorld,
          faceCentroidWorld,
        }));
        return;
      }
    }

    // Priorité 2 : clic sur une cellule de la grille hexagonale
    const pickObjects = [];
    this.hexObjects.forEach(g => pickObjects.push(...g.children));
    const hits = this.raycaster.intersectObjects(pickObjects);
    if (hits.length > 0) {
      const hexKey = hits[0].object.parent?.userData?.hexKey;
      if (hexKey) this._selectHex(hexKey);
    }
  }

  _selectHex(hexKey) {
    // Reset précédent
    if (this.selectedKey) {
      const prev = this.hexObjects.get(this.selectedKey);
      if (prev) prev.children.forEach(c => {
        if (c.material?.color && c.userData.isBase) c.material.opacity = 0.08;
      });
    }
    this.selectedKey = hexKey;
    const curr = this.hexObjects.get(hexKey);
    if (curr) curr.children.forEach(c => {
      if (c.material && c.userData.isBase) c.material.opacity = 0.25;
    });
    this._onSelectCallbacks.forEach(cb => cb(hexKey));
  }

  onSelect(cb) { this._onSelectCallbacks.push(cb); }

  onTubeHexSelect(cb) { this._onTubeHexCallbacks.push(cb); }

  // ── Grille hexagonale ──────────────────────────────────────────────

  buildGrid(hexes, orientStr = 'pointy') {
    this.orientation = orientStr;
    const orient = orientStr === 'flat' ? LAYOUT_FLAT : LAYOUT_POINTY;
    this.layout3d = new Layout(orient, new Point(HEX_SIZE_3D, HEX_SIZE_3D), new Point(0, 0));

    // Supprimer anciens
    this.hexObjects.forEach(g => this.scene.remove(g));
    this.hexObjects.clear();

    hexes.forEach(h => {
      const center = this.layout3d.hexToPixel(h);
      const corners = this.layout3d.polygonCorners(h);
      const group = new THREE.Group();
      group.userData.hexKey = h.key();
      group.position.set(center.x, 0, center.y);

      // Base hexagonale
      const relCorners = corners.map(c => new Point(c.x - center.x, c.y - center.y));
      const base = buildHexBase(relCorners, 0x22d3ee);
      base.rotation.x = -Math.PI / 2;
      base.userData.isBase = true;
      group.add(base);

      // Contour
      const outline = buildHexOutline(relCorners, 0x2d3a4f);
      group.add(outline);

      this.scene.add(group);
      this.hexObjects.set(h.key(), group);
    });
  }

  // ── Nanotubes ──────────────────────────────────────────────────────

  setTube(hexKey, nanotube) {
    this.removeTube(hexKey);

    const hexGroup = this.hexObjects.get(hexKey);
    if (!hexGroup) return;

    const tubeGroup = buildNanotubeGroup(nanotube);
    const h = nanotube.length * 2.5 / 2;
    tubeGroup.position.set(hexGroup.position.x, h, hexGroup.position.z);
    this.scene.add(tubeGroup);
    this.tubeObjects.set(hexKey, tubeGroup);

    // Faces hexagonales cliquables sur la surface du tube
    const diameter = nanotube.diameter * NM_TO_SCENE * 8;
    const radius   = diameter / 2;
    const height   = nanotube.length * NM_TO_SCENE;
    const faces = buildTubeHexFaces(nanotube, radius, height);
    faces.forEach(m => {
      m.userData.tubeHexKey = hexKey;
      // Les faces sont en coordonnées locales du tube → ajouter au groupe
      tubeGroup.add(m);
    });
    this.hexFaceObjects.set(hexKey, faces);

    // Illuminer la base
    const base = hexGroup.children.find(c => c.userData.isBase);
    if (base) {
      base.material.opacity = 0.18;
      base.material.color.set(nanotube.color);
    }
  }

  removeTube(hexKey) {
    const existing = this.tubeObjects.get(hexKey);
    if (existing) {
      this.scene.remove(existing);
      existing.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); });
      this.tubeObjects.delete(hexKey);
    }
    this.hexFaceObjects.delete(hexKey);
    const hexGroup = this.hexObjects.get(hexKey);
    if (hexGroup) {
      const base = hexGroup.children.find(c => c.userData.isBase);
      if (base) { base.material.opacity = 0.08; base.material.color.set(0x22d3ee); }
    }
  }

  updateTube(hexKey, nanotube) { this.setTube(hexKey, nanotube); }

  /**
   * Ajoute un nanotube enfant :
   * - centré sur hexCenter (centre exact de l'hexagone parent)
   * - orienté selon hexNormal (perpendiculaire à la face de l'hexagone)
   * - sa base (extrémité proche) commence à la surface du tube parent
   */
  addChildTube(nanotube, hexCenter, hexNormal, faceKey) {
    const group = buildNanotubeGroup(nanotube);

    // Aligner l'axe Y du tube sur la normale sortante
    const yAxis = new THREE.Vector3(0, 1, 0);
    const dir   = new THREE.Vector3(hexNormal.x, hexNormal.y, hexNormal.z).normalize();
    group.quaternion.setFromUnitVectors(yAxis, dir);

    // Positionner : base à hexCenter, tube s'étend vers l'extérieur
    // Le centre du groupe est décalé de halfLen dans la direction normale
    const halfLen = nanotube.length * NM_TO_SCENE / 2;
    group.position.set(
      hexCenter.x + dir.x * halfLen,
      hexCenter.y + dir.y * halfLen,
      hexCenter.z + dir.z * halfLen
    );

    this.scene.add(group);
    group.userData.faceKey = faceKey;

    // Faces hexagonales cliquables — mêmes règles que setTube
    const diameter = nanotube.diameter * NM_TO_SCENE * 8;
    const radius   = diameter / 2;
    const height   = nanotube.length * NM_TO_SCENE;
    const faces    = buildTubeHexFaces(nanotube, radius, height);
    faces.forEach(m => {
      m.userData.tubeHexKey = faceKey; // clé = faceKey du tube parent
      group.add(m);
    });
    this.hexFaceObjects.set(faceKey, faces);

    return group;
  }

  highlightTube(hexKey) {
    this.tubeObjects.forEach((g, k) => {
      g.traverse(c => { if (c.material?.emissive) c.material.emissive.set(k === hexKey ? 0x226644 : 0x000000); });
    });
  }

  // ── Toggle aides visuelles ─────────────────────────────────────────

  toggleGrid(show) {
    this.showGrid = show ?? !this.showGrid;
    this.gridHelper.visible = this.showGrid;
    this.hexObjects.forEach(g => { g.children.filter(c => !c.userData.isBase).forEach(c => c.visible = this.showGrid); });
  }

  resetCamera() {
    this.camera.position.set(80, 120, 160);
    this.controls.target.set(0, 20, 0);
    this.controls.update();
  }

  screenshot() {
    this.renderer.render(this.scene, this.camera);
    return this.canvas.toDataURL('image/png');
  }

  _onResize() {
    const el = this.canvas.parentElement;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    this.renderer.setSize(w, h, false);
    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    this.controls.update();
    // Rotation douce des tubes si aucun n'est sélectionné
    if (!this.selectedKey) {
      this.tubeObjects.forEach(g => { g.rotation.y += 0.002; });
    }
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this._resizeObserver.disconnect();
    this.renderer.dispose();
  }
}
