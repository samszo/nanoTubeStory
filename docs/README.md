# ⬡ NanoTubeStory — Documentation technique

> Application web mono-page pour créer, visualiser et analyser des **cartographies 3D de nanotubes de carbone** sur grilles hexagonales, assistée par un agent IA.

| | |
|---|---|
| **Version** | 1.1.0 |
| **Date** | 2026-06-08 |
| **Stack** | Three.js · D3.js · Anthropic SDK · Omeka S |
| **Licence** | MIT |
| **Diagrammes** | [📐 DIAGRAMS.md](./DIAGRAMS.md) |

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Physique des nanotubes de carbone](#2-physique-des-nanotubes-de-carbone)
3. [Cartographie hexagonale](#3-cartographie-hexagonale)
4. [Architecture technique](#4-architecture-technique)
5. [Installation et configuration](#5-installation-et-configuration)
6. [Guide utilisateur](#6-guide-utilisateur)
7. [Hexagones interactifs sur le tube](#7-hexagones-interactifs-sur-le-tube)
8. [API Omeka S](#8-api-omeka-s)
9. [Agent IA (Anthropic SDK)](#9-agent-ia-anthropic-sdk)
10. [Référence des modules](#10-référence-des-modules)
11. [Glossaire](#11-glossaire)

---

## 1. Introduction

**NanoTubeStory** est une application web interactive permettant de créer, visualiser et analyser des cartographies tridimensionnelles de nanotubes de carbone disposés sur des grilles hexagonales. Elle combine une visualisation scientifique avancée avec un agent IA capable d'analyser les propriétés physiques des configurations.

### 1.1 Objectifs

- **Visualisation 3D** — Rendu interactif de nanotubes avec réseau hexagonal graphène exact (liaisons C-C projetées sur cylindre), capuchons et effets lumineux
- **Cartographie spatiale** — Placement et organisation de nanotubes sur grilles hexagonales paramétrables
- **Hexagones interactifs** — Chaque hexagone du tube est cliquable pour définir ses propriétés (via template Omeka S) et générer des nanotubes enfants
- **Nanotubes enfants** — Spawn récursif de nanotubes perpendiculaires à la face hexagonale cliquée, avec diamètre = cercle inscrit de l'hexagone
- **Analyse physique** — Calcul automatique du diamètre, conductivité et band gap selon la chiralité `(m,n)`
- **Assistance IA** — Agent basé sur Claude (Anthropic) pour analyser et optimiser les configurations
- **Persistance** — Sauvegarde des cartographies et des propriétés d'hexagones via l'API REST Omeka S

### 1.2 Stack technologique

| Module | Technologie | Rôle |
|--------|-------------|------|
| Rendu 3D | Three.js v0.177 | Scène WebGL, géométrie CNT, éclairage PBR |
| Grille hex | D3.js v7 + Red Blob Games | SVG, coordonnées cube, interactions |
| Graphiques | D3.js v7 | Distribution types, comparaison diamètres |
| Agent IA | Anthropic SDK + Tool Use | Analyse, suggestion, génération CNT |
| Persistance | Omeka S REST API | CRUD cartographies, Items, Resource Templates |
| Build | Vite v6 | ESM, HMR, bundling production |

---

## 2. Physique des nanotubes de carbone

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

#### Conductivité électrique

```
Métallique       si  (m - n) mod 3 = 0  (dont tous les armchair)
Semi-conducteur  sinon
```

#### Band gap des semi-conducteurs (eV)

$$E_g \approx \frac{0.9}{d}$$

### 2.3 Réseau hexagonal carbone (lattice graphène)

Le réseau carbone affiché sur le tube est le **vrai lattice honeycomb du graphène** projeté sur la surface cylindrique, pas une approximation. L'implémentation utilise :

- **Orientation zigzag** — liaisons verticales + deux obliques à ±120°
- **Vecteurs de réseau** : `a₁ = (√3·d, 0)`, `a₂ = (√3·d/2, 3d/2)` où `d` est la longueur de liaison C-C en unités scène
- **Projection** : l'abscisse curviligne `x` → angle `θ = x/radius` → coordonnées cylindriques
- **Nombre d'hexagones** autour de la circonférence = `max(6, n + m)`

```
d_liaison = 2π·radius / (nHex · √3)   [longueur C-C en unités scène]
```

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
├── index.html                  # SPA entry point + panel hexagone
├── vite.config.js
├── package.json
├── .env.example
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
    ├── agents/
    │   └── agents.js           # Agent Anthropic SDK
    └── api/
        └── omeka.js            # Client REST Omeka S + Resource Templates
```

### 4.2 State de l'application (`App`)

| Propriété | Type | Description |
|-----------|------|-------------|
| `tubes` | `Map<hexKey, Nanotube>` | Tubes sur la grille hexagonale |
| `horizTubes` | `Map<faceKey, THREE.Group>` | Groupes Three.js des tubes enfants |
| `horizTubesData` | `Map<faceKey, Nanotube>` | Modèle physique des tubes enfants |
| `hexFaceData` | `Map<faceKey, object>` | Propriétés Omeka S des hexagones |
| `_activeHexFace` | `object` | Hexagone courant : `{hexKey, hexFaceIdx, hexFacePos, worldPos, hexCenterWorld, hexNormalWorld}` |

La clé `faceKey` a la forme `"hexKey:hexFaceIdx"` (ex. `"0,0,0:42"`), permettant l'imbrication récursive de tubes.

### 4.3 Pattern architectural

L'application suit un pattern **contrôleur central** (`app.js`) qui instancie tous les modules, reçoit les événements des vues et coordonne les mises à jour croisées.

---

## 5. Installation et configuration

### 5.1 Prérequis

- **Node.js** ≥ 18.0.0 + npm ≥ 9
- Navigateur moderne avec support **WebGL 2**
- *(Optionnel)* Instance **Omeka S** ≥ 3.0
- *(Optionnel)* Clé API **Anthropic**

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
VITE_ANTHROPIC_API_KEY=sk-ant-api03-…
VITE_OMEKA_API_URL=http://omeka.example.com/api
VITE_OMEKA_KEY_IDENTITY=aBcDeFgH
VITE_OMEKA_KEY_CREDENTIAL=xYz12345
VITE_OMEKA_ITEM_SET_ID=1
```

---

## 6. Guide utilisateur

### 6.1 Interface principale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⬡ NanoTubeStory  [+Carte] [💾Sauver] [📂Charger] [⬇Exporter]              │
│                  [3D] [Hex] [⊞]                        ● Omeka S  [⚙]      │
├──────────────┬───────────────────────────────────┬────────────┬─────────────┤
│ CARTOGRAPHIE │                                   │ PROPRIÉTÉS │ HEXAGONE    │
│              │                                   │ Chiralité  │ DU NANOTUBE │
│  Grille SVG  │    Scène 3D (Three.js)            │ Type       │ (slide-over)│
│  hexagonale  │    nanotubes avec réseau           │ Diamètre   │             │
│  D3.js       │    honeycomb graphène              │ Conduct.   │ Template    │
│              │                                   │ Band gap   │ Omeka S     │
│ GRILLE       │                              [⌖]  │            │             │
│ Rayon: 5     │                              [⊞]  │ ANALYSE    │ Nanotube    │
│ Orientation  │                              [A]  │ ▦ Types    │ horizontal  │
│              │                              [📷] │ ▦ Diam.    │ ⬡ Créer     │
├──────────────┴───────────────────────────────────┴────────────┴─────────────┤
│ 🤖 Agent Mastra              [EN ATTENTE]                               [▲] │
└─────────────────────────────────────────────────────────────────────────────┘
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
6. Saisir un titre → [💾 Sauver] (Omeka S)
```

---

## 7. Hexagones interactifs sur le tube

Cette fonctionnalité permet d'interagir avec chaque hexagone individuel de la surface d'un nanotube.

### 7.1 Principe

Chaque nanotube affiché en 3D possède, en plus de son maillage visuel (liaisons C-C), un ensemble de **faces hexagonales invisibles** (`opacity: 0`) utilisées comme cibles du raycaster Three.js. Un clic sur un hexagone déclenche :

1. Le calcul du **centre exact** de l'hexagone en coordonnées monde (via `localToWorld`)
2. Le calcul de la **normale sortante** (direction radiale `(cos θ, 0, sin θ)` en espace local, transformée par `matrixWorld`)
3. L'ouverture du **panel "Hexagone du nanotube"**

### 7.2 Géométrie des faces cliquables (`buildTubeHexFaces`)

```
Pour chaque anneau hexagonal (i, j) du lattice :
  Centre en 2D : cx = i·a1x + (j%2 ? a1x/2 : 0)
                 cy = d + j·a2y
  6 sommets projetés sur le cylindre (triangulation en éventail)
  userData.isHexFace  = true
  userData.hexFaceIdx = index unique
  userData.hexFacePos = { i, j, cx, cy }
  userData.tubeHexKey = hexKey du tube parent
```

### 7.3 Panel "Hexagone du nanotube"

Le panel slide-over comporte deux sections :

#### Section Template Omeka S

| Champ | Description |
|-------|-------------|
| **Resource template** | Liste des templates récupérés via `/api/resource_templates` |
| **Champs dynamiques** | Propriétés du template sélectionné, pré-remplies si déjà saisies |
| **[Sauver dans Omeka S]** | Crée ou met à jour un Item Omeka S avec les valeurs saisies |

#### Section Nanotube horizontal

| Champ | Description |
|-------|-------------|
| **⌀ inscrit** | Diamètre du cercle inscrit de l'hexagone (calculé automatiquement) |
| **Chiralité (m, n)** | Pré-rempli avec l'armchair le plus proche du diamètre inscrit |
| **Longueur (nm)** | Longueur du tube enfant |
| **Couleur** | Couleur du tube enfant |
| **[⬡ Créer nanotube]** | Génère le tube enfant |

### 7.4 Calcul du tube enfant

#### Diamètre = cercle inscrit de l'hexagone

Le rayon de l'hexagone (centre → sommet) vaut `d` (longueur de liaison). Le cercle inscrit (apothème) a pour rayon `√3·d/2`, soit un **diamètre = √3·d** en unités scène.

Converti en nm :

$$d_{enfant} = \frac{\pi \cdot d_{parent}}{n_{hex}}$$

Pour trouver les indices armchair `(n,n)` les plus proches :

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

### 7.5 Récursivité

Les hexagones du tube enfant sont **eux-mêmes cliquables** selon le même mécanisme. La clé de chaque tube enfant (`faceKey = "hexKey:hexFaceIdx"`) permet :
- De retrouver le modèle `Nanotube` dans `horizTubesData`
- De calculer les indices chiraux du niveau suivant
- De s'imbriquer récursivement sans limite de profondeur

---

## 8. API Omeka S

[Omeka S](https://omeka.org/s/) est utilisé comme backend de persistance via son **API REST**.

### 8.1 Endpoints utilisés

| Méthode | Endpoint | Action |
|---------|----------|--------|
| `GET` | `/api` | Test de connexion |
| `GET` | `/api/items?item_set_id=N` | Lister les cartographies |
| `GET` | `/api/items/{id}` | Charger une cartographie |
| `POST` | `/api/items` | Créer une cartographie ou un hexagone |
| `PATCH` | `/api/items/{id}` | Mettre à jour |
| `DELETE` | `/api/items/{id}` | Supprimer |
| `GET` | `/api/resource_templates` | Lister les templates de ressources |
| `GET` | `/api/resource_templates/{id}` | Récupérer un template (avec propriétés) |

### 8.2 Format d'un hexagone sauvegardé

```json
{
  "@type": ["o:Item"],
  "o:item_set": [{ "o:id": 1 }],
  "dcterms:title": [{ "@value": "Hex 0,0,0 [2,4]", "type": "literal" }],
  "dcterms:description": [{ "@value": "{\"hexKey\":\"0,0,0\",\"hexFaceIdx\":42,...}", "type": "literal" }],
  "dcterms:subject": [{ "@value": "nanotube:hex", "type": "literal" }],
  "<terme_template>": [{ "@value": "valeur", "type": "literal" }]
}
```

### 8.3 Classe OmekaClient — nouvelles méthodes

```js
// Resource templates
const templates = await client.listResourceTemplates();
// → [{ id: 5, label: "Atome de carbone" }, ...]

const tpl = await client.getResourceTemplate(5);
// → { id, label, properties: [{ term, label, type }, ...] }

// Sauvegarde d'un hexagone avec ses propriétés
const item = await client.saveHexItem({
  omekaId: null,          // null = création, nombre = mise à jour
  title: "Hex 0,0,0 [2,4]",
  templateId: 5,
  hexKey: "0,0,0",
  hexFaceIdx: 42,
  properties: [
    { term: "dcterms:description", value: "Atome de jonction" },
    { term: "cito:citesForInformation", value: "C-C bond" },
  ],
});
```

---

## 9. Agent IA (Anthropic SDK)

L'agent est implémenté avec l'**Anthropic SDK** en mode browser en utilisant les **Tool Use** de Claude, avec streaming temps réel.

### 9.1 Tools disponibles

- **`analyze_nanotube_config`** — Analyse statistique d'une configuration
- **`suggest_nanotube`** — Suggère des paramètres `(m,n)` selon la propriété souhaitée
- **`generate_configuration`** — Génère une configuration complète pour un objectif

### 9.2 Boucle agentic multi-tours

```
streamAgentResponse(apiKey, userMessage, onDelta, onTool)
│
├── Tour 1 : Envoi au modèle
│   ├── Stream text_delta → onDelta(chunk)
│   └── Si tool_use → executeTool() → tool_result → Tour 2
│
└── Tour 3 max : Sécurité anti-boucle
```

---

## 10. Référence des modules

### `src/nanotube/geometry.js`

```js
// Construction principale
buildNanotubeGroup(nanotube: Nanotube) → THREE.Group
```

Le groupe contient :
- **Tube principal** — `CylinderGeometry` avec `MeshPhysicalMaterial` (metalness selon conductivité)
- **Réseau carbone** — `LineSegments` : lattice honeycomb graphène exact (zigzag), projeté sur le cylindre
- **Capuchons** — `SphereGeometry` hémisphériques aux deux extrémités
- **Glow** — cylindre halo légèrement plus grand, `BackSide`, très transparent
- **`userData.nanotube`** — référence au modèle physique (utilisée par le raycaster)

```js
// Faces hexagonales cliquables
buildTubeHexFaces(nanotube: Nanotube, radius: number, height: number) → THREE.Mesh[]
```

Génère un tableau de meshes `MeshBasicMaterial({ opacity: 0 })` couvrant chaque anneau hexagonal de la surface. Chaque mesh porte :
- `userData.isHexFace = true`
- `userData.hexFaceIdx` — index unique
- `userData.hexFacePos` — `{ i, j, cx, cy }` (position dans le lattice 2D)
- `userData.tubeHexKey` — clé du tube parent (posé par `scene3d.js`)

```js
// Utilitaires
buildHexBase(corners, color) → THREE.Mesh    // Plan hexagonal (grille 2D)
buildHexOutline(corners, color) → THREE.Line  // Contour filaire
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
| `setTube(hexKey, nanotube)` | Place/remplace un tube + crée ses faces cliquables |
| `removeTube(hexKey)` | Retire le tube et supprime les faces de `hexFaceObjects` |
| `addHorizontalTube(nanotube, hexCenter, hexNormal, faceKey)` | Tube enfant orienté selon la normale de l'hexagone |
| `updateTube(hexKey, nanotube)` | Alias de `setTube` |
| `highlightTube(hexKey)` | Surbrillance par `emissive` |
| `onSelect(cb)` | Callback clic sur cellule de la grille |
| `onTubeHexSelect(cb)` | Callback clic sur hexagone du tube — reçoit `{ hexKey, hexFaceIdx, hexFacePos, worldPos, hexCenterWorld, hexNormalWorld }` |
| `toggleGrid(show?)` | Affiche/masque grille et contours |
| `resetCamera()` | Position par défaut `(80, 120, 160)` |
| `screenshot()` | `data:image/png` |
| `dispose()` | Nettoyage complet |

**Priorité du raycaster :**
1. Faces hexagonales de tube (`hexFaceObjects`) — déclenche `onTubeHexSelect`
2. Cellules de la grille hexagonale — déclenche `onSelect`

**`addHorizontalTube` — géométrie :**
```
quaternion = setFromUnitVectors(Y_axis, hexNormal)
position   = hexCenter + hexNormal × (length × NM_SCALE / 2)
             ───────────────────────────────────────────────
             → base du tube à la surface de l'hexagone parent
```

---

### `src/app.js`

```js
class App
```

#### Nouvelles méthodes (v1.1)

| Méthode | Description |
|---------|-------------|
| `_onTubeHexSelect(info)` | Reçoit le clic d'hexagone, calcule la chiralité enfant, ouvre le panel |
| `_computeChildTubeChirality(hexKey)` | Calcule `(m, n)` armchair depuis l'hexagone inscrit du tube parent ou d'un tube enfant |
| `_loadTemplates()` | Charge la liste des resource templates Omeka S (une seule fois) |
| `_onTemplateChange(templateId)` | Charge et affiche les champs du template sélectionné |
| `_renderTemplateFields(properties, savedValues)` | Génère les `<input>` dynamiques du template |
| `_saveHexToOmeka()` | Sauvegarde les propriétés de l'hexagone via `OmekaClient.saveHexItem` |
| `_spawnHorizontalTube()` | Crée le tube enfant avec les paramètres du panel |

---

### `src/api/omeka.js`

```js
class OmekaClient({ url, keyId, keyCred, itemSetId })
```

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `ping()` | `() → Promise<boolean>` | Test connexion |
| `listMaps()` | `() → Promise<{id,title,modified}[]>` | Liste les cartographies |
| `getMap(id)` | `(number) → Promise<MapData>` | Charge une cartographie |
| `saveMap(data)` | `(MapData) → Promise<Item>` | Crée ou met à jour une cartographie |
| `deleteMap(id)` | `(number) → Promise<void>` | Supprime |
| `listResourceTemplates()` | `() → Promise<{id,label}[]>` | Liste les templates |
| `getResourceTemplate(id)` | `(number) → Promise<Template>` | Template + propriétés |
| `saveHexItem(hexData)` | `(HexData) → Promise<Item>` | Sauvegarde un hexagone |

```ts
type Template = {
  id: number,
  label: string,
  properties: { term: string, label: string, type: string }[]
}

type HexData = {
  omekaId: number | null,
  templateId: number,
  title: string,
  hexKey: string,
  hexFaceIdx: number,
  hexFacePos: { i, j, cx, cy },
  properties: { term: string, value: string }[]
}
```

---

## 11. Glossaire

| Terme | Définition |
|-------|------------|
| **Apothème** | Rayon du cercle inscrit dans un hexagone régulier = `√3/2 × circumradius` |
| **Armchair** | Nanotube avec `m = n`. Vecteur chiral à 30° — toujours métallique |
| **Band gap (Eg)** | Énergie séparant bande de valence et bande de conduction |
| **Chiralité (m,n)** | Paire d'entiers définissant l'enroulement du graphène |
| **Circumradius** | Rayon du cercle circonscrit d'un hexagone = `d` (longueur de liaison C-C dans le lattice) |
| **Coordonnées cube** | Système `(q,r,s)` avec `q+r+s=0` pour grilles hexagonales |
| **Dublin Core** | Vocabulaire de métadonnées standard utilisé par Omeka S |
| **faceKey** | Clé composite `"hexKey:hexFaceIdx"` identifiant un hexagone sur un tube |
| **FractionalHex** | Version décimale des coordonnées cube, utilisée pour l'arrondi |
| **Graphène** | Feuille monoatomique de carbone en réseau hexagonal. Base structurelle des CNT |
| **hexCenterWorld** | Centre d'un hexagone de tube exprimé en coordonnées monde Three.js |
| **hexNormalWorld** | Vecteur normal sortant d'un hexagone de tube, en coordonnées monde |
| **Honeycomb** | Réseau en nid d'abeille — structure du graphène, base du lattice CNT |
| **matrixWorld** | Matrice de transformation complète (position + rotation + scale) d'un objet Three.js |
| **MWNT** | *Multi-Walled NanoTube* — nanotube multi-parois |
| **Omeka S** | CMS de collections web open-source avec API REST |
| **OrbitControls** | Contrôle caméra Three.js (rotation orbitale, zoom, panoramique) |
| **PBR** | *Physically Based Rendering* — rendu physiquement réaliste |
| **Raycaster** | Mécanisme Three.js pour détecter les intersections rayon–géométrie (clics 3D) |
| **Resource Template** | Modèle Omeka S définissant un ensemble de propriétés Dublin Core pour un type d'Item |
| **Semi-conducteur** | Matériau à band gap positif. Conductivité contrôlable |
| **SWNT** | *Single-Walled NanoTube* — nanotube à paroi unique |
| **Tight-binding** | Modèle quantique pour calculer la structure de bande des CNT |
| **Tool Use** | Mécanisme Anthropic API permettant à Claude d'appeler des fonctions côté client |
| **Vecteur chiral** | `C = m·a₁ + n·a₂` — sa norme = circonférence du tube |
| **WebGL** | API JavaScript pour rendu 3D GPU-accéléré |
| **Zigzag** | Nanotube avec `n = 0`. Vecteur chiral à 0° |

---

## Annexe A — Raccourcis et interactions

| Action | Résultat |
|--------|----------|
| **Double-clic** sur cellule hex | Ajoute un nanotube aléatoire |
| **Clic** sur cellule hex / tube 3D | Sélectionne |
| **Clic sur hexagone du tube** | Ouvre panel propriétés + spawn enfant |
| **[⬡ Créer nanotube]** dans panel | Génère un tube perpendiculaire à l'hexagone |
| **Scroll** | Zoom |
| **Entrée** dans l'agent | Envoie le message |
| **⌖** | Réinitialise la caméra 3D |

## Annexe B — Extension

### Ajouter un nouveau type de tool agent

```js
// src/agents/agents.js — section TOOLS
{ name: 'mon_tool', description: '…', input_schema: { … } }
// Section executeTool
case 'mon_tool': return { result: … };
```

### Ajouter une propriété physique au modèle CNT

```js
// src/nanotube/nanotube.js
get maNouvellePropriete() {
  return /* calcul basé sur this.m, this.n, this.diameter */ ;
}
```

### Connecter un backend alternatif

Implémenter les méthodes `ping`, `listMaps`, `getMap`, `saveMap`, `deleteMap`, `listResourceTemplates`, `getResourceTemplate`, `saveHexItem` de `OmekaClient`.

---

*Documentation NanoTubeStory v1.1 — Licence MIT*
