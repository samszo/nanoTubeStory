# ⬡ NanoTubeStory — Documentation technique

> Application web mono-page pour créer, visualiser et analyser des **cartographies 3D de nanotubes de carbone** sur grilles hexagonales, assistée par un agent IA.

| | |
|---|---|
| **Version** | 1.0.0 |
| **Date** | 2026-06-08 |
| **Stack** | Three.js · D3.js · Anthropic SDK · Omeka S |
| **Licence** | MIT |
| **Diagrammes** | [📐 DIAGRAMS.md](./DIAGRAMS.md) — 10 diagrammes Mermaid |

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Physique des nanotubes de carbone](#2-physique-des-nanotubes-de-carbone)
3. [Cartographie hexagonale](#3-cartographie-hexagonale)
4. [Architecture technique](#4-architecture-technique)
5. [Installation et configuration](#5-installation-et-configuration)
6. [Guide utilisateur](#6-guide-utilisateur)
7. [API Omeka S](#7-api-omeka-s)
8. [Agent IA (Anthropic SDK)](#8-agent-ia-anthropic-sdk)
9. [Référence des modules](#9-référence-des-modules)
10. [Glossaire](#10-glossaire)

---

## 1. Introduction

**NanoTubeStory** est une application web interactive permettant de créer, visualiser et analyser des cartographies tridimensionnelles de nanotubes de carbone disposés sur des grilles hexagonales. Elle combine une visualisation scientifique avancée avec un agent IA capable d'analyser les propriétés physiques des configurations.

### 1.1 Objectifs

- **Visualisation 3D** — Rendu interactif de nanotubes avec réseau hexagonal carbone, capuchons et effets lumineux
- **Cartographie spatiale** — Placement et organisation de nanotubes sur grilles hexagonales paramétrables
- **Analyse physique** — Calcul automatique du diamètre, conductivité et band gap selon la chiralité `(m,n)`
- **Assistance IA** — Agent basé sur Claude (Anthropic) pour analyser et optimiser les configurations
- **Persistance** — Sauvegarde et chargement des cartographies via l'API REST Omeka S

### 1.2 Stack technologique

| Module | Technologie | Rôle |
|--------|-------------|------|
| Rendu 3D | Three.js v0.177 | Scène WebGL, géométrie CNT, éclairage PBR |
| Grille hex | D3.js v7 + Red Blob Games | SVG, coordonnées cube, interactions |
| Graphiques | D3.js v7 | Distribution types, comparaison diamètres |
| Agent IA | Anthropic SDK + Tool Use | Analyse, suggestion, génération CNT |
| Persistance | Omeka S REST API | CRUD cartographies, Items Dublin Core |
| Build | Vite v6 | ESM, HMR, bundling production |

---

## 2. Physique des nanotubes de carbone

> 📐 Voir aussi : [DIAGRAMS.md — Classification par chiralité](./DIAGRAMS.md#2-classification-des-nanotubes-par-chiralité)

Un **nanotube de carbone à paroi simple (SWNT)** est formé en enroulant une feuille de graphène — réseau hexagonal bidimensionnel d'atomes de carbone — en cylindre. Ses propriétés physiques et électroniques sont entièrement déterminées par le **vecteur chiral** :

$$\vec{C_h} = m \cdot \vec{a_1} + n \cdot \vec{a_2}$$

où `(m, n)` sont les **indices de chiralité**.

### 2.1 Classification par chiralité

| Type | Condition | Angle chiral | Conductivité | Exemple |
|------|-----------|:---:|---|---|
| **Armchair** | `m = n` | 30° | Toujours métallique | (5,5), (10,10) |
| **Zigzag** | `n = 0` | 0° | Semi-conducteur (sauf `(3k,0)`) | (7,0), (9,0) |
| **Chiral** | `m ≠ n`, `n ≠ 0` | 0°–30° | Métallique si `(m-n) mod 3 = 0` | (6,2), (8,3) |

### 2.2 Formules physiques implémentées

#### Diamètre (en nm)

$$d = \frac{a_0}{\pi} \sqrt{m^2 + mn + n^2}$$

avec `a₀ = 0.246 nm` (constante de réseau du graphène) et une longueur de liaison C-C de `0.142 nm`.

```js
// src/nanotube/nanotube.js
get diameter() {
  return (A0 / Math.PI) * Math.sqrt(this.m ** 2 + this.m * this.n + this.n ** 2);
}
```

#### Conductivité électrique

```
Métallique     si  (m - n) mod 3 = 0  (dont tous les armchair)
Semi-conducteur  sinon
```

#### Band gap des semi-conducteurs (eV)

$$E_g \approx \frac{0.9}{d}$$

> Cette relation (approximation *tight-binding*) montre qu'un nanotube plus petit a un band gap plus large — les CNT ultra-minces (d < 0.5 nm) ont des propriétés proches des molécules organiques.

### 2.3 Exemples numériques

| Nanotube | Type | Diamètre | Conductivité | Band gap |
|----------|------|:---:|---|:---:|
| (5,5) | Armchair | 0.678 nm | Métallique | 0 eV |
| (10,10) | Armchair | 1.356 nm | Métallique | 0 eV |
| (7,0) | Zigzag | 0.548 nm | Semi-conducteur | 1.64 eV |
| (6,2) | Chiral | 0.564 nm | Semi-conducteur | 1.60 eV |
| (9,0) | Zigzag | 0.705 nm | Semi-conducteur | 1.28 eV |

### 2.4 Structure des nanotubes multi-parois (MWNT)

Les **MWNT** contiennent plusieurs couches cylindriques concentriques avec un espacement inter-couche de **0.34 nm** (identique à l'espacement inter-feuillet du graphite). NanoTubeStory visualise principalement les SWNT, mais le modèle de données est extensible aux MWNT.

---

## 3. Cartographie hexagonale

> 📐 Voir aussi : [DIAGRAMS.md — Coordonnées cube & voisins](./DIAGRAMS.md#9-coordonnées-hexagonales-cube--voisins-et-directions)

L'application utilise l'implémentation de référence de **Red Blob Games** ([redblobgames.com/grids/hexagons](https://www.redblobgames.com/grids/hexagons/implementation.html)) basée sur les **coordonnées cube**, le système le plus puissant pour les algorithmes sur grilles hexagonales.

### 3.1 Systèmes de coordonnées

| Système | Coordonnées | Contrainte | Usage dans NTS |
|---------|-------------|---|---|
| **Cube** | `(q, r, s)` | `q + r + s = 0` | Stockage interne, algorithmes |
| **Axial** | `(q, r)` | `s = -q-r` implicite | Affichage compact |
| **Offset** | `(col, row)` | Décalage pair/impair | Import/export utilisateur |

### 3.2 Visualisation de la grille

```
        ___         ___
       /   \       /   \
  ___ /(5,5)\ ___ /(6,2)\ ___
 /   \\(arm) /   \\(chr) /   \
/(7,0)\ ___ /     \ ___ /(9,0)\
\(zig) /   \ vide  /   \(zig) /
 \ ___/     \ ___ /     \ ___/
       \ ___ /     \ ___ /
```

- 🟦 **Armchair** `(m=n)` — conductivité métallique
- 🟪 **Chiral** — semi-conducteur variable
- 🟡 **Zigzag** `(n=0)` — semi-conducteur majoritaire

**Interactions :**
- **Double-clic** sur une cellule → ajoute un nanotube aléatoire
- **Clic simple** → sélectionne la cellule pour édition

### 3.3 Algorithmes implémentés

| Fonction | Description |
|----------|-------------|
| `hexSpiral(center, radius)` | Génère `3r²+3r+1` cellules en spirale concentrique |
| `hexRing(center, radius)` | Cellules d'un anneau à distance exacte `r` |
| `Layout.hexToPixel(hex)` | Coordonnées cube → pixels SVG (pointy-top / flat-top) |
| `Layout.pixelToHex(point)` | Pixels → hexagone avec arrondi `FractionalHex` |
| `Hex.distance(other)` | `(|dq| + |dr| + |ds|) / 2` |
| `Hex.linedraw(other)` | Tracé par interpolation linéaire + arrondi |
| `Hex.neighbors()` | Les 6 voisins directs |

### 3.4 Orientations supportées

```
   Pointy-top            Flat-top
      /\                  ___
     /  \                /   \
    |    |              |     |
     \  /                \___/
      \/
```

Les deux orientations sont paramétrables via le sélecteur **Orientation** dans le panneau gauche.

---

## 4. Architecture technique

> 📐 Voir aussi : [DIAGRAMS.md — Architecture générale](./DIAGRAMS.md#1-architecture-générale) et [Modèle de classes](./DIAGRAMS.md#4-modèle-de-classes--modules-principaux)

### 4.1 Structure des fichiers

```
nanoTubeStory/
├── index.html                  # SPA entry point
├── vite.config.js              # Config Vite
├── package.json
├── .env.example                # Variables d'environnement
└── src/
    ├── main.js                 # Point d'entrée — instancie App
    ├── app.js                  # Contrôleur principal (orchestration)
    ├── style.css               # Design system dark mode
    ├── hex/
    │   ├── hex.js              # Hex, Layout, coordonnées cube (Red Blob Games)
    │   └── hexMap.js           # Rendu SVG D3.js + interactions
    ├── nanotube/
    │   ├── nanotube.js         # Modèle physique CNT (chiralité, propriétés)
    │   └── geometry.js         # Géométrie Three.js (tube + réseau carbone)
    ├── scene/
    │   └── scene3d.js          # Scène Three.js + OrbitControls + raycaster
    ├── charts/
    │   └── charts.js           # Graphiques D3.js (distribution, diamètres)
    ├── agents/
    │   └── agents.js           # Agent Anthropic SDK + Tool Use (browser)
    └── api/
        └── omeka.js            # Client REST Omeka S (CRUD cartographies)
```

### 4.2 Flux de données

```
Utilisateur
    │
    ▼
HexMap (SVG D3)  ──────────────────────────────────────────┐
    │ sélection/ajout                                       │
    ▼                                                       │
App.js (contrôleur)                                        │
    ├─── Nanotube (modèle physique)                        │
    │         └── calcule diamètre, type, Eg               │
    ├─── Scene3D (Three.js)                                │
    │         └── buildNanotubeGroup() → WebGL             │
    ├─── NanoCharts (D3.js)                                │
    │         └── distribution + diamètres                 │
    ├─── OmekaClient (REST)                                │
    │         └── POST/PATCH/GET items                     │
    └─── streamAgentResponse (Anthropic)                   │
              └── stream + tool use ────────────────────────┘
```

### 4.3 Pattern architectural

L'application suit un pattern **contrôleur central** (`app.js`) qui :
- Instancie tous les modules au démarrage
- Reçoit les événements des vues (HexMap, Scene3D)
- Coordonne les mises à jour croisées
- Gère le state partagé (`tubes: Map<hexKey, Nanotube>`)

---

## 5. Installation et configuration

### 5.1 Prérequis

- **Node.js** ≥ 18.0.0 + npm ≥ 9
- Navigateur moderne avec support **WebGL 2** (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)
- *(Optionnel)* Instance **Omeka S** ≥ 3.0 pour la persistance
- *(Optionnel)* Clé API **Anthropic** pour l'agent IA

### 5.2 Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-org/nanotube-story.git
cd nanotube-story

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Lancer le serveur de développement
npm run dev
# → http://localhost:3000

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

### 5.3 Variables d'environnement

```env
# .env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-…
VITE_OMEKA_API_URL=http://omeka.example.com/api
VITE_OMEKA_KEY_IDENTITY=aBcDeFgH
VITE_OMEKA_KEY_CREDENTIAL=xYz12345
VITE_OMEKA_ITEM_SET_ID=1
```

| Variable | Description | Obligatoire |
|----------|-------------|:-----------:|
| `VITE_ANTHROPIC_API_KEY` | Clé API Claude (Anthropic) | Non |
| `VITE_OMEKA_API_URL` | URL de base de l'API Omeka S | Non |
| `VITE_OMEKA_KEY_IDENTITY` | Identifiant de clé Omeka S | Non |
| `VITE_OMEKA_KEY_CREDENTIAL` | Mot de passe de clé Omeka S | Non |
| `VITE_OMEKA_ITEM_SET_ID` | ID du jeu d'items cible | Non |

> **Note :** Les clés peuvent aussi être saisies directement dans l'interface via le bouton ⚙ → elles sont persistées dans `localStorage`.

### 5.4 Dépendances npm

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.39.0",
    "d3": "^7.9.0",
    "three": "^0.177.0"
  },
  "devDependencies": {
    "vite": "^6.3.5"
  }
}
```

---

## 6. Guide utilisateur

### 6.1 Interface principale

```
┌─────────────────────────────────────────────────────────────────────┐
│ ⬡ NanoTubeStory  [+Carte] [💾Sauver] [📂Charger] [⬇Exporter]      │
│                  [3D] [Hex] [⊞]                    ● Omeka S  [⚙]  │
├──────────────┬─────────────────────────────────┬────────────────────┤
│ CARTOGRAPHIE │                                 │ PROPRIÉTÉS         │
│              │                                 │ Chiralité (m,n)    │
│  Grille SVG  │      Scène 3D (Three.js)        │ Type / Diamètre    │
│  hexagonale  │      avec nanotubes             │ Conductivité       │
│  D3.js       │      et grille                  │ Band gap           │
│              │                                 │                    │
│ GRILLE       │                            [⌖]  │ ANALYSE (D3)       │
│ Rayon: 5     │                            [⊞]  │ ▦ Distribution     │
│ Orientation  │                            [A]  │ ▦ Diamètres        │
│              │                            [📷] │                    │
│              │                                 │ OMEKA S            │
├──────────────┴─────────────────────────────────┴────────────────────┤
│ 🤖 Agent Mastra              [EN ATTENTE]                       [▲] │
│ [Demandez à l'agent…]               [Envoyer] [💡Suggérer] [⚡Opt.] │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Panneau gauche — Cartographie hexagonale

| Élément | Action |
|---------|--------|
| **Double-clic** sur une cellule | Ajoute un nanotube aléatoire |
| **Clic simple** sur une cellule | Sélectionne (affiche les propriétés) |
| **Scroll** | Zoom sur la grille SVG |
| **Glisser** | Panoramique de la grille |
| **Rayon (1–15)** | Recrée la grille (efface les tubes) |
| **Orientation** | Bascule Pointy-top / Flat-top |

### 6.3 Viewport 3D (Three.js)

| Contrôle | Action |
|----------|--------|
| **Clic + glisser** | Rotation orbitale |
| **Molette** | Zoom |
| **Clic droit + glisser** | Panoramique |
| **Clic sur un tube** | Sélectionne le nanotube |
| **⌖** | Réinitialise la caméra |
| **⊞** | Affiche/masque la grille et les contours |
| **📷** | Capture la scène en PNG |

### 6.4 Panneau droit — Éditeur de nanotube

```
Chiralité (m, n) : [5] [5]
Type :             [ARMCHAIR]        ← mis à jour en temps réel

Longueur (nm) :    ●────────────  20
Rotation (°) :     ●────────────   0
Couleur :          [████████████]

Diamètre     : 0.678 nm
Conductivité : Métallique
Band gap     : 0 eV

[Appliquer]  [Supprimer]
```

Les propriétés physiques (diamètre, conductivité, band gap) se recalculent automatiquement dès que vous modifiez `m` ou `n`.

### 6.5 Vues disponibles

| Bouton | Vue | Description |
|--------|-----|-------------|
| **3D** | Viewport seul | Plein écran Three.js |
| **Hex** | Grille seule | Plein écran SVG 2D |
| **⊞** | Partagée | Grille à gauche + 3D au centre |

### 6.6 Workflow typique

```
1. Choisir un rayon de grille (ex. 5)
2. Double-cliquer sur des cellules pour placer des nanotubes
3. Sélectionner un tube → modifier (m,n) → [Appliquer]
4. Consulter les graphiques D3 (distribution, diamètres)
5. Demander une analyse à l'agent IA : [⚡ Optimiser]
6. Saisir un titre → [💾 Sauver] (Omeka S)
```

---

## 7. API Omeka S

> 📐 Voir aussi : [DIAGRAMS.md — CRUD Omeka S](./DIAGRAMS.md#6-crud-omeka-s--séquence-complète) et [Cycle de vie](./DIAGRAMS.md#7-cycle-de-vie-dune-cartographie)

[Omeka S](https://omeka.org/s/) est un système de gestion de collections web. NanoTubeStory l'utilise comme backend de persistance via son **API REST**. Chaque cartographie est stockée comme un **Item** avec le vocabulaire **Dublin Core**.

### 7.1 Configuration

```
URL API      : http://omeka.example.com/api
Key Identity : aBcDeFgH          (dans Administration → API keys)
Key Credential : xYz12345
Item Set ID  : 1                 (le set qui contiendra les cartes)
```

### 7.2 Endpoints utilisés

| Méthode | Endpoint | Action |
|---------|----------|--------|
| `GET` | `/api` | Test de connexion |
| `GET` | `/api/items?item_set_id=N&per_page=50` | Lister les cartographies |
| `GET` | `/api/items/{id}` | Charger une cartographie |
| `POST` | `/api/items` | Créer une nouvelle cartographie |
| `PATCH` | `/api/items/{id}` | Mettre à jour une cartographie |
| `DELETE` | `/api/items/{id}` | Supprimer une cartographie |

### 7.3 Format de données

Chaque cartographie est stockée comme un Item Omeka S :

```json
{
  "@type": ["o:Item"],
  "o:item_set": [{ "o:id": 1 }],
  "dcterms:title": [{
    "@value": "Ma cartographie CNT",
    "type": "literal"
  }],
  "dcterms:description": [{
    "@value": "{\"tubes\":[{\"m\":5,\"n\":5,\"length\":20,\"rotation\":0,\"color\":\"#22d3ee\",\"hexKey\":\"0,0,0\"},{\"m\":7,\"n\":0,...}],\"gridRadius\":5,\"orientation\":\"pointy\",\"version\":\"1.0\"}",
    "type": "literal"
  }],
  "dcterms:subject": [{
    "@value": "nanotube-cartography",
    "type": "literal"
  }]
}
```

> Le champ `dcterms:description` contient un **JSON sérialisé** avec la liste complète des nanotubes et les paramètres de la grille.

### 7.4 Classe OmekaClient

```js
import { OmekaClient } from './src/api/omeka.js';

const client = new OmekaClient({
  url: 'http://omeka.example.com/api',
  keyId: 'aBcDeFgH',
  keyCred: 'xYz12345',
  itemSetId: 1,
});

// Test de connexion
const ok = await client.ping(); // → true/false

// CRUD
const maps  = await client.listMaps();       // [{ id, title, modified }]
const map   = await client.getMap(42);       // { omekaId, title, tubes, gridRadius, ... }
const saved = await client.saveMap(mapData); // crée ou met à jour
await client.deleteMap(42);
```

---

## 8. Agent IA (Anthropic SDK)

> 📐 Voir aussi : [DIAGRAMS.md — Boucle agentic](./DIAGRAMS.md#5-boucle-agentic--tool-use-anthropic)

L'agent est implémenté avec l'**Anthropic SDK** en mode browser (`dangerouslyAllowBrowser: true`) en utilisant les **Tool Use** (function calling) de Claude. Il suit une architecture agentic multi-tours.

### 8.1 Tools disponibles

#### `analyze_nanotube_config`
Analyse statistique d'une configuration.

```json
{
  "name": "analyze_nanotube_config",
  "input": {
    "tubes": [{ "m": 5, "n": 5, "type": "armchair", "diameter": 0.678, "conductivity": "Métallique" }]
  },
  "output": {
    "totalTubes": 6,
    "metallicCount": 2,
    "semiconductorCount": 4,
    "avgDiameter": "0.621 nm",
    "typeDistribution": { "armchair": 1, "zigzag": 3, "chiral": 2 },
    "dominantType": "zigzag"
  }
}
```

#### `suggest_nanotube`
Suggère des paramètres `(m,n)` selon la propriété souhaitée.

| `desired_property` | Suggestion | Rationale |
|--------------------|------------|-----------|
| `metallic` | (5,5) | Armchair — conductivité métallique parfaite |
| `semiconductor` | (6,2) | Chiral — Eg ≈ 0.5 eV |
| `high-strength` | (10,10) | Grand diamètre, haute résistance |
| `small-diameter` | (4,0) | Diamètre ~0.31 nm |
| `large-diameter` | (15,15) | Diamètre ~2 nm |

#### `generate_configuration`
Génère une configuration complète pour un objectif.

| `optimization_goal` | Tubes suggérés |
|---------------------|----------------|
| `max-conductivity` | (5,5), (10,10), (7,7), (9,9)… |
| `max-semiconductor` | (6,2), (8,3), (7,0), (9,3)… |
| `mixed` | Mix armchair + chiral + zigzag |
| `uniform-diameter` | Tous (6,6) — diamètre constant |

### 8.2 Boucle agentic multi-tours

```
streamAgentResponse(apiKey, userMessage, onDelta, onTool)
│
├── Tour 1 : Envoi au modèle claude-sonnet-4-6
│   ├── Stream text_delta → onDelta(chunk)    [affichage temps réel]
│   ├── Si stop_reason = "end_turn" → FIN
│   └── Si stop_reason = "tool_use" :
│       ├── Exécuter tool localement (executeTool)
│       ├── onTool(name, input, result)       [log dans UI]
│       └── Ajouter tool_result aux messages
│
├── Tour 2 : Réponse post-outil (stream)
│   └── …
│
└── Tour 3 max : Sécurité anti-boucle infinie
```

### 8.3 Exemples de requêtes

```
# Boutons intégrés
[💡 Suggérer]  → "La configuration actuelle contient principalement
                  des nanotubes de type 'zigzag'. Suggère une
                  amélioration pour optimiser la conductivité globale."

[⚡ Optimiser] → "Optimise la disposition de N nanotubes sur M cellules
                  hexagonales pour maximiser les propriétés semi-
                  conductrices. Distribution actuelle: {...}"

# Requêtes libres
"Explique pourquoi le nanotube armchair (5,5) est toujours métallique."
"Quelle configuration hexagonale maximise la densité de nanotubes semi-conducteurs ?"
"Compare les propriétés électroniques de (6,2) et (7,0)."
"Quel (m,n) donne le band gap le plus proche de 1 eV ?"
```

### 8.4 Prompt système

L'agent dispose d'un prompt système complet couvrant :
- Classification par chiralité (armchair/zigzag/chiral)
- Formules physiques (diamètre, conductivité, band gap)
- Coordonnées hexagonales cube `(q,r,s)`
- Consigne de réponse en français, concise et scientifique

---

## 9. Référence des modules

### `src/hex/hex.js`

```js
class Hex(q, r, s)
```

Hexagone en coordonnées cube. `q + r + s === 0` obligatoire.

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `add` | `(b: Hex) → Hex` | Addition vectorielle |
| `subtract` | `(b: Hex) → Hex` | Soustraction |
| `scale` | `(k: number) → Hex` | Mise à l'échelle |
| `length` | `() → number` | Distance à l'origine |
| `distance` | `(b: Hex) → number` | Distance entre deux hex |
| `neighbor` | `(dir: 0–5) → Hex` | Voisin dans une direction |
| `neighbors` | `() → Hex[]` | Les 6 voisins |
| `linedraw` | `(b: Hex) → Hex[]` | Tracé de ligne |
| `key` | `() → string` | Clé unique `"q,r,s"` |

```js
class Layout(orientation, size: Point, origin: Point)
```

| Méthode | Description |
|---------|-------------|
| `hexToPixel(h)` | Coordonnées cube → `Point` en pixels |
| `pixelToHex(p)` | Pixel → `Hex` (avec arrondi FractionalHex) |
| `polygonCorners(h)` | Tableau des 6 sommets d'un hexagone |
| `polygonPath(h)` | Chemin SVG `M…L…Z` |

```js
// Constantes
LAYOUT_POINTY  // Orientation pointy-top (défaut)
LAYOUT_FLAT    // Orientation flat-top

// Générateurs
hexSpiral(center: Hex, radius: number) → Hex[]
hexRing(center: Hex, radius: number) → Hex[]
```

---

### `src/hex/hexMap.js`

```js
class HexMap(svgElement: SVGElement)
```

| Méthode | Description |
|---------|-------------|
| `build(radius, orientation)` | Construit et rend la grille SVG |
| `setTube(hexKey, nanotube)` | Place un tube (re-rendu auto) |
| `removeTube(hexKey)` | Retire un tube |
| `selectHex(key)` | Sélectionne programmatiquement |
| `onSelect(cb)` | Callback `(hexKey: string) => void` |
| `onAddTube(cb)` | Callback sur double-clic |
| `getStats()` | `{ total, byType, hexCount }` |
| `clear()` | Vide la carte |

---

### `src/nanotube/nanotube.js`

```js
class Nanotube({ m, n, length, rotation, color, hexKey })
```

| Propriété | Type | Description |
|-----------|------|-------------|
| `diameter` | `number` (nm) | `(a₀/π)√(m²+mn+n²)` |
| `chiralAngle` | `number` (°) | Angle chiral en degrés |
| `type` | `'armchair'│'zigzag'│'chiral'` | Classification |
| `conductivity` | `'Métallique'│'Semi-conducteur'` | Propriété électronique |
| `isMetallic` | `boolean` | Raccourci |
| `bandGap` | `number` (eV) | 0 si métallique, `0.9/d` sinon |
| `atomCount` | `number` | Estimation du nombre d'atomes C |

```js
// Méthodes
nanotube.toJSON()                // → objet sérialisable
Nanotube.fromJSON(data)          // Désérialisation
nanotube.toOmeka(itemSetId)      // Format Item Omeka S
Nanotube.fromOmeka(item)         // Depuis un Item Omeka S
nanotube.clone()                 // Copie profonde

// Utilitaire
randomNanotube(hexKey)           // Nanotube aléatoire parmi les types courants
```

---

### `src/nanotube/geometry.js`

```js
buildNanotubeGroup(nanotube: Nanotube) → THREE.Group
```

Le groupe contient :
- **Tube principal** — `CylinderGeometry` avec `MeshPhysicalMaterial` (metalness selon conductivité)
- **Réseau carbone** — `LineSegments` approximant le lattice hexagonal enroulé
- **Capuchons** — `SphereGeometry` aux deux extrémités
- **Glow** — cylindre légèrement plus grand, `BackSide`, très transparent

```js
buildHexBase(corners: Point[], color) → THREE.Mesh    // Plan hexagonal
buildHexOutline(corners: Point[], color) → THREE.Line  // Contour filaire
NM_SCALE = 2.5  // Facteur nm → unités scène
```

---

### `src/scene/scene3d.js`

```js
class Scene3D(canvas: HTMLCanvasElement)
```

| Méthode | Description |
|---------|-------------|
| `buildGrid(hexes, orientation)` | Construit la grille 3D |
| `setTube(hexKey, nanotube)` | Place/remplace un tube (dispose l'ancien) |
| `removeTube(hexKey)` | Retire et libère les ressources GPU |
| `updateTube(hexKey, nanotube)` | Alias de `setTube` |
| `highlightTube(hexKey)` | Surbrillance par `emissive` |
| `toggleGrid(show?)` | Affiche/masque grille et contours |
| `resetCamera()` | Position par défaut `(80, 120, 160)` |
| `screenshot()` | `data:image/png` |
| `onSelect(cb)` | Callback clic sur tube 3D |
| `dispose()` | Nettoyage complet (ResizeObserver, renderer) |

**Paramètres de scène :**
```js
renderer.toneMapping = ACESFilmicToneMapping  // Rendu cinématique
renderer.toneMappingExposure = 1.2
scene.fog = Fog(0x0a0e17, 400, 900)           // Brouillard ambiant
camera = PerspectiveCamera(45°, aspect, 0.1, 2000)
```

---

### `src/charts/charts.js`

```js
class NanoCharts(distContainer: HTMLElement, propsContainer: HTMLElement)
```

| Méthode | Description |
|---------|-------------|
| `updateDistribution(tubes)` | Barres verticales : nombre par type |
| `updateProperties(tubes)` | Barres horizontales : diamètres (nm) |
| `update(tubesMap: Map)` | Met à jour les deux graphiques |

Les couleurs utilisées :
```js
armchair → '#22d3ee'  // cyan
zigzag   → '#facc15'  // jaune
chiral   → '#818cf8'  // violet
```

---

### `src/api/omeka.js`

```js
class OmekaClient({ url, keyId, keyCred, itemSetId })
```

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `configure(cfg)` | `(config) → void` | Mise à jour dynamique |
| `ping()` | `() → Promise<boolean>` | Test connexion |
| `listMaps()` | `() → Promise<{id,title,modified}[]>` | Liste les cartes |
| `getMap(id)` | `(number) → Promise<MapData>` | Charge une carte |
| `saveMap(data)` | `(MapData) → Promise<Item>` | Crée ou met à jour |
| `deleteMap(id)` | `(number) → Promise<void>` | Supprime |

```js
// Helpers localStorage
loadOmekaConfig() → object
saveOmekaConfig(cfg: object) → void
```

---

### `src/agents/agents.js`

```js
streamAgentResponse(
  apiKey: string,
  userMessage: string,
  onDelta: (chunk: string) => void,
  onTool: (name: string, input: object, result: object) => void
) → Promise<void>
```

```js
// Exports utilitaires
TOOLS        // Tableau des définitions de tools (Anthropic format)
executeTool(name: string, input: object) → object  // Exécuteur local
```

---

## 10. Glossaire

| Terme | Définition |
|-------|------------|
| **Armchair** | Nanotube avec `m = n`. Vecteur chiral à 30° — toujours métallique |
| **Band gap (Eg)** | Énergie séparant bande de valence et bande de conduction. `Eg = 0` pour les métaux |
| **Chiralité (m,n)** | Paire d'entiers définissant l'enroulement du graphène. Détermine toutes les propriétés |
| **Coordonnées cube** | Système `(q,r,s)` avec `q+r+s=0` pour grilles hexagonales. Optimal pour les algorithmes |
| **Dublin Core** | Vocabulaire de métadonnées standard utilisé par Omeka S pour décrire les ressources |
| **FractionalHex** | Version décimale des coordonnées cube, utilisée pour l'interpolation et l'arrondi |
| **Graphène** | Feuille monoatomique de carbone en réseau hexagonal. Base structurelle des CNT |
| **Layout** | Transformation mathématique hex → pixels (taille, orientation, origine) |
| **MWNT** | *Multi-Walled NanoTube* — nanotube multi-parois, couches concentriques (espacement 0.34 nm) |
| **Omeka S** | CMS de collections web open-source avec API REST. Stockage des cartographies |
| **OrbitControls** | Contrôle caméra Three.js (rotation orbitale, zoom, panoramique) |
| **PBR** | *Physically Based Rendering* — rendu physiquement réaliste (metalness, roughness) |
| **Semi-conducteur** | Matériau à band gap positif. Conductivité contrôlable par dopage ou température |
| **SWNT** | *Single-Walled NanoTube* — nanotube à paroi unique. Diamètre typique 0.44–6 nm |
| **Tight-binding** | Modèle quantique approximatif pour calculer la structure de bande des CNT |
| **Tool Use** | Mécanisme Anthropic API permettant à Claude d'appeler des fonctions côté client |
| **Vecteur chiral** | `C = m·a₁ + n·a₂` sur la feuille de graphène. Sa norme = circonférence du tube |
| **WebGL** | API JavaScript pour rendu 3D GPU-accéléré dans le navigateur. Utilisé par Three.js |
| **Zigzag** | Nanotube avec `n = 0`. Vecteur chiral à 0° — semi-conducteur sauf si `m mod 3 = 0` |

---

## Annexe A — Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Double-clic` hex | Ajoute un nanotube aléatoire |
| `Clic` hex / tube 3D | Sélectionne |
| `Scroll` | Zoom (grille SVG ou scène 3D) |
| `Entrée` dans l'agent | Envoie le message |
| `⌖` | Réinitialise la caméra 3D |

## Annexe B — Extension et contribution

### Ajouter un nouveau type de tool agent

```js
// src/agents/agents.js — section TOOLS
{
  name: 'mon_nouveau_tool',
  description: 'Description pour le modèle',
  input_schema: {
    type: 'object',
    properties: {
      param1: { type: 'string', description: '…' },
    },
    required: ['param1'],
  },
}

// Section executeTool — ajouter le cas
case 'mon_nouveau_tool': {
  const { param1 } = input;
  return { result: `traitement de ${param1}` };
}
```

### Ajouter une propriété physique au modèle CNT

```js
// src/nanotube/nanotube.js
get maNouvellePropriete() {
  // Calcul basé sur this.m, this.n, this.diameter, etc.
  return ...;
}
```

### Connecter un backend alternatif

Implémenter l'interface de `OmekaClient` avec les méthodes `ping`, `listMaps`, `getMap`, `saveMap`, `deleteMap`.

---

*Documentation générée pour NanoTubeStory v1.0 — Licence MIT*
