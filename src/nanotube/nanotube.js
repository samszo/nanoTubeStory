/**
 * Modèle physique d'un nanotube de carbone
 * Basé sur les paramètres de chiralité (m, n)
 * a₀ = 0.246 nm (constante de réseau du graphène)
 */

const A0 = 0.246; // nm — constante de réseau graphène
const CC_BOND = 0.142; // nm — longueur liaison C-C

export class Nanotube {
  constructor({
    m = 5,
    n = 5,
    length = 20,
    rotation = 0,
    color = '#4ade80',
    label = '',
    hexKey = null,
  } = {}) {
    this.m = Math.max(0, Math.round(m));
    this.n = Math.max(0, Math.round(n));
    this.length  = length;   // nm
    this.rotation = rotation; // degrés
    this.color   = color;
    this.label   = label;
    this.hexKey  = hexKey;  // clé de la cellule hexagonale
    this.omekaId = null;
  }

  // ── Propriétés structurelles ──────────────────────────────────────

  /** Diamètre en nm : d = a₀/π * √(m²+mn+n²) */
  get diameter() {
    return (A0 / Math.PI) * Math.sqrt(this.m ** 2 + this.m * this.n + this.n ** 2);
  }

  /** Vecteur chiral en nm */
  get chiralVector() {
    return A0 * Math.sqrt(this.m ** 2 + this.m * this.n + this.n ** 2);
  }

  /** Angle chiral en degrés */
  get chiralAngle() {
    return Math.atan2(Math.sqrt(3) * this.n, 2 * this.m + this.n) * (180 / Math.PI);
  }

  /** Type structurel */
  get type() {
    if (this.m === this.n) return 'armchair';
    if (this.n === 0 || this.m === 0) return 'zigzag';
    return 'chiral';
  }

  /** Conductivité électrique */
  get conductivity() {
    if (this.type === 'armchair') return 'Métallique';
    // (m - n) mod 3 = 0 → métallique
    if ((this.m - this.n) % 3 === 0) return 'Métallique';
    return 'Semi-conducteur';
  }

  get isMetallic() {
    return this.conductivity === 'Métallique';
  }

  /** Band gap approximatif en eV (0 si métallique) */
  get bandGap() {
    if (this.isMetallic) return 0;
    // Eg ≈ 0.9 / d (eV) pour semi-conducteurs
    return (0.9 / this.diameter).toFixed(3);
  }

  /** Nombre d'atomes de carbone (estimation) */
  get atomCount() {
    const circumference = Math.PI * this.diameter;
    const atomsPerNm2 = 38.2; // ~densité graphène
    return Math.round(circumference * this.length * atomsPerNm2);
  }

  /** Couleur selon type pour la visualisation */
  get defaultColor() {
    switch (this.type) {
      case 'armchair': return '#22d3ee';
      case 'zigzag':   return '#facc15';
      default:         return '#818cf8';
    }
  }

  // ── Sérialisation ──────────────────────────────────────────────────

  toJSON() {
    return {
      m: this.m, n: this.n,
      length: this.length, rotation: this.rotation,
      color: this.color, label: this.label,
      hexKey: this.hexKey, omekaId: this.omekaId,
    };
  }

  static fromJSON(data) {
    const t = new Nanotube(data);
    t.omekaId = data.omekaId || null;
    return t;
  }

  /** Sérialise pour Omeka S (Dublin Core + propriétés métier) */
  toOmeka(itemSetId) {
    return {
      '@type': ['o:Item'],
      'o:item_set': [{ 'o:id': itemSetId }],
      'dcterms:title': [{ '@value': this.label || `Nanotube (${this.m},${this.n})`, type: 'literal' }],
      'dcterms:description': [{ '@value': JSON.stringify(this.toJSON()), type: 'literal' }],
      'dcterms:type': [{ '@value': `nanotube:${this.type}`, type: 'literal' }],
    };
  }

  static fromOmeka(item) {
    try {
      const desc = item['dcterms:description']?.[0]?.['@value'];
      if (desc) return Nanotube.fromJSON(JSON.parse(desc));
    } catch { /* ignore */ }
    return null;
  }

  clone() { return Nanotube.fromJSON(this.toJSON()); }
}

/** Génère un nanotube aléatoire */
export function randomNanotube(hexKey) {
  const types = [
    { m: 5, n: 5 },  // armchair
    { m: 7, n: 0 },  // zigzag
    { m: 6, n: 2 },  // chiral
    { m: 10, n: 10 }, { m: 9, n: 0 }, { m: 8, n: 3 },
  ];
  const t = types[Math.floor(Math.random() * types.length)];
  const colors = ['#22d3ee', '#facc15', '#818cf8', '#4ade80', '#f87171'];
  return new Nanotube({
    ...t,
    length: 15 + Math.random() * 40,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    hexKey,
  });
}
