# ⬡ NanoTubeStory

> Cartographies 3D interactives de nanotubes de carbone sur grilles hexagonales — réseau honeycomb graphène exact, hexagones cliquables, nanotubes enfants récursifs, import/export JSON et persistance Omeka S.

**[📖 Documentation complète](./docs/README.md)** · **[📐 Diagrammes Mermaid](./docs/DIAGRAMS.md)**

---

## Démarrage rapide

```bash
npm install
cp .env.example .env   # configurer Omeka S
npm run dev            # → http://localhost:3000
```

## Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| **Visualisation 3D** | Lattice honeycomb graphène exact (liaisons C-C) projeté sur cylindre |
| **Chiralité (m,n)** | Armchair / Zigzag / Chiral — diamètre, conductivité et band gap calculés en temps réel |
| **Grille hexagonale** | Coordonnées cube `(q,r,s)`, orientations pointy/flat-top, rayon paramétrable |
| **Hexagones cliquables** | Chaque hexagone du tube ouvre un panel de propriétés Omeka S |
| **Tube enfant** | Spawn récursif perpendiculaire à la face cliquée, diamètre = cercle inscrit |
| **Import / Export JSON** | Sérialisation complète : tubes parents + enfants + métadonnées hexagones |
| **Persistance Omeka S** | Sauvegarde cartographies et hexagones via API REST avec resource templates |

## Chiralité — résumé rapide

Un nanotube de carbone est défini par son **vecteur chiral** `(m, n)` qui détermine comment la feuille de graphène est enroulée :

| (m, n) | Type | Conductivité | d (nm) | θ |
|--------|------|---|---|---|
| m = n | Armchair | Toujours métallique | `(a₀/π)√(m²+mn+n²)` | 30° |
| n = 0 | Zigzag | SC sauf si m mod 3 = 0 | idem | 0° |
| autre | Chiral | Métallique si (m−n) mod 3 = 0 | idem | 0°–30° |

→ [Explication complète de la chiralité dans la documentation](./docs/README.md#2-physique-des-nanotubes-de-carbone)

## Stack

Three.js · D3.js · Vite · Omeka S
