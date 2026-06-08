# ⬡ NanoTubeStory — Diagrammes Mermaid

> Diagrammes techniques de l'application. Visualisables sur GitHub, GitLab, Obsidian, VS Code (extension Mermaid), ou sur [mermaid.live](https://mermaid.live).

---

## Table des diagrammes

| # | Titre | Type |
|---|-------|------|
| [1](#1-architecture-générale) | Architecture générale | `graph` |
| [2](#2-classification-des-nanotubes-par-chiralité) | Classification des nanotubes par chiralité | `flowchart` |
| [3](#3-flux-de-données--interactions-utilisateur) | Flux de données — interactions utilisateur | `flowchart` |
| [4](#4-modèle-de-classes--modules-principaux) | Modèle de classes — modules principaux | `classDiagram` |
| [5](#5-boucle-agentic--tool-use-anthropic) | Boucle agentic — Tool Use Anthropic | `sequenceDiagram` |
| [6](#6-crud-omeka-s--séquence-complète) | CRUD Omeka S — séquence complète | `sequenceDiagram` |
| [7](#7-cycle-de-vie-dune-cartographie) | Cycle de vie d'une cartographie | `stateDiagram` |
| [8](#8-pipeline-de-rendu-3d--buildnanotubegroup) | Pipeline de rendu 3D — buildNanotubeGroup | `flowchart` |
| [9](#9-coordonnées-hexagonales-cube--voisins-et-directions) | Coordonnées hexagonales cube — voisins | `graph` |
| [10](#10-gantt--workflow-utilisateur-typique) | Gantt — workflow utilisateur typique | `gantt` |

---

## 1. Architecture générale

Vue d'ensemble des modules de l'application et de leurs dépendances, incluant les services externes (Anthropic API, Omeka S).

```mermaid
graph TB
    subgraph Browser["🌐 Navigateur (SPA Vite)"]
        subgraph UI["Interface utilisateur"]
            HTML["index.html"]
            CSS["style.css<br/>(dark theme)"]
        end

        subgraph Core["Contrôleur central"]
            APP["app.js<br/><b>App</b>"]
        end

        subgraph HexModule["⬡ Module Hexagonal"]
            HEX["hex.js<br/>Hex · Layout · Point<br/>coordonnées cube"]
            HEXMAP["hexMap.js<br/>HexMap SVG D3"]
        end

        subgraph NanoModule["⚛ Module Nanotube"]
            NANO["nanotube.js<br/>Nanotube<br/>modèle physique"]
            GEO["geometry.js<br/>Three.js geometry<br/>tube + lattice + caps"]
        end

        subgraph SceneModule["🎬 Module 3D"]
            SCENE["scene3d.js<br/>Scene3D<br/>WebGL · OrbitControls"]
        end

        subgraph ChartModule["📊 Module Charts"]
            CHARTS["charts.js<br/>NanoCharts<br/>D3.js SVG"]
        end

        subgraph AgentModule["🤖 Module Agent"]
            AGENT["agents.js<br/>streamAgentResponse<br/>Tool Use"]
        end

        subgraph APIModule["💾 Module API"]
            OMEKA["omeka.js<br/>OmekaClient<br/>REST CRUD"]
        end
    end

    subgraph External["☁️ Services externes"]
        ANTHROPIC["Anthropic API<br/>claude-sonnet-4-6"]
        OMEKAS["Omeka S<br/>REST API"]
    end

    APP --> HEXMAP
    APP --> SCENE
    APP --> CHARTS
    APP --> AGENT
    APP --> OMEKA
    APP --> NANO

    HEXMAP --> HEX
    SCENE --> GEO
    GEO --> NANO

    AGENT -->|"HTTPS stream"| ANTHROPIC
    OMEKA -->|"HTTPS REST"| OMEKAS

    HTML --> APP
    CSS --> HTML

    style Browser fill:#111827,stroke:#2d3a4f,color:#e2e8f0
    style Core fill:#1e2736,stroke:#22d3ee,color:#22d3ee
    style HexModule fill:#1e2736,stroke:#818cf8,color:#818cf8
    style NanoModule fill:#1e2736,stroke:#4ade80,color:#4ade80
    style SceneModule fill:#1e2736,stroke:#22d3ee,color:#22d3ee
    style ChartModule fill:#1e2736,stroke:#facc15,color:#facc15
    style AgentModule fill:#1e2736,stroke:#f87171,color:#f87171
    style APIModule fill:#1e2736,stroke:#4ade80,color:#4ade80
    style External fill:#0a0e17,stroke:#2d3a4f,color:#7a8fa8
```

---

## 2. Classification des nanotubes par chiralité

Arbre de décision pour déterminer le type et la conductivité d'un nanotube à partir de ses indices `(m, n)`.

```mermaid
flowchart TD
    START(["Nanotube (m, n)"])

    START --> CHECK1{"m = n ?"}
    CHECK1 -->|Oui| ARMCHAIR["⬡ ARMCHAIR<br/>ex: (5,5) (10,10)"]
    CHECK1 -->|Non| CHECK2{"n = 0 ?"}
    CHECK2 -->|Oui| ZIGZAG["⬡ ZIGZAG<br/>ex: (7,0) (9,0)"]
    CHECK2 -->|Non| CHIRAL["⬡ CHIRAL<br/>ex: (6,2) (8,3)"]

    ARMCHAIR --> METAL1["⚡ Toujours MÉTALLIQUE<br/>Eg = 0 eV"]
    ZIGZAG   --> CHECK3{"m mod 3 = 0 ?"}
    CHIRAL   --> CHECK4{"(m−n) mod 3 = 0 ?"}

    CHECK3 -->|Oui| METAL2["⚡ MÉTALLIQUE<br/>Eg = 0 eV"]
    CHECK3 -->|Non| SEMI1["🔋 SEMI-CONDUCTEUR<br/>Eg ≈ 0.9/d eV"]
    CHECK4 -->|Oui| METAL3["⚡ MÉTALLIQUE<br/>Eg = 0 eV"]
    CHECK4 -->|Non| SEMI2["🔋 SEMI-CONDUCTEUR<br/>Eg ≈ 0.9/d eV"]

    METAL1 & METAL2 & METAL3 --> DIAM["📐 Diamètre<br/>d = (a₀/π)√(m²+mn+n²)<br/>a₀ = 0.246 nm"]
    SEMI1 & SEMI2 --> DIAM

    style ARMCHAIR fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style ZIGZAG   fill:#3a3a0a,stroke:#facc15,color:#facc15
    style CHIRAL   fill:#1a1a3e,stroke:#818cf8,color:#818cf8
    style METAL1   fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style METAL2   fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style METAL3   fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style SEMI1    fill:#3a1a0a,stroke:#f87171,color:#f87171
    style SEMI2    fill:#3a1a0a,stroke:#f87171,color:#f87171
    style DIAM     fill:#1e2736,stroke:#7a8fa8,color:#e2e8f0
    style START    fill:#22d3ee,stroke:#22d3ee,color:#000
```

---

## 3. Flux de données — interactions utilisateur

Comment les actions utilisateur traversent les couches de l'application, de l'interface jusqu'aux sorties (3D, charts, agent, API).

```mermaid
flowchart LR
    USER(["👤 Utilisateur"])

    subgraph Views["Vues"]
        SVG["⬡ Grille SVG\nD3.js"]
        V3D["🎬 Scène 3D\nThree.js"]
    end

    subgraph AppCtrl["App.js — Contrôleur"]
        STATE["Map&lt;hexKey, Nanotube&gt;"]
        CRUD["CRUD local"]
    end

    subgraph Compute["Calculs"]
        MODEL["Nanotube\nmodèle physique"]
        GEOM["buildNanotubeGroup\ngéométrie WebGL"]
    end

    subgraph Output["Sorties"]
        CHARTS["📊 D3 Charts"]
        PROPS["📋 Panneau\npropriétés"]
        AGENT["🤖 Agent IA\nstream"]
        API["💾 Omeka S\nREST"]
    end

    USER -->|"double-clic hex"| SVG
    USER -->|"clic tube"| V3D
    USER -->|"édite m,n,L"| PROPS

    SVG -->|"sélection / add"| AppCtrl
    V3D -->|"sélection"| AppCtrl
    PROPS -->|"Appliquer"| AppCtrl

    AppCtrl --> STATE
    STATE --> CRUD
    CRUD --> MODEL
    MODEL --> GEOM
    GEOM --> V3D
    CRUD --> SVG
    CRUD --> CHARTS
    MODEL --> PROPS

    AppCtrl -->|"💡 Suggérer\n⚡ Optimiser"| AGENT
    AppCtrl -->|"💾 Sauver\n📂 Charger"| API

    style AppCtrl fill:#1e2736,stroke:#22d3ee,color:#22d3ee
    style Views   fill:#111827,stroke:#818cf8,color:#818cf8
    style Compute fill:#111827,stroke:#4ade80,color:#4ade80
    style Output  fill:#111827,stroke:#facc15,color:#facc15
```

---

## 4. Modèle de classes — modules principaux

Diagramme UML des classes principales, leurs attributs, méthodes et relations.

```mermaid
classDiagram
    class Hex {
        +int q
        +int r
        +int s
        +add(b) Hex
        +subtract(b) Hex
        +distance(b) int
        +neighbor(dir) Hex
        +neighbors() Hex[]
        +linedraw(b) Hex[]
        +key() string
    }

    class Layout {
        +Orientation orientation
        +Point size
        +Point origin
        +hexToPixel(h) Point
        +pixelToHex(p) Hex
        +polygonCorners(h) Point[]
        +polygonPath(h) string
    }

    class Nanotube {
        +int m
        +int n
        +float length
        +float rotation
        +string color
        +string hexKey
        +string omekaId
        +diameter() float
        +type() string
        +conductivity() string
        +bandGap() float
        +isMetallic() bool
        +toJSON() object
        +toOmeka(setId) object
    }

    class HexMap {
        +Map tubes
        +Layout layout
        +build(radius, orient)
        +setTube(key, tube)
        +removeTube(key)
        +onSelect(cb)
        +getStats() object
    }

    class Scene3D {
        +Map tubeObjects
        +Map hexObjects
        +THREE.Scene scene
        +buildGrid(hexes, orient)
        +setTube(key, tube)
        +removeTube(key)
        +highlightTube(key)
        +screenshot() string
        +resetCamera()
    }

    class NanoCharts {
        +updateDistribution(tubes)
        +updateProperties(tubes)
        +update(tubesMap)
    }

    class OmekaClient {
        +string baseUrl
        +string keyId
        +string keyCred
        +int itemSetId
        +ping() bool
        +listMaps() array
        +getMap(id) object
        +saveMap(data) object
        +deleteMap(id)
    }

    class App {
        +Map tubes
        +string selectedKey
        +int gridRadius
        +HexMap hexMap
        +Scene3D scene3d
        +NanoCharts charts
        +OmekaClient omeka
        +init()
        +_setTube(key, tube)
        +_removeTube(key)
        +_sendAgentMessage(msg)
        +_saveMap()
        +_loadMap(id)
    }

    App "1" --> "1" HexMap
    App "1" --> "1" Scene3D
    App "1" --> "1" NanoCharts
    App "1" --> "1" OmekaClient
    App "1" --> "*" Nanotube
    HexMap --> Layout
    HexMap --> Hex
    Scene3D --> Nanotube
    Layout --> Hex
```

---

## 5. Boucle agentic — Tool Use Anthropic

Séquence détaillée de la boucle multi-tours : streaming, détection des tool calls, exécution locale et réponse finale.

```mermaid
sequenceDiagram
    actor User as 👤 Utilisateur
    participant UI as 🖥️ Interface
    participant Agent as 🤖 agents.js
    participant API as ☁️ Anthropic API
    participant Tools as 🔧 executeTool()

    User->>UI: Saisit un message / clique Suggérer
    UI->>Agent: streamAgentResponse(apiKey, message)

    loop Boucle agentic (max 3 tours)
        Agent->>API: messages.stream(model, tools, messages)

        alt stop_reason = "end_turn"
            API-->>Agent: text_delta chunks
            Agent-->>UI: onDelta(chunk) — affichage temps réel
            Agent-->>UI: FIN
        else stop_reason = "tool_use"
            API-->>Agent: tool_use block (name + input JSON)
            Agent->>Tools: executeTool(name, input)
            Tools-->>Agent: result object
            Agent-->>UI: onTool(name, input, result) — log UI
            Agent->>API: messages += tool_result
            Note over Agent,API: Nouveau tour avec résultat du tool
        end
    end

    UI-->>User: Réponse finale affichée en streaming
```

---

## 6. CRUD Omeka S — séquence complète

Toutes les opérations REST entre l'application et l'API Omeka S : connexion, liste, création, mise à jour, chargement et suppression.

```mermaid
sequenceDiagram
    participant App as 🖥️ App.js
    participant Client as 💾 OmekaClient
    participant REST as 🌐 Omeka S API

    Note over App,REST: ── Connexion ──
    App->>Client: ping()
    Client->>REST: GET /api
    REST-->>Client: 200 OK {version}
    Client-->>App: true ✓

    Note over App,REST: ── Lister les cartes ──
    App->>Client: listMaps()
    Client->>REST: GET /api/items?item_set_id=1&per_page=50
    REST-->>Client: [{o:id, dcterms:title, ...}]
    Client-->>App: [{id, title, modified}]

    Note over App,REST: ── Créer une carte ──
    App->>Client: saveMap({title, tubes, gridRadius})
    Client->>REST: POST /api/items\n{@type, o:item_set, dcterms:title,\n dcterms:description: JSON(tubes)}
    REST-->>Client: 201 Created {o:id: 42}
    Client-->>App: item (omekaId = 42)

    Note over App,REST: ── Mettre à jour ──
    App->>Client: saveMap({omekaId:42, ...})
    Client->>REST: PATCH /api/items/42
    REST-->>Client: 200 OK
    Client-->>App: item mis à jour

    Note over App,REST: ── Charger ──
    App->>Client: getMap(42)
    Client->>REST: GET /api/items/42
    REST-->>Client: item complet
    Client-->>App: {omekaId, title, tubes[], gridRadius}

    Note over App,REST: ── Supprimer ──
    App->>Client: deleteMap(42)
    Client->>REST: DELETE /api/items/42
    REST-->>Client: 204 No Content
```

---

## 7. Cycle de vie d'une cartographie

Machine à états de la cartographie depuis sa création jusqu'à la sauvegarde, avec toutes les transitions possibles.

```mermaid
stateDiagram-v2
    [*] --> Vide : + Carte (nouveau)

    Vide --> EnCours : Double-clic sur cellule\n→ ajout nanotube aléatoire

    EnCours --> EnCours : Édition (m,n,longueur…)\n→ Appliquer

    EnCours --> EnCours : Ajout / Suppression\nde nanotubes

    EnCours --> Sauvegardée : 💾 Sauver\nPOST Omeka S

    Sauvegardée --> EnCours : Modification\naprès sauvegarde

    Sauvegardée --> Sauvegardée : 💾 Sauver (update)\nPATCH Omeka S

    Vide --> Chargée : 📂 Charger\nGET Omeka S

    Chargée --> EnCours : Modification\nd'une carte chargée

    EnCours --> Exportée : 📷 Exporter PNG

    Exportée --> EnCours : Continue l'édition

    EnCours --> Vide : + Carte\n(réinitialise tout)

    Sauvegardée --> Vide : + Carte\n(réinitialise tout)

    note right of EnCours
        State interne :
        tubes: Map(hexKey → Nanotube)
        Synchronisé avec HexMap + Scene3D + Charts
    end note
```

---

## 8. Pipeline de rendu 3D — buildNanotubeGroup

Décomposition du processus de construction de la géométrie Three.js pour un nanotube, du modèle physique au `THREE.Group` rendu.

```mermaid
flowchart TD
    INPUT["Nanotube(m, n, length, color)"]

    INPUT --> SCALE["📐 Calcul de l'échelle\ndiameter × NM_SCALE × 8\nheight = length × NM_SCALE"]

    SCALE --> SEGS["⬡ Segments de cylindre\nmax(12, (m+n)×2)"]

    subgraph GROUP["THREE.Group"]
        TUBE["CylinderGeometry\nMeshPhysicalMaterial\n・metalness = 0.9 si métallique\n・opacity = 0.55\n・DoubleSide"]

        LATTICE["LineSegments\n(réseau carbone)\nboucle rows × cols\n→ liaisons hex enroulées"]

        CAPTOP["SphereGeometry ½\n(capuchon haut)\ny = +height/2"]

        CAPBOT["SphereGeometry ½\n(capuchon bas)\ny = -height/2\nrotationX = π"]

        GLOW["CylinderGeometry\n(halo)\nradius × 1.3\nopacity = 0.06\nBackSide"]
    end

    SEGS --> TUBE
    SEGS --> LATTICE
    SEGS --> CAPTOP
    SEGS --> CAPBOT
    SEGS --> GLOW

    GROUP --> ROT["rotation.y = rotation × π/180"]
    ROT --> SCENE["→ Scene3D\nposition = (hexCenter.x, h/2, hexCenter.z)"]

    style GROUP fill:#1e2736,stroke:#22d3ee,color:#e2e8f0
    style TUBE   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style LATTICE fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style CAPTOP fill:#1a1a2e,stroke:#818cf8,color:#818cf8
    style CAPBOT fill:#1a1a2e,stroke:#818cf8,color:#818cf8
    style GLOW   fill:#2a1a0a,stroke:#facc15,color:#facc15
    style INPUT  fill:#22d3ee,stroke:#22d3ee,color:#000
    style SCENE  fill:#111827,stroke:#7a8fa8,color:#e2e8f0
```

---

## 9. Coordonnées hexagonales cube — voisins et directions

Les 6 directions standard en coordonnées cube, la règle d'invariance `q+r+s=0`, le calcul de distance et les matrices de conversion vers les pixels.

```mermaid
graph TB
    C["⬡ (0,0,0)\ncentre"]

    D0["⬡ (1,0,-1)\ndir 0"]
    D1["⬡ (1,-1,0)\ndir 1"]
    D2["⬡ (0,-1,1)\ndir 2"]
    D3["⬡ (-1,0,1)\ndir 3"]
    D4["⬡ (-1,1,0)\ndir 4"]
    D5["⬡ (0,1,-1)\ndir 5"]

    C -->|"+q -s"| D0
    C -->|"+q -r"| D1
    C -->|"-r +s"| D2
    C -->|"-q +s"| D3
    C -->|"-q +r"| D4
    C -->|"+r -s"| D5

    RULE["Règle invariante\nq + r + s = 0\npour toute cellule"]
    DIST["Distance entre A et B\n= (|dq|+|dr|+|ds|) / 2"]

    CONV1["Pointy-top → pixels\nx = size × (√3·q + √3/2·r)\ny = size × (3/2·r)"]
    CONV2["Flat-top → pixels\nx = size × (3/2·q)\ny = size × (√3/2·q + √3·r)"]

    style C    fill:#22d3ee,stroke:#22d3ee,color:#000,font-weight:bold
    style D0   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style D1   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style D2   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style D3   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style D4   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style D5   fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style RULE fill:#1e2736,stroke:#facc15,color:#facc15
    style DIST fill:#1e2736,stroke:#4ade80,color:#4ade80
    style CONV1 fill:#1e2736,stroke:#818cf8,color:#818cf8
    style CONV2 fill:#1e2736,stroke:#818cf8,color:#818cf8
```

---

## 10. Gantt — workflow utilisateur typique

Chronologie des étapes d'une session de travail standard sur NanoTubeStory.

```mermaid
gantt
    title Workflow utilisateur — NanoTubeStory
    dateFormat  X
    axisFormat %s

    section Configuration
    Ouvrir l'application       :done,    c1, 0, 2
    Configurer Omeka S / API   :done,    c2, 1, 3
    Choisir rayon de grille    :done,    c3, 3, 4

    section Création
    Placer nanotubes (dbl-clic):active,  n1, 4, 8
    Éditer chiralité (m,n)     :         n2, 6, 10
    Ajuster longueur / couleur :         n3, 8, 11
    Visualiser en 3D           :         n4, 4, 11

    section Analyse
    Lire graphiques D3         :         a1, 10, 12
    Demander analyse à l'agent :         a2, 11, 14
    Appliquer suggestions IA   :         a3, 13, 16

    section Sauvegarde
    Saisir un titre            :         s1, 15, 16
    Sauvegarder (Omeka S)      :         s2, 16, 17
    Exporter PNG               :         s3, 16, 18
```

---

*NanoTubeStory v1.0 — Licence MIT*
