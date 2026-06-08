/**
 * Construit la géométrie Three.js d'un nanotube de carbone
 * Inclut le tube principal, le réseau hexagonal de carbone et les capuchons
 */
import * as THREE from 'three';

const NM_TO_SCENE = 2.5; // facteur d'échelle nm → unités scène

export function buildNanotubeGroup(nanotube) {
  const group = new THREE.Group();
  group.userData.nanotube = nanotube;

  const diameter = nanotube.diameter * NM_TO_SCENE * 8; // grossissement visuel
  const radius   = diameter / 2;
  const height   = nanotube.length * NM_TO_SCENE;
  const color    = new THREE.Color(nanotube.color);

  // ── Corps du tube ───────────────────────────────────────────────────
  const segments = Math.max(12, Math.round(nanotube.m + nanotube.n) * 2);
  const tubeGeo  = new THREE.CylinderGeometry(radius, radius, height, segments, 1, true);
  const tubeMat  = new THREE.MeshPhysicalMaterial({
    color,
    metalness: nanotube.isMetallic ? 0.9 : 0.1,
    roughness: 0.3,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    wireframe: false,
  });
  const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
  group.add(tubeMesh);

  // ── Grille hexagonale (réseau carbone) ─────────────────────────────
  const latticeGeo = buildCarbonLattice(nanotube, radius, height, segments);
  const latticeMat = new THREE.LineBasicMaterial({ color: color.clone().multiplyScalar(1.6), linewidth: 1 });
  const lattice = new THREE.LineSegments(latticeGeo, latticeMat);
  group.add(lattice);

  // ── Capuchons hémisphériques ────────────────────────────────────────
  const capMat = new THREE.MeshPhysicalMaterial({
    color: color.clone().multiplyScalar(0.8),
    metalness: nanotube.isMetallic ? 0.85 : 0.15,
    roughness: 0.4,
    transparent: true,
    opacity: 0.75,
  });
  const capGeo = new THREE.SphereGeometry(radius, segments, 8, 0, Math.PI * 2, 0, Math.PI / 2);

  const capTop = new THREE.Mesh(capGeo, capMat);
  capTop.position.y = height / 2;
  group.add(capTop);

  const capBot = new THREE.Mesh(capGeo, capMat);
  capBot.position.y = -height / 2;
  capBot.rotation.x = Math.PI;
  group.add(capBot);

  // ── Glow (halo lumineux) ────────────────────────────────────────────
  const glowGeo = new THREE.CylinderGeometry(radius * 1.3, radius * 1.3, height, segments, 1, true);
  const glowMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
  });
  group.add(new THREE.Mesh(glowGeo, glowMat));

  // ── Axe de rotation ────────────────────────────────────────────────
  group.rotation.y = (nanotube.rotation * Math.PI) / 180;

  return group;
}

function buildCarbonLattice(nanotube, radius, height, segments) {
  const positions = [];
  const circumference = 2 * Math.PI * radius;

  // Nombre d'hexagones autour de la circonférence déterminé par la chiralité
  const nHex = Math.max(6, nanotube.n + nanotube.m);

  // Longueur de liaison C-C en unités scène (zigzag : nHex cellules = circonférence)
  // Une cellule unitaire zigzag a une largeur de sqrt(3)*d
  const d = circumference / (nHex * Math.sqrt(3));

  // Vecteurs du réseau hexagonal (orientation zigzag, axe du tube = y)
  const a1x = Math.sqrt(3) * d;       // vecteur a1 (horizontal)
  const a2x = Math.sqrt(3) * d / 2;   // composante x de a2
  const a2y = 1.5 * d;                // composante y de a2

  const iMax = Math.ceil(circumference / a1x) + 2;
  const jMin = -Math.ceil(height / a2y) - 2;
  const jMax =  Math.ceil(height / a2y) + 2;

  // Projette un segment 2D (abscisse curviligne → angle) sur le cylindre
  const addEdge = (x1, y1, x2, y2) => {
    if (y1 < -height / 2 - d && y2 < -height / 2 - d) return;
    if (y1 >  height / 2 + d && y2 >  height / 2 + d) return;
    const t1 = x1 / radius, t2 = x2 / radius;
    positions.push(Math.cos(t1) * radius, y1, Math.sin(t1) * radius);
    positions.push(Math.cos(t2) * radius, y2, Math.sin(t2) * radius);
  };

  // Génère tous les atomes A du sous-réseau et trace leurs 3 liaisons vers les B voisins
  // delta1 = (0, +d)          : liaison verticale vers le haut
  // delta2 = (-√3d/2, -d/2)   : liaison oblique bas-gauche
  // delta3 = (+√3d/2, -d/2)   : liaison oblique bas-droite
  const s = Math.sqrt(3) * d / 2;
  for (let i = 0; i < iMax; i++) {
    for (let j = jMin; j <= jMax; j++) {
      const ax = i * a1x + j * a2x;
      const ay = j * a2y;
      addEdge(ax, ay, ax,     ay + d);
      addEdge(ax, ay, ax - s, ay - d / 2);
      addEdge(ax, ay, ax + s, ay - d / 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

/**
 * Construit des faces hexagonales invisibles sur la surface du tube,
 * utilisées comme cibles pour le raycaster (clics interactifs).
 * Chaque mesh porte userData.isHexFace, .hexFaceIdx, .hexFacePos.
 */
export function buildTubeHexFaces(nanotube, radius, height) {
  const nHex = Math.max(6, nanotube.n + nanotube.m);
  const circumference = 2 * Math.PI * radius;
  const d   = circumference / (nHex * Math.sqrt(3));
  const a1x = Math.sqrt(3) * d;
  const a2y = 1.5 * d;
  const s   = a1x / 2; // sqrt(3)*d/2

  const iMax = Math.ceil(circumference / a1x) + 1;
  const jMin = -Math.ceil(height / a2y) - 1;
  const jMax =  Math.ceil(height / a2y) + 1;

  // Sommets relatifs d'un anneau hexagonal (circumradius = d)
  const rv = [[0,-d],[s,-d/2],[s,d/2],[0,d],[-s,d/2],[-s,-d/2]];

  const meshes = [];
  let idx = 0;

  for (let i = 0; i < iMax; i++) {
    for (let j = jMin; j <= jMax; j++) {
      const cx = i * a1x + (((j % 2) + 2) % 2 ? a1x / 2 : 0);
      const cy = d + j * a2y;
      idx++;
      if (cy + d < -height / 2 || cy - d > height / 2) continue;

      // Projection des 6 sommets sur le cylindre
      const pts = rv.map(([dx, dy]) => {
        const theta = (cx + dx) / radius;
        return new THREE.Vector3(Math.cos(theta) * radius, cy + dy, Math.sin(theta) * radius);
      });

      // Triangulation en éventail depuis pts[0] → 4 triangles
      const verts = [];
      for (let k = 1; k <= 4; k++) {
        verts.push(...pts[0].toArray(), ...pts[k].toArray(), ...pts[k + 1].toArray());
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      mesh.userData.isHexFace  = true;
      mesh.userData.hexFaceIdx = idx - 1;
      mesh.userData.hexFacePos = { i, j, cx, cy };
      meshes.push(mesh);
    }
  }
  return meshes;
}

/** Indique les unités de taille dans la scène */
export const NM_SCALE = NM_TO_SCENE;

/** Construit une sphère pour un atome de carbone (optionnel, haute résolution) */
export function buildAtomSphere(color = '#a0ffa0') {
  const geo = new THREE.SphereGeometry(0.3, 6, 6);
  const mat = new THREE.MeshPhongMaterial({ color });
  return new THREE.Mesh(geo, mat);
}

/** Plan de base hexagonal pour une cellule */
export function buildHexBase(corners, color = '#22d3ee') {
  const shape = new THREE.Shape();
  corners.forEach((c, i) => {
    if (i === 0) shape.moveTo(c.x, c.y);
    else         shape.lineTo(c.x, c.y);
  });
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geo, mat);
}

/** Contour hexagonal (wire) */
export function buildHexOutline(corners, color = '#2d3a4f') {
  const pts = [...corners, corners[0]].map(c => new THREE.Vector3(c.x, 0, c.y));
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color });
  return new THREE.Line(geo, mat);
}
