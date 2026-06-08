/**
 * Gestionnaire de la cartographie hexagonale 2D (SVG)
 * Rendu D3 + interactions, basé sur l'implémentation Red Blob Games
 */
import * as d3 from 'd3';
import { Hex, Layout, LAYOUT_POINTY, LAYOUT_FLAT, Point, hexSpiral } from './hex.js';

const HEX_SIZE_2D = 22;

export class HexMap {
  constructor(svgElement) {
    this.svg = d3.select(svgElement);
    this.svgEl = svgElement;
    this.hexes  = [];
    this.tubes  = new Map(); // hexKey → Nanotube
    this.layout = null;
    this.selectedKey = null;
    this._onSelectCallbacks = [];
    this._onAddTubeCallbacks = [];

    this.g = this.svg.append('g').attr('class', 'hex-root');
    this._initZoom();
  }

  _initZoom() {
    const zoom = d3.zoom()
      .scaleExtent([0.3, 4])
      .on('zoom', e => this.g.attr('transform', e.transform));
    this.svg.call(zoom);
    this._zoom = zoom;
  }

  build(radius = 5, orientStr = 'pointy') {
    const orient = orientStr === 'flat' ? LAYOUT_FLAT : LAYOUT_POINTY;
    const container = this.svgEl.parentElement;
    const w = (container?.clientWidth  || this.svgEl.clientWidth  || 260);
    const h = (container?.clientHeight || this.svgEl.clientHeight || 300);
    // Fixer les dimensions SVG explicitement
    this.svg.attr('width', w).attr('height', h);
    this.layout = new Layout(orient, new Point(HEX_SIZE_2D, HEX_SIZE_2D), new Point(w / 2, h / 2));
    this.hexes  = hexSpiral(new Hex(0, 0, 0), radius);
    this._render();
    this.centerView();
  }

  _render() {
    this.g.selectAll('.hex-cell').remove();

    const cells = this.g.selectAll('.hex-cell')
      .data(this.hexes, d => d.key())
      .join('g')
      .attr('class', d => {
        const hasTube = this.tubes.has(d.key());
        const selected = d.key() === this.selectedKey;
        return `hex-cell ${hasTube ? 'has-tube' : ''} ${selected ? 'selected' : ''}`;
      })
      .attr('data-key', d => d.key())
      .on('click', (e, d) => {
        e.stopPropagation();
        this._selectHex(d.key());
      })
      .on('dblclick', (e, d) => {
        e.stopPropagation();
        this._onAddTubeCallbacks.forEach(cb => cb(d.key()));
      });

    cells.append('path')
      .attr('class', 'hex-bg')
      .attr('d', d => this.layout.polygonPath(d))
      .attr('fill', d => {
        const tube = this.tubes.get(d.key());
        if (tube) return d3.color(tube.color)?.copy({ opacity: 0.18 })?.formatRgb() || 'rgba(34,211,238,0.12)';
        return 'rgba(14,20,30,0.6)';
      })
      .attr('stroke', d => d.key() === this.selectedKey ? '#22d3ee' : '#2d3a4f')
      .attr('stroke-width', d => d.key() === this.selectedKey ? 2 : 0.8);

    cells.append('text')
      .attr('class', 'hex-label')
      .attr('x', d => this.layout.hexToPixel(d).x)
      .attr('y', d => this.layout.hexToPixel(d).y)
      .text(d => {
        const tube = this.tubes.get(d.key());
        return tube ? `(${tube.m},${tube.n})` : `${d.q},${d.r}`;
      });
  }

  _selectHex(key) {
    this.selectedKey = key;
    this._render();
    this._onSelectCallbacks.forEach(cb => cb(key));
  }

  selectHex(key) { this._selectHex(key); }

  setTube(hexKey, tube) {
    this.tubes.set(hexKey, tube);
    this._render();
  }

  removeTube(hexKey) {
    this.tubes.delete(hexKey);
    this._render();
  }

  clear() {
    this.tubes.clear();
    this._render();
  }

  onSelect(cb)  { this._onSelectCallbacks.push(cb); }
  onAddTube(cb) { this._onAddTubeCallbacks.push(cb); }

  centerView() {
    const w = this.svgEl.clientWidth  || 260;
    const h = this.svgEl.clientHeight || 300;
    this.svg.call(this._zoom.transform, d3.zoomIdentity.translate(w / 2, h / 2).scale(1).translate(-w / 2, -h / 2));
  }

  hexFromKey(key) {
    return this.hexes.find(h => h.key() === key);
  }

  getStats() {
    const byType = { armchair: 0, zigzag: 0, chiral: 0 };
    this.tubes.forEach(t => byType[t.type]++);
    return { total: this.tubes.size, byType, hexCount: this.hexes.length };
  }
}
