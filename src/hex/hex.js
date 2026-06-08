/**
 * Implémentation des grilles hexagonales — Red Blob Games
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 * Coordonnées cube (q, r, s) avec q+r+s = 0
 */

export class Hex {
  constructor(q, r, s) {
    this.q = q; this.r = r; this.s = s;
    if (Math.round(q + r + s) !== 0) throw new Error(`Coordonnées cube invalides: ${q}+${r}+${s}≠0`);
  }

  add(b)      { return new Hex(this.q + b.q, this.r + b.r, this.s + b.s); }
  subtract(b) { return new Hex(this.q - b.q, this.r - b.r, this.s - b.s); }
  scale(k)    { return new Hex(this.q * k, this.r * k, this.s * k); }
  rotateLeft()  { return new Hex(-this.s, -this.q, -this.r); }
  rotateRight() { return new Hex(-this.r, -this.s, -this.q); }

  length() { return Math.floor((Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2); }
  distance(b) { return this.subtract(b).length(); }

  neighbor(dir) { return this.add(HEX_DIRECTIONS[dir]); }
  neighbors()   { return HEX_DIRECTIONS.map(d => this.add(d)); }

  diagonal(dir) { return this.add(HEX_DIAGONALS[dir]); }

  lerp(b, t) {
    return new FractionalHex(
      this.q * (1 - t) + b.q * t,
      this.r * (1 - t) + b.r * t,
      this.s * (1 - t) + b.s * t
    );
  }

  linedraw(b) {
    const n = this.distance(b);
    const results = [];
    const step = 1 / Math.max(n, 1);
    for (let i = 0; i <= n; i++) results.push(this.lerp(b, step * i).round());
    return results;
  }

  equals(b) { return this.q === b.q && this.r === b.r && this.s === b.s; }
  key()     { return `${this.q},${this.r},${this.s}`; }

  toString() { return `Hex(${this.q},${this.r},${this.s})`; }
}

export class FractionalHex {
  constructor(q, r, s) { this.q = q; this.r = r; this.s = s; }

  round() {
    let qi = Math.round(this.q), ri = Math.round(this.r), si = Math.round(this.s);
    const qd = Math.abs(qi - this.q), rd = Math.abs(ri - this.r), sd = Math.abs(si - this.s);
    if (qd > rd && qd > sd)       qi = -ri - si;
    else if (rd > sd)              ri = -qi - si;
    else                           si = -qi - ri;
    return new Hex(qi, ri, si);
  }
}

export const HEX_DIRECTIONS = [
  new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
  new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
];

export const HEX_DIAGONALS = [
  new Hex(2, -1, -1), new Hex(1, -2, 1), new Hex(-1, -1, 2),
  new Hex(-2, 1, 1),  new Hex(-1, 2, -1), new Hex(1, 1, -2)
];

export class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}

export class Orientation {
  constructor(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    this.f0 = f0; this.f1 = f1; this.f2 = f2; this.f3 = f3;
    this.b0 = b0; this.b1 = b1; this.b2 = b2; this.b3 = b3;
    this.startAngle = startAngle;
  }
}

export const LAYOUT_POINTY = new Orientation(
  Math.sqrt(3), Math.sqrt(3) / 2, 0, 3 / 2,
  Math.sqrt(3) / 3, -1 / 3, 0, 2 / 3,
  0.5
);

export const LAYOUT_FLAT = new Orientation(
  3 / 2, 0, Math.sqrt(3) / 2, Math.sqrt(3),
  2 / 3, 0, -1 / 3, Math.sqrt(3) / 3,
  0
);

export class Layout {
  constructor(orientation, size, origin) {
    this.orientation = orientation;
    this.size   = size;   // Point
    this.origin = origin; // Point
  }

  hexToPixel(h) {
    const M = this.orientation;
    const x = (M.f0 * h.q + M.f1 * h.r) * this.size.x;
    const y = (M.f2 * h.q + M.f3 * h.r) * this.size.y;
    return new Point(x + this.origin.x, y + this.origin.y);
  }

  pixelToHex(p) {
    const M = this.orientation;
    const pt = new Point(
      (p.x - this.origin.x) / this.size.x,
      (p.y - this.origin.y) / this.size.y
    );
    const q = M.b0 * pt.x + M.b1 * pt.y;
    const r = M.b2 * pt.x + M.b3 * pt.y;
    return new FractionalHex(q, r, -q - r).round();
  }

  hexCornerOffset(corner) {
    const M = this.orientation;
    const angle = 2 * Math.PI * (M.startAngle - corner) / 6;
    return new Point(this.size.x * Math.cos(angle), this.size.y * Math.sin(angle));
  }

  polygonCorners(h) {
    const center = this.hexToPixel(h);
    return Array.from({ length: 6 }, (_, i) => {
      const off = this.hexCornerOffset(i);
      return new Point(center.x + off.x, center.y + off.y);
    });
  }

  polygonPath(h) {
    return this.polygonCorners(h).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
  }
}

/** Génère une grille hexagonale circulaire de rayon r */
export function hexRing(center, radius) {
  if (radius === 0) return [center];
  const results = [];
  let h = center.add(HEX_DIRECTIONS[4].scale(radius));
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      results.push(h);
      h = h.neighbor(i);
    }
  }
  return results;
}

export function hexSpiral(center, radius) {
  const results = [center];
  for (let r = 1; r <= radius; r++) results.push(...hexRing(center, r));
  return results;
}

export function hexRectangle(w, h, offset = 'odd-r') {
  const results = [];
  for (let r = 0; r < h; r++) {
    const rOffset = offset === 'odd-r' ? Math.floor(r / 2) : Math.ceil(r / 2);
    for (let q = -rOffset; q < w - rOffset; q++) {
      results.push(new Hex(q, r, -q - r));
    }
  }
  return results;
}
