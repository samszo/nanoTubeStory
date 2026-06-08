/**
 * Visualisations D3.js — distribution des types et propriétés des nanotubes
 */
import * as d3 from 'd3';

const COLORS = {
  armchair: '#22d3ee',
  zigzag:   '#facc15',
  chiral:   '#818cf8',
};

export class NanoCharts {
  constructor(distContainer, propsContainer) {
    this.distEl  = distContainer;
    this.propsEl = propsContainer;
    this._buildDistChart();
    this._buildPropsChart();
  }

  // ── Graphique de distribution des types ───────────────────────────

  _buildDistChart() {
    this.distEl.innerHTML = '<div class="chart-title">Distribution des types</div>';
    const W = 280, H = 90;
    this.distSvg = d3.select(this.distEl)
      .append('svg').attr('width', W).attr('height', H);
    this.distG = this.distSvg.append('g').attr('transform', 'translate(40,10)');
  }

  updateDistribution(tubes) {
    const byType = { armchair: 0, zigzag: 0, chiral: 0 };
    tubes.forEach(t => byType[t.type] = (byType[t.type] || 0) + 1);
    const data = Object.entries(byType).map(([type, count]) => ({ type, count }));

    const W = 280, H = 90;
    const innerW = W - 40, innerH = H - 20;

    const x = d3.scaleBand().domain(data.map(d => d.type)).range([0, innerW]).padding(0.3);
    const y = d3.scaleLinear().domain([0, Math.max(1, d3.max(data, d => d.count))]).range([innerH, 0]);

    this.distG.selectAll('*').remove();

    this.distG.append('g').attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select('.domain').remove())
      .selectAll('text').attr('fill', '#7a8fa8').attr('font-size', 10);

    this.distG.selectAll('.bar')
      .data(data).join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.type))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => innerH - y(d.count))
      .attr('fill', d => COLORS[d.type] || '#22d3ee')
      .attr('rx', 3);

    this.distG.selectAll('.count-label')
      .data(data).join('text')
      .attr('class', 'count-label')
      .attr('x', d => x(d.type) + x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 3)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', '#e2e8f0')
      .text(d => d.count || '');
  }

  // ── Graphique des propriétés physiques ────────────────────────────

  _buildPropsChart() {
    this.propsEl.innerHTML = '<div class="chart-title">Diamètres (nm)</div>';
    const W = 280, H = 100;
    this.propsSvg = d3.select(this.propsEl)
      .append('svg').attr('width', W).attr('height', H);
    this.propsG = this.propsSvg.append('g').attr('transform', 'translate(50,8)');
  }

  updateProperties(tubes) {
    if (tubes.length === 0) { this.propsG.selectAll('*').remove(); return; }

    const data = tubes.map(t => ({ key: t.hexKey, d: +t.diameter.toFixed(3), color: t.color, type: t.type }))
      .sort((a, b) => a.d - b.d);

    const W = 280, H = 100;
    const innerW = W - 50, innerH = H - 20;

    const x = d3.scaleLinear().domain([0, d3.max(data, d => d.d) * 1.1]).range([0, innerW]);
    const y = d3.scaleBand().domain(data.map(d => d.key)).range([0, innerH]).padding(0.2);

    this.propsG.selectAll('*').remove();

    this.propsG.append('g').call(d3.axisLeft(y).tickSize(0).tickFormat(() => ''))
      .call(g => g.select('.domain').attr('stroke', '#2d3a4f'))
      .selectAll('line').attr('stroke', '#2d3a4f');

    this.propsG.append('g').attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(4).tickSize(3))
      .call(g => g.select('.domain').attr('stroke', '#2d3a4f'))
      .selectAll('text').attr('fill', '#7a8fa8').attr('font-size', 9);

    this.propsG.selectAll('.hbar')
      .data(data).join('rect')
      .attr('class', 'hbar bar')
      .attr('x', 0)
      .attr('y', d => y(d.key))
      .attr('width', d => x(d.d))
      .attr('height', y.bandwidth())
      .attr('fill', d => COLORS[d.type] || d.color)
      .attr('rx', 2);

    this.propsG.selectAll('.hbar-label')
      .data(data).join('text')
      .attr('x', d => x(d.d) + 3)
      .attr('y', d => y(d.key) + y.bandwidth() / 2)
      .attr('dominant-baseline', 'central')
      .attr('font-size', 9)
      .attr('fill', '#7a8fa8')
      .text(d => `${d.d} nm`);
  }

  // ── Scatter plot : band gap vs diamètre ────────────────────────────

  buildScatter(tubes) {
    // Construit/met à jour une mini-visu scatter dans le même conteneur props
    // (si besoin d'extension)
  }

  update(tubes) {
    const arr = Array.from(tubes.values());
    this.updateDistribution(arr);
    this.updateProperties(arr);
  }
}
