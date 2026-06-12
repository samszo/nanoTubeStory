# ⬡ NanoTubeStory — Documentation technique

> Application web mono-page pour créer, visualiser et analyser des **cartographies 3D de nanotubes de carbone** sur grilles hexagonales, avec import/export JSON et persistance Omeka S.

| | |
|---|---|
| **Version** | 1.2.0 |
| **Date** | 2026-06-12 |
| **Stack** | Three.js · D3.js · Omeka S · Vite |
| **Licence** | MIT |
| **Diagrammes** | [📐 DIAGRAMS.md](./DIAGRAMS.md) |

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Physique des nanotubes de carbone](#2-physique-des-nanotubes-de-carbone)
   - 2.1 [Le graphène — feuille mère](#21-le-graphène--feuille-mère)
   - 2.2 [Le vecteur chiral — définition de l'enroulement](#22-le-vecteur-chiral--définition-de-lenroulement)
   - 2.3 [Trois familles de nanotubes](#23-trois-familles-de-nanotubes)
   - 2.4 [Formules physiques implémentées](#24-formules-physiques-implémentées)
   - 2.5 [Structure électronique et conductivité](#25-structure-électronique-et-conductivité)
   - 2.6 [Réseau honeycomb sur le cylindre](#26-réseau-honeycomb-sur-le-cylindre)
3. [Cartographie hexagonale](#3-cartographie-hexagonale)
4. [Architecture technique](#4-architecture-technique)
5. [Installation et configuration](#5-installation-et-configuration)
6. [Guide utilisateur](#6-guide-utilisateur)
7. [Import / Export JSON](#7-import--export-json)
8. [Hexagones interactifs sur le tube](#8-hexagones-interactifs-sur-le-tube)
9. [API Omeka S](#9-api-omeka-s)
10. [Référence des modules](#10-référence-des-modules)
11. [Glossaire](#11-glossaire)

---

## 1. Introduction

**NanoTubeStory** est une application web interactive permettant de créer, visualiser et analyser des cartographies tridimensionnelles de nanotubes de carbone disposés sur des grilles hexagonales. Elle combine une visualisation scientifique avancée (réseau honeycomb graphène exact projeté sur cylindre) avec un système de nanotubes enfants récursifs, un import/export JSON et une persistance via Omeka S.

### 1.1 Objectifs

- **Visualisation 3D** — Rendu interactif de nanotubes avec réseau hexagonal graphène exact (liaisons C-C projetées sur cylindre), capuchons et effets lumineux
- **Cartographie spatiale** — Placement et organisation de nanotubes sur grilles hexagonales paramétrables
- **Hexagones interactifs** — Chaque hexagone du tube est cliquable pour définir ses propriétés (via template Omeka S) et générer des nanotubes enfants
- **Nanotubes enfants** — Spawn récursif de nanotubes perpendiculaires à la face hexagonale cliquée, avec diamètre = cercle inscrit de l'hexagone
- **Analyse physique** — Calcul automatique du diamètre, conductivité et band gap selon la chiralité `(m,n)`
- **Import/Export JSON** — Sérialisation complète des cartes (tubes parents + enfants + métadonnées)
- **Persistance** — Sauvegarde des cartographies et des propriétés d'hexagones via l'API REST Omeka S

### 1.2 Stack technologique

| Module | Technologie | Rôle |
|--------|-------------|------|
| Rendu 3D | Three.js v0.177 | Scène WebGL, géométrie CNT, éclairage PBR |
| Grille hex | D3.js v7 + Red Blob Games | SVG, coordonnées cube, interactions |
| Graphiques | D3.js v7 | Distribution types, comparaison diamètres |
| Persistance | Omeka S REST API | CRUD cartographies, Items, Resource Templates |
| Build | Vite v6 | ESM, HMR, proxy CORS, bundling production |

---

## 2. Physique des nanotubes de carbone

### 2.1 Le graphène — feuille mère

Un **nanotube de carbone à paroi simple (SWNT)** est obtenu en enroulant une feuille de **graphène** — réseau bidimensionnel d'atomes de carbone organisés en hexagones réguliers — en cylindre parfait.

```
Graphène — réseau honeycomb (vue de dessus) :

      A       A       A
    /   \   /   \   /   \
  B       B       B       B
    \   /   \   /   \   /
      A       A       A
    /   \   /   \   /
  B       B       B

  ● Atomes de sous-réseau A  (sous-réseau 1)
  ○ Atomes de sous-réseau B  (sous-réseau 2)
  — Liaisons C-C, longueur a_cc = 0.142 nm
```

Le graphène possède deux types d'atomes par maille élémentaire (sous-réseaux A et B) reliés par des liaisons covalentes sp² de longueur **a_cc = 0,142 nm**. La constante de réseau (distance entre deux atomes du même sous-réseau) vaut :

$$a_0 = \sqrt{3} \cdot a_{cc} = 0{,}246 \text{ nm}$$

Les **vecteurs de base** du réseau de Bravais s'écrivent :

$$\vec{a_1} = a_0 \left(\frac{\sqrt{3}}{2},\; \frac{1}{2}\right), \qquad \vec{a_2} = a_0 \left(\frac{\sqrt{3}}{2},\; -\frac{1}{2}\right)$$

---

### 2.2 Le vecteur chiral — définition de l'enroulement

Pour former un nanotube, on choisit deux atomes équivalents A et A' sur la feuille de graphène et on les **rabat l'un sur l'autre** en roulant la feuille. La direction et la distance de cet enroulement sont définies par le **vecteur chiral** :

$$\boxed{\vec{C_h} = m \cdot \vec{a_1} + n \cdot \vec{a_2}}$$

où **`(m, n)`** sont les **indices de chiralité**, deux entiers non négatifs avec `m ≥ n ≥ 0` par convention.

```
Feuille de graphène déroulée — construction du vecteur chiral (m=4, n=2) :

       T (vecteur de translation)
    ↑  ·  ·  ·  ·  ·  ·  ·  ·  ·
    |  ·  ·  ·  ·  A'·  ·  ·  ·
    |  ·  ·  ·  · ↗·  ·  ·  ·  ·
    |  ·  · ↗·  ·  ·  ·  ·  ·  ·
    |  · ↗·  ·  ·  ·  ·  ·  ·  ·
    |  A ──────────────→ ·  ·  ·
    └──────────────────────────→
                             Ch →

  O = A = origine
  Ch = C_h = 4·a1 + 2·a2  →  la feuille est enroulée
       en rabattant A sur A'
  T = vecteur de translation (axe du tube)
  Le rectangle O-A'-A''-T définit la maille du tube
```

La **circonférence** du nanotube est la norme de `Ch` :

$$|\vec{C_h}| = a_0\,\sqrt{m^2 + mn + n^2}$$

Le **diamètre** est donc :

$$d = \frac{|\vec{C_h}|}{\pi} = \frac{a_0}{\pi}\,\sqrt{m^2 + mn + n^2}$$

L'**angle chiral** θ mesure l'inclinaison de `Ch` par rapport à la direction zigzag :

$$\theta = \arctan\!\left(\frac{\sqrt{3}\,n}{2m + n}\right), \quad \theta \in [0°,\; 30°]$$

---

### 2.3 Trois familles de nanotubes

La valeur des indices `(m, n)` détermine la **géométrie atomique** de la surface du tube, qui se répartit en trois familles :

#### Armchair (chaise) — `m = n`

```
Vue de côté (tube déroulé) :    Vue de l'extrémité :

  ⌐¬  ⌐¬  ⌐¬                        ___
 /  \/  \/  \                       /   \
|    |   |   |                     |  ●  |
 \  /\  /\  /                       \___/
  ¬⌐  ¬⌐  ¬⌐

Liaisons perpendiculaires à l'axe du tube ("bras de fauteuil")
Angle chiral θ = 30°
```

- Condition : `m = n` (ex. : (5,5), (10,10))
- Angle chiral : **θ = 30°**
- Les liaisons C-C perpendiculaires à l'axe du tube forment des marches de « fauteuil »
- **Toujours métalliques** — conducteurs parfaits

#### Zigzag — `n = 0`

```
Vue de côté :

  /\  /\  /\
 /  \/  \/  \
|            |
 \  /\  /\  /
  \/  \/  \/

Liaisons parallèles à l'axe → motif en dents de scie
Angle chiral θ = 0°
```

- Condition : `n = 0` (ex. : (7,0), (9,0))
- Angle chiral : **θ = 0°**
- Une rangée de liaisons est parallèle à l'axe du tube
- Semi-conducteur en général, **métallique si `m` est multiple de 3**

#### Chiral — cas général

```
Vue de côté :

  · / · / · /
 / · / · / ·
· / · / · /
 / · / · /

Liaisons inclinées → hélice atomique
Angle chiral 0° < θ < 30°
```

- Condition : `m ≠ n` et `n ≠ 0` (ex. : (6,2), (8,3))
- Angle chiral : **0° < θ < 30°**
- Le réseau forme une hélice autour de l'axe
- **Métallique si `(m − n) mod 3 = 0`**, semi-conducteur sinon

#### Tableau récapitulatif

| Type | Condition | θ | Conductivité | Exemples dans l'app |
|------|-----------|:-:|---|---|
| **Armchair** | `m = n` | 30° | Toujours métallique | (5,5) · (10,10) |
| **Zigzag** | `n = 0` | 0° | Métallique si `m mod 3 = 0`, sinon SC | (7,0) · (9,0) |
| **Chiral** | `m ≠ n, n ≠ 0` | 0°–30° | Métallique si `(m−n) mod 3 = 0` | (6,2) · (8,3) |

> **Statistiquement**, 1/3 des nanotubes chiraux sont métalliques et 2/3 sont semi-conducteurs.

---

### 2.4 Formules physiques implémentées

Toutes ces formules sont calculées en temps réel dans `src/nanotube/nanotube.js`.

#### Diamètre (nm)

$$d = \frac{a_0}{\pi}\,\sqrt{m^2 + mn + n^2} \qquad (a_0 = 0{,}246 \text{ nm})$$

| (m, n) | Type | d (nm) |
|--------|------|--------|
| (5, 5) | Armchair | 0,678 |
| (7, 0) | Zigzag | 0,548 |
| (6, 2) | Chiral | 0,561 |
| (10,10)| Armchair | 1,356 |

#### Vecteur chiral (longueur en nm)

$$|\vec{C_h}| = a_0\,\sqrt{m^2 + mn + n^2} = \pi \cdot d$$

#### Angle chiral (degrés)

$$\theta = \arctan\!\left(\frac{\sqrt{3}\,n}{2m + n}\right)$$

#### Nombre d'atomes de carbone (estimation)

$$N_{atomes} \approx \pi \cdot d \cdot L \cdot \rho_{graphène}$$

avec `L` la longueur du tube en nm et `ρ_graphène ≈ 38,2 atomes/nm²`.

---

### 2.5 Structure électronique et conductivité

La conductivité électrique d'un nanotube résulte du **repliement de zone** (*zone folding*) : la structure de bande du graphène 2D est découpée selon les conditions aux limites périodiques imposées par l'enroulement.

#### Règle de conductivité

Les bandes de valence et de conduction du graphène se croisent aux **points K** de la zone de Brillouin. Le nanotube est :

- **Métallique** si les lignes de coupe quantifiées passent par un point K
- **Semi-conducteur** sinon (les lignes de coupe ratent tous les points K)

La condition pour passer par K se ramène à :

$$\text{Métallique} \iff (m - n) \bmod 3 = 0$$

> Les armchair `(n,n)` vérifient toujours `m − n = 0`, donc `0 mod 3 = 0` → toujours métalliques.

#### Band gap des semi-conducteurs

Pour un nanotube semi-conducteur, le band gap est approximé par le modèle *tight-binding* :

$$E_g \approx \frac{2\,\gamma_0\,a_{cc}}{d} \approx \frac{0{,}9}{d}\text{ eV}$$

avec `γ₀ ≈ 3 eV` le paramètre de saut (*hopping integral*) du graphène.

**Conséquence pratique** : plus le diamètre est grand, plus le band gap est faible.

| d (nm) | Eg (eV) | Domaine |
|--------|---------|---------|
| 0,4 | 2,25 | Proche visible |
| 0,7 | 1,29 | Infrarouge proche |
| 1,0 | 0,90 | Télécom |
| 1,4 | 0,64 | Infrarouge moyen |

#### Couleur de visualisation dans l'app

| Type | Couleur par défaut | Justification |
|------|--------------------|---------------|
| Armchair (métallique) | `#22d3ee` (cyan) | Conducteur — évoque un métal |
| Zigzag | `#facc15` (jaune) | Semi-conducteur dominante |
| Chiral | `#818cf8` (violet) | Propriétés mixtes |

---

### 2.6 Réseau honeycomb sur le cylindre

Le réseau carbone affiché sur chaque tube en 3D est le **vrai lattice honeycomb du graphène** projeté sur la surface cylindrique, pas une approximation.

#### Paramètres de construction (`geometry.js`)

```
Nombre d'hexagones autour de la circonférence :
  nHex = max(6, m + n)

Longueur de liaison C-C en unités scène :
  d_liaison = 2π × radius / (nHex × √3)

Vecteurs de réseau (orientation zigzag) :
  a1x = √3 × d_liaison       (vecteur a₁ — horizontal)
  a2x = a1x / 2              (composante x de a₂)
  a2y = 1.5 × d_liaison      (composante y de a₂)

Position de l'atome A en (i, j) :
  x = i × a1x + j × a2x     (progression linéaire dans les deux directions)
  y = j × a2y

Projection cylindrique :
  θ = x / radius             (abscisse curviligne → angle)
  X_3D = radius × cos(θ)
  Y_3D = y
  Z_3D = radius × sin(θ)
```

#### Alignement des hexagones cliquables

Les faces hexagonales cliquables (`buildTubeHexFaces`) sont centrées sur le même lattice. Le centre d'un hexagone `(i, j)` est :

```
cx = i × a1x + j × (a1x / 2)    ← progression cumulative (pas alternée)
cy = j × a2y − d_liaison         ← décalage pour aligner rv[3] sur l'atome A
```

> Le sommet supérieur de chaque hexagone (`rv[3] = (0, +d)` en coordonnées locales) coïncide exactement avec l'atome A de position `(i, j)` du lattice.

---

## 3. Cartographie hexagonale

L'application utilise l'implémentation de référence de **Red Blob Games** basée sur les **coordonnées cube** `(q, r, s)` avec `q + r + s = 0`.

### 3.1 Algorithmes implémentés

| Fonction | Description |
|----------|-------------|
| `hexSpiral(center, radius)` | Génère `3r²+3r+1` cellules en spirale concentrique |
| `hexRing(center, radius)` | Cellules d'un anneau à distance exacte `r` |
| `Layout.hexToPixel(hex)` | Coordonnées cube → pixels SVG |
| `Layout.pixelToHex(point)` | Pixels → hexagone avec arrondi `FractionalHex` |
| `Hex.distance(other)` | `(|dq| + |dr| + |ds|) / 2` |
| `Hex.neighbors()` | Les 6 voisins directs |

### 3.2 Orientations supportées

Les deux orientations **Pointy-top** et **Flat-top** sont paramétrables via le sélecteur dans le panneau gauche.

---

## 4. Architecture technique

### 4.1 Structure des fichiers

```
nanoTubeStory/
├── index.html                  # SPA — structure UI
├── vite.config.js              # Proxy CORS Omeka S
├── package.json
├── .env                        # Variables d'environnement
├── public/
│   └── example-map.json        # Carte d'exemple (import JSON)
└── src/
    ├── main.js                 # Point d'entrée
    ├── app.js                  # Contrôleur principal
    ├── style.css               # Design system dark mode
    ├── hex/
    │   ├── hex.js              # Coordonnées cube (Red Blob Games)
    │   └── hexMap.js           # Rendu SVG D3.js
    ├── nanotube/
    │   ├── nanotube.js         # Modèle physique CNT
    │   └── geometry.js         # Géométrie Three.js + faces cliquables
    ├── scene/
    │   └── scene3d.js          # Scène Three.js + raycaster étendu
    ├── charts/
    │   └── charts.js           # Graphiques D3.js
    └── api/
        └── omeka.js            # Client REST Omeka S + Resource Templates
```

### 4.2 State de l'application (`App`)

| Propriété | Type | Description |
|-----------|------|-------------|
| `tubes` | `Map<hexKey, Nanotube>` | Tubes parents sur la grille hexagonale |
| `horizTubes` | `Map<faceKey, THREE.Group>` | Groupes Three.js des tubes enfants |
| `horizTubesData` | `Map<faceKey, {tube, center, normal, centerMode, hexKey, hexFaceIdx}>` | Modèle + positionnement des tubes enfants |
| `hexFaceData` | `Map<faceKey, object>` | Propriétés Omeka S des hexagones |
| `_activeHexFace` | `object` | Hexagone courant : `{hexKey, hexFaceIdx, hexFacePos, worldPos, hexCenterWorld, hexNormalWorld, …}` |

La clé `faceKey` a la forme `"hexKey:hexFaceIdx"` (ex. `"0,0,0:42"`), permettant l'imbrication récursive de tubes.

### 4.3 Pattern architectural

L'application suit un pattern **contrôleur central** (`app.js`) qui instancie tous les modules, reçoit les événements des vues et coordonne les mises à jour croisées.

---

## 5. Installation et configuration

### 5.1 Prérequis

- **Node.js** ≥ 18.0.0 + npm ≥ 9
- Navigateur moderne avec support **WebGL 2**
- *(Optionnel)* Instance **Omeka S** ≥ 3.0

### 5.2 Installation

```bash
git clone https://github.com/votre-org/nanotube-story.git
cd nanotube-story
npm install
cp .env.example .env
npm run dev   # → http://localhost:3000
```

### 5.3 Variables d'environnement

```env
VITE_OMEKA_URL=/omk_tubestory          # Chemin relatif → proxy Vite (évite le CORS)
VITE_OMEKA_KEY_IDENTITY=aBcDeFgH
VITE_OMEKA_KEY_CREDENTIAL=xYz12345
VITE_OMEKA_ITEM_SET_ID=1
```

Le proxy Vite (`vite.config.js`) redirige `/omk_tubestory` vers `http://localhost`, évitant les erreurs CORS entre le port 3000 et le port 80.

---

## 6. Guide utilisateur

### 6.1 Interface principale

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ⬡ NanoTubeStory  [+Carte][💾Sauver][📂Charger][⬇Exporter] [3D][Hex][⊞]        │
│                  [📥Importer][📤JSON][📋Exemple]              ● Omeka S  [⚙]   │
├──────────────┬──────────────────────────────────────┬────────────────────────────┤
│ CARTOGRAPHIE │                                      │ PROPRIÉTÉS                 │
│              │                                      │ Chiralité (m, n)           │
│  Grille SVG  │    Scène 3D (Three.js)               │ Type    Diamètre           │
│  hexagonale  │    nanotubes avec réseau              │ Conduct. Band gap          │
│  D3.js       │    honeycomb graphène                 │                            │
│              │                                      │ ANALYSE                    │
│ GRILLE       │                               [⌖]    │ ▦ Distribution types       │
│ Rayon: 5     │                               [⊞]    │ ▦ Diamètres                │
│ Orientation  │                               [A]    │                            │
│              │                               [📷]   │ OMEKA S                    │
│              │                                      │ ID · Titre · Liste         │
├──────────────┴──────────────────────────────────────┴────────────────────────────┤
│ 📋 Trace                                                              [Prêt ▲]   │
│ > ✅ Importé "Exemple CNT" — 7 tubes parents, 3 tubes enfants                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Viewport 3D — interactions

| Contrôle | Action |
|----------|--------|
| **Clic + glisser** | Rotation orbitale |
| **Molette** | Zoom |
| **Clic sur un hexagone du tube** | Ouvre le panel "Hexagone du nanotube" |
| **Clic sur la grille** | Sélectionne la cellule hexagonale |
| **⌖** | Réinitialise la caméra |
| **📷** | Capture la scène en PNG |

### 6.3 Éditeur de nanotube (panneau droit)

Les propriétés physiques (diamètre, conductivité, band gap) se recalculent automatiquement dès que vous modifiez `m` ou `n`.

### 6.4 Workflow typique

```
1. Choisir un rayon de grille (ex. 5)
2. Double-cliquer sur des cellules pour placer des nanotubes
3. Sélectionner un tube → modifier (m,n) → [Appliquer]
4. Cliquer sur un hexagone du tube → panel slide-over
   a. Choisir un resource template Omeka S → remplir les champs → [Sauver]
   b. Ou cliquer [⬡ Créer nanotube] → génère un tube enfant perpendiculaire
5. Cliquer un hexagone du tube enfant → même panel → tube petit-enfant (récursif)
6. Saisir un titre → [💾 Sauver] (Omeka S)  ou  [📤 JSON] (export fichier)
```

---

## 7. Import / Export JSON

### 7.1 Format du fichier

Chaque carte est exportée en JSON v1.1, structuré en quatre sections :

```json
{
  "version": "1.1",
  "title": "Ma Carte NanoTube",
  "exportedAt": "2026-06-12T12:00:00.000Z",
  "gridRadius": 5,
  "orientation": "pointy",

  "parentTubes": [
    {
      "hexKey": "0,0,0",
      "m": 5, "n": 5,
      "length": 25,
      "rotation": 0,
      "color": "#22d3ee",
      "label": "Tube central armchair",
      "omekaId": null
    }
  ],

  "childTubes": [
    {
      "faceKey": "0,0,0:2",
      "hexKey": "0,0,0",
      "hexFaceIdx": 2,
      "centerMode": "centroid",
      "center": { "x": 3.8, "y": 31.25, "z": -2.2 },
      "normal": { "x": 0.866, "y": 0.0, "z": -0.5 },
      "tube": {
        "m": 3, "n": 3,
        "length": 12,
        "rotation": 0,
        "color": "#f87171",
        "label": "Nanotube enfant armchair",
        "hexKey": null,
        "omekaId": null
      }
    }
  ],

  "hexFaceData": [
    {
      "faceKey": "0,0,0:2",
      "templateId": null,
      "omekaId": null,
      "hexKey": "0,0,0",
      "hexFaceIdx": 2,
      "hexFacePos": { "i": 1, "j": 0 },
      "properties": [
        { "term": "dcterms:title",       "value": "Jonction A" },
        { "term": "dcterms:description", "value": "Point de branchement" }
      ]
    }
  ]
}
```

### 7.2 Description des champs

#### Racine

| Champ | Type | Description |
|-------|------|-------------|
| `version` | `string` | Version du format (`"1.1"`) |
| `title` | `string` | Nom de la carte |
| `exportedAt` | `ISO 8601` | Date d'export |
| `gridRadius` | `number` | Rayon de la grille hexagonale |
| `orientation` | `"pointy"` \| `"flat"` | Orientation des hexagones |

#### `parentTubes[]` — tubes sur la grille

| Champ | Type | Description |
|-------|------|-------------|
| `hexKey` | `"q,r,s"` | Coordonnées cube de la cellule |
| `m`, `n` | `number` | Indices de chiralité |
| `length` | `number` | Longueur en nm |
| `rotation` | `number` | Rotation axiale en degrés |
| `color` | `#rrggbb` | Couleur d'affichage |
| `label` | `string` | Étiquette libre |
| `omekaId` | `number \| null` | ID Omeka S si sauvegardé |

#### `childTubes[]` — tubes enfants

Hérite des champs de `parentTubes` encapsulés dans `tube`, plus :

| Champ | Type | Description |
|-------|------|-------------|
| `faceKey` | `"hexKey:idx"` | Identifiant de la face parente |
| `hexKey` | `string` | Tube parent porteur de la face |
| `hexFaceIdx` | `number` | Index de la face hexagonale |
| `centerMode` | `"junction"` \| `"centroid"` \| `"loop"` | Mode de centrage |
| `center` | `{x,y,z}` | Position dans l'espace 3D (unités scène) |
| `normal` | `{x,y,z}` | Vecteur normal sortant (normalisé) |

#### `hexFaceData[]` — métadonnées Omeka S

| Champ | Type | Description |
|-------|------|-------------|
| `faceKey` | `string` | Clé composite `"hexKey:idx"` |
| `templateId` | `number \| null` | ID du resource template Omeka S |
| `omekaId` | `number \| null` | ID de l'Item Omeka S |
| `properties` | `{term, value}[]` | Propriétés Dublin Core saisies |

### 7.3 Boutons dans la toolbar

| Bouton | Action |
|--------|--------|
| **📥 Importer** | Ouvre un sélecteur de fichier `.json` et charge la carte |
| **📤 JSON** | Exporte la carte courante et déclenche le téléchargement |
| **📋 Exemple** | Charge `public/example-map.json` (carte de démonstration) |

Les résultats (succès, erreurs) apparaissent dans le panneau **📋 Trace** en bas de l'écran.

---

## 8. Hexagones interactifs sur le tube

### 8.1 Principe

Chaque nanotube affiché en 3D possède, en plus de son maillage visuel (liaisons C-C), un ensemble de **faces hexagonales invisibles** (`opacity: 0`) utilisées comme cibles du raycaster Three.js. Un clic sur un hexagone déclenche :

1. Le calcul du **centre exact** de l'hexagone en coordonnées monde (via `localToWorld`)
2. Le calcul de la **normale sortante** (direction radiale `(cos θ, 0, sin θ)` en espace local, transformée par `matrixWorld`)
3. L'ouverture du **panel "Hexagone du nanotube"**

### 8.2 Géométrie des faces cliquables (`buildTubeHexFaces`)

```
Pour chaque anneau hexagonal (i, j) du lattice :
  Centre : cx = i·a1x + j·(a1x/2)   ← progression cumulative en j
           cy = j·a2y − d_liaison    ← alignement sur l'atome A du lattice
  6 sommets projetés sur le cylindre (triangulation en éventail)

  userData.isHexFace  = true
  userData.hexFaceIdx = index unique
  userData.hexFacePos = { i, j, cx, cy }
  userData.tubeHexKey = hexKey du tube parent
```

### 8.3 Panel "Hexagone du nanotube"

#### Section Template Omeka S

| Champ | Description |
|-------|-------------|
| **Resource template** | Liste des templates récupérés via `/api/resource_templates` |
| **Champs dynamiques** | Propriétés du template sélectionné, pré-remplies si déjà saisies |
| **[Sauver dans Omeka S]** | Crée ou met à jour un Item Omeka S |

#### Section Nanotube enfant

| Champ | Description |
|-------|-------------|
| **⌀ inscrit** | Diamètre du cercle inscrit de l'hexagone (calculé automatiquement) |
| **Chiralité (m, n)** | Pré-rempli avec l'armchair le plus proche du diamètre inscrit |
| **Longueur (nm)** | Longueur du tube enfant |
| **Couleur** | Couleur du tube enfant |
| **Centrage** | `junction` · `centroid` · `loop` |
| **[⬡ Créer nanotube]** | Génère le tube enfant |

### 8.4 Calcul du tube enfant

#### Diamètre = cercle inscrit de l'hexagone

Pour trouver les indices armchair `(n,n)` les plus proches du cercle inscrit :

$$n = \text{round}\!\left(\frac{\pi \cdot d_{enfant}}{a_0 \cdot \sqrt{3}}\right)$$

**Exemple** : tube parent (9,0), `d = 0.705 nm` → `d_enfant ≈ 0.246 nm` → armchair **(2,2)**

#### Position et orientation

```
hexCenterWorld = localCenter.applyMatrix4(tubeGroup.matrixWorld)
hexNormalWorld = Vec3(cos θ, 0, sin θ).transformDirection(tubeGroup.matrixWorld)

group.quaternion = setFromUnitVectors(Y, hexNormalWorld)
group.position   = hexCenterWorld + hexNormalWorld × (length/2)
                   ─────────────────────────────────────────────
                   → base du tube à la surface de l'hexagone
                   → tube s'étend perpendiculairement vers l'extérieur
```

### 8.5 Récursivité

Les hexagones du tube enfant sont **eux-mêmes cliquables** selon le même mécanisme. La clé `faceKey = "hexKey:hexFaceIdx"` permet :
- De retrouver le modèle dans `horizTubesData`
- De calculer les indices chiraux du niveau suivant
- De s'imbriquer récursivement sans limite de profondeur

---

## 9. API Omeka S

[Omeka S](https://omeka.org/s/) est utilisé comme backend de persistance via son **API REST**.

### 9.1 Configuration CORS

En développement, le proxy Vite évite les erreurs CORS :

```js
// vite.config.js
proxy: {
  '/omk_tubestory': {
    target: 'http://localhost',
    changeOrigin: true,
  }
}
```

La variable `VITE_OMEKA_URL` doit être un **chemin relatif** (`/omk_tubestory`) et non une URL absolue.

### 9.2 Endpoints utilisés

| Méthode | Endpoint | Action |
|---------|----------|--------|
| `GET` | `/api/items` | Test de connexion |
| `GET` | `/api/items?item_set_id=N` | Lister les cartographies |
| `GET` | `/api/items/{id}` | Charger une cartographie |
| `POST` | `/api/items` | Créer |
| `PATCH` | `/api/items/{id}` | Mettre à jour |
| `DELETE` | `/api/items/{id}` | Supprimer |
| `GET` | `/api/resource_templates` | Lister les templates |
| `GET` | `/api/resource_templates/{id}` | Template + propriétés |

### 9.3 Format d'un hexagone sauvegardé

```json
{
  "@type": ["o:Item"],
  "o:item_set": [{ "o:id": 1 }],
  "dcterms:title":       [{ "@value": "Hex 0,0,0 [2,4]", "type": "literal" }],
  "dcterms:description": [{ "@value": "{\"hexKey\":\"0,0,0\",...}", "type": "literal" }],
  "dcterms:subject":     [{ "@value": "nanotube:hex", "type": "literal" }],
  "<terme_template>":    [{ "@value": "valeur", "type": "literal" }]
}
```

---

## 10. Référence des modules

### `src/nanotube/nanotube.js`

```js
class Nanotube({ m, n, length, rotation, color, label, hexKey })
```

| Propriété calculée | Formule | Unité |
|--------------------|---------|-------|
| `diameter` | `(a₀/π) × √(m²+mn+n²)` | nm |
| `chiralVector` | `a₀ × √(m²+mn+n²)` | nm |
| `chiralAngle` | `atan2(√3·n, 2m+n)` | ° |
| `type` | `armchair` \| `zigzag` \| `chiral` | — |
| `conductivity` | `Métallique` \| `Semi-conducteur` | — |
| `isMetallic` | `(m-n) mod 3 = 0` | bool |
| `bandGap` | `0.9 / d` | eV |
| `atomCount` | `π·d·L·38.2` | entier |

```js
Nanotube.fromJSON(data)   // désérialisation
nanotube.toJSON()         // sérialisation
nanotube.toOmeka(itemSetId) // format Omeka S
```

---

### `src/nanotube/geometry.js`

```js
buildNanotubeGroup(nanotube: Nanotube) → THREE.Group
```

Le groupe contient :
- **Tube principal** — `CylinderGeometry` avec `MeshPhysicalMaterial` (metalness selon conductivité)
- **Réseau carbone** — `LineSegments` : lattice honeycomb graphène exact (zigzag), projeté sur le cylindre
- **Capuchons** — `SphereGeometry` hémisphériques aux deux extrémités
- **Glow** — cylindre halo légèrement plus grand, `BackSide`, très transparent

```js
buildTubeHexFaces(nanotube, radius, height) → THREE.Mesh[]
```

Génère les faces hexagonales cliquables avec les `userData` : `isHexFace`, `hexFaceIdx`, `hexFacePos`, `tubeHexKey`.

---

### `src/scene/scene3d.js`

```js
class Scene3D(canvas: HTMLCanvasElement)
```

| Méthode | Description |
|---------|-------------|
| `buildGrid(hexes, orientation)` | Construit la grille 3D |
| `setTube(hexKey, nanotube)` | Place/remplace un tube + crée ses faces cliquables |
| `addChildTube(nanotube, center, normal, faceKey)` | Tube enfant orienté selon la normale |
| `removeTube(hexKey)` | Retire le tube |
| `highlightTube(hexKey)` | Surbrillance `emissive` |
| `onSelect(cb)` | Callback clic cellule grille |
| `onTubeHexSelect(cb)` | Callback clic hexagone tube — reçoit `{hexKey, hexFaceIdx, hexFacePos, worldPos, hexCenterWorld, hexNormalWorld, faceCentroidWorld, loopCentroidWorld}` |
| `toggleGrid()` | Affiche/masque grille et contours |
| `resetCamera()` | Position par défaut `(80, 120, 160)` |
| `screenshot()` | `data:image/png` |

---

### `src/app.js`

```js
class App
```

| Méthode | Description |
|---------|-------------|
| `exportMapJSON()` | Sérialise toute la carte en JSON v1.1 + déclenche téléchargement |
| `importMapJSON(data)` | Recharge grille + tubes parents + enfants + hexFaceData |
| `_importFromFile()` | Ouvre un sélecteur de fichier `.json` |
| `_importExample()` | Charge `/public/example-map.json` via `fetch` |
| `_jsonLog(type, text)` | Log dans le panneau Trace |
| `_spawnChildTube()` | Crée un tube enfant et stocke `{tube, center, normal, centerMode}` |
| `_computeChildTubeChirality(hexKey)` | Calcule `(m,n)` armchair depuis le diamètre inscrit |

---

## 11. Glossaire

| Terme | Définition |
|-------|------------|
| **a₀** | Constante de réseau du graphène = `√3 × a_cc` = 0,246 nm |
| **a_cc** | Longueur de la liaison C-C dans le graphène = 0,142 nm |
| **Angle chiral (θ)** | Angle entre `C_h` et la direction zigzag du graphène. θ = 0° (zigzag) à 30° (armchair) |
| **Apothème** | Rayon du cercle inscrit dans un hexagone régulier = `√3/2 × circumradius` |
| **Armchair** | Nanotube avec `m = n`, θ = 30°, toujours métallique. Liaisons perpendiculaires à l'axe |
| **Band gap (Eg)** | Énergie séparant bande de valence et bande de conduction. `Eg ≈ 0.9/d` eV pour CNT SC |
| **Ch (vecteur chiral)** | `m·a₁ + n·a₂` — définit l'enroulement du graphène. `\|Ch\| = π·d` |
| **Chiralité (m,n)** | Paire d'entiers non négatifs définissant l'orientation d'enroulement du nanotube |
| **Chiral** | Nanotube avec `m ≠ n` et `n ≠ 0`. Hélice atomique. Métallique si `(m-n) mod 3 = 0` |
| **Circumradius** | Rayon du cercle circonscrit d'un hexagone = longueur de liaison en unités scène |
| **CNT** | *Carbon NanoTube* — nanotube de carbone |
| **Conductivité** | Métallique si `(m-n) mod 3 = 0`, semi-conducteur sinon |
| **Coordonnées cube** | Système `(q,r,s)` avec `q+r+s=0` pour grilles hexagonales |
| **Dublin Core** | Vocabulaire de métadonnées standard (dcterms:title, dcterms:description…) |
| **faceKey** | Clé composite `"hexKey:hexFaceIdx"` identifiant un hexagone sur un tube |
| **Graphène** | Feuille monoatomique de carbone en réseau hexagonal — base structurelle des CNT |
| **hexCenterWorld** | Centre d'un hexagone de tube en coordonnées monde Three.js |
| **hexNormalWorld** | Vecteur normal sortant d'un hexagone de tube, en coordonnées monde |
| **Honeycomb** | Réseau en nid d'abeille — structure du graphène |
| **Lattice** | Réseau cristallin périodique |
| **matrixWorld** | Matrice transformation complète d'un objet Three.js (position + rotation + scale) |
| **MWNT** | *Multi-Walled NanoTube* — nanotube multi-parois |
| **Omeka S** | CMS de collections web open-source avec API REST |
| **PBR** | *Physically Based Rendering* — rendu physiquement réaliste |
| **Raycaster** | Mécanisme Three.js pour détecter les intersections rayon–géométrie (clics 3D) |
| **Resource Template** | Modèle Omeka S définissant un ensemble de propriétés pour un type d'Item |
| **Semi-conducteur** | Matériau à band gap positif. `Eg ≈ 0.9/d` pour les CNT |
| **sous-réseau A/B** | Les deux types d'atomes de carbone dans le graphène (maille à 2 atomes) |
| **SWNT** | *Single-Walled NanoTube* — nanotube à paroi unique |
| **Tight-binding** | Modèle quantique pour calculer la structure de bande des CNT |
| **Vecteur chiral** | Voir *Ch* |
| **WebGL** | API JavaScript pour rendu 3D GPU-accéléré |
| **Zigzag** | Nanotube avec `n = 0`, θ = 0°. Une rangée de liaisons parallèles à l'axe |
| **Zone de Brillouin** | Première cellule de Wigner-Seitz du réseau réciproque. Base de la physique des bandes |
| **Zone folding** | Méthode pour obtenir la structure de bande d'un CNT à partir de celle du graphène 2D |

---

## Annexe A — Raccourcis et interactions

| Action | Résultat |
|--------|----------|
| **Double-clic** sur cellule hex | Ajoute un nanotube aléatoire |
| **Clic** sur cellule hex / tube 3D | Sélectionne |
| **Clic sur hexagone du tube** | Ouvre panel propriétés + spawn enfant |
| **[⬡ Créer nanotube]** dans panel | Génère un tube perpendiculaire à l'hexagone |
| **Scroll** | Zoom |
| **⌖** | Réinitialise la caméra 3D |
| **📥 Importer** (toolbar) | Charge une carte depuis un fichier JSON |
| **📤 JSON** (toolbar) | Télécharge la carte courante en JSON |
| **📋 Exemple** (toolbar) | Charge `public/example-map.json` |

## Annexe B — Extension

### Ajouter une propriété physique au modèle CNT

```js
// src/nanotube/nanotube.js
get maNouvellePropriete() {
  // Toutes les formules peuvent utiliser this.m, this.n, this.diameter
  return /* calcul */ ;
}
```

### Ajouter un nouveau type de tube dans l'export JSON

Étendre `Nanotube.toJSON()` et `Nanotube.fromJSON()` pour inclure la nouvelle propriété — la compatibilité ascendante est assurée par les valeurs par défaut dans le constructeur.

### Connecter un backend alternatif à Omeka S

Implémenter les méthodes `ping`, `listMaps`, `getMap`, `saveMap`, `deleteMap`, `listResourceTemplates`, `getResourceTemplate`, `saveHexItem` de `OmekaClient`.

---

*Documentation NanoTubeStory v1.2 — Licence MIT*
