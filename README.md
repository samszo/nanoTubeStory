# ⬡ NanoTubeStory

> Cartographies 3D interactives de nanotubes de carbone sur grilles hexagonales, avec hexagones cliquables, agent IA et persistance Omeka S.

**[📖 Documentation complète](./docs/README.md)** · **[📐 Diagrammes Mermaid](./docs/DIAGRAMS.md)**

---

## Démarrage rapide

```bash
npm install
cp .env.example .env   # configurer Omeka S et clé Anthropic (optionnel)
npm run dev            # → http://localhost:3000
```

## Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| **Visualisation 3D** | Lattice honeycomb graphène exact projeté sur cylindre |
| **Grille hexagonale** | Coordonnées cube, orientations pointy/flat-top |
| **Hexagones cliquables** | Chaque hexagone du tube ouvre un panel de propriétés |
| **Templates Omeka S** | Associe les propriétés d'un hexagone à un resource template |
| **Tube enfant** | Spawn récursif perpendiculaire à la face cliquée, diamètre = cercle inscrit |
| **Agent IA** | Claude (Anthropic SDK) pour analyser et optimiser les configurations |
| **Persistance** | Sauvegarde cartographies et hexagones via API REST Omeka S |

## Stack

Three.js · D3.js · Anthropic SDK · Omeka S · Vite
