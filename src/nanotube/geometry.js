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
  const rows = Math.max(6, Math.round(height / 1.2));
  const cols = segments;

  // Approximation du réseau hexagonal enroulé autour du cylindre
  for (let row = 0; row < rows; row++) {
    const y = -height / 2 + (row / rows) * height;
    const yNext = -height / 2 + ((row + 1) / rows) * height;
    const offset = (row % 2) * 0.5;

    for (let col = 0; col < cols; col++) {
      const a1 = ((col + offset) / cols) * Math.PI * 2;
      const a2 = ((col + 1 + offset) / cols) * Math.PI * 2;
      const aNext = ((col + 0.5 + offset) / cols) * Math.PI * 2;

      const x1 = Math.cos(a1) * radius, z1 = Math.sin(a1) * radius;
      const x2 = Math.cos(a2) * radius, z2 = Math.sin(a2) * radius;
      const xN = Math.cos(aNext) * radius, zN = Math.sin(aNext) * radius;

      // liaison horizontale
      positions.push(x1, y, z1, x2, y, z2);
      // liaison vers rangée suivante
      positions.push(x1, y, z1, xN, yNext, zN);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geo;
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
