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
| [10](#10-lattice-carbone--projection-sur-cylindre) | Lattice carbone — projection sur cylindre | `flowchart` |
| [11](#11-hexagone-interactif--tube-enfant) | Hexagone interactif — tube enfant | `sequenceDiagram` |
| [12](#12-calcul-chiralité-du-tube-enfant) | Calcul chiralité du tube enfant | `flowchart` |
| [13](#13-gantt--workflow-utilisateur-typique) | Gantt — workflow utilisateur typique | `gantt` |

---

## 1. Architecture générale

Vue d'ensemble des modules de l'application et de leurs dépendances, incluant les services externes.

```mermaid
graph TB
    subgraph Browser["🌐 Navigateur (SPA Vite)"]
        subgraph UI["Interface utilisateur"]
            HTML["index.html\n+ panel hexagone"]
            CSS["style.css\n(dark theme)"]
        end

        subgraph Core["Contrôleur central"]
            APP["app.js\nApp"]
        end

        subgraph HexModule["⬡ Module Hexagonal"]
            HEX["hex.js\nHex · Layout · Point\ncoordonnées cube"]
            HEXMAP["hexMap.js\nHexMap SVG D3"]
        end

        subgraph NanoModule["⚛ Module Nanotube"]
            NANO["nanotube.js\nNanotube\nmodèle physique"]
            GEO["geometry.js\nbuildNanotubeGroup\nbuildTubeHexFaces\nlattice graphène exact"]
        end

        subgraph SceneModule["🎬 Module 3D"]
            SCENE["scene3d.js\nScene3D\nraycaster étendu\naddHorizontalTube"]
        end

        subgraph ChartModule["📊 Module Charts"]
            CHARTS["charts.js\nNanoCharts D3.js"]
        end

        subgraph AgentModule["🤖 Module Agent"]
            AGENT["agents.js\nstreamAgentResponse\nTool Use"]
        end

        subgraph APIModule["💾 Module API"]
            OMEKA["omeka.js\nOmekaClient\nCRUD + Resource Templates"]
        end
    end

    subgraph External["☁️ Services externes"]
        ANTHROPIC["Anthropic API\nclaude-sonnet-4-6"]
        OMEKAS["Omeka S\nREST API"]
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

Arbre de décision pour déterminer le type et la conductivité d'un nanotube.

```mermaid
flowchart TD
    START(["Nanotube (m, n)"])

    START --> CHECK1{"m = n ?"}
    CHECK1 -->|Oui| ARMCHAIR["⬡ ARMCHAIR\nex: (5,5) (10,10)"]
    CHECK1 -->|Non| CHECK2{"n = 0 ?"}
    CHECK2 -->|Oui| ZIGZAG["⬡ ZIGZAG\nex: (7,0) (9,0)"]
    CHECK2 -->|Non| CHIRAL["⬡ CHIRAL\nex: (6,2) (8,3)"]

    ARMCHAIR --> METAL1["⚡ Toujours MÉTALLIQUE\nEg = 0 eV"]
    ZIGZAG   --> CHECK3{"m mod 3 = 0 ?"}
    CHIRAL   --> CHECK4{"(m−n) mod 3 = 0 ?"}

    CHECK3 -->|Oui| METAL2["⚡ MÉTALLIQUE\nEg = 0 eV"]
    CHECK3 -->|Non| SEMI1["🔋 SEMI-CONDUCTEUR\nEg ≈ 0.9/d eV"]
    CHECK4 -->|Oui| METAL3["⚡ MÉTALLIQUE\nEg = 0 eV"]
    CHECK4 -->|Non| SEMI2["🔋 SEMI-CONDUCTEUR\nEg ≈ 0.9/d eV"]

    METAL1 & METAL2 & METAL3 --> DIAM["📐 Diamètre\nd = (a₀/π)√(m²+mn+n²)\na₀ = 0.246 nm"]
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

Comment les actions utilisateur traversent les couches de l'application.

```mermaid
flowchart LR
    USER(["👤 Utilisateur"])

    subgraph Views["Vues"]
        SVG["⬡ Grille SVG\nD3.js"]
        V3D["🎬 Scène 3D\nThree.js"]
        PANEL["📋 Panel hex\nslide-over"]
    end

    subgraph AppCtrl["App.js — Contrôleur"]
        STATE["tubes: Map(hexKey→Nanotube)\nhorizTubes: Map(faceKey→Group)\nhexFaceData: Map(faceKey→Data)"]
        CRUD["CRUD local"]
    end

    subgraph Compute["Calculs"]
        MODEL["Nanotube\nmodèle physique"]
        GEOM["buildNanotubeGroup\nbuildTubeHexFaces"]
    end

    subgraph Output["Sorties"]
        CHARTS["📊 D3 Charts"]
        PROPS["📋 Panneau\npropriétés"]
        AGENT["🤖 Agent IA\nstream"]
        API["💾 Omeka S\nREST + Templates"]
    end

    USER -->|"double-clic hex"| SVG
    USER -->|"clic tube/grille"| V3D
    USER -->|"clic hexagone tube"| V3D
    USER -->|"édite m,n,L"| PROPS

    SVG -->|"sélection / add"| AppCtrl
    V3D -->|"onSelect"| AppCtrl
    V3D -->|"onTubeHexSelect"| AppCtrl
    AppCtrl -->|"ouvre"| PANEL
    PANEL -->|"spawn tube enfant"| AppCtrl
    PANEL -->|"save hex"| API
    PROPS -->|"Appliquer"| AppCtrl

    AppCtrl --> STATE
    STATE --> CRUD
    CRUD --> MODEL
    MODEL --> GEOM
    GEOM --> V3D
    CRUD --> SVG
    CRUD --> CHARTS
    MODEL --> PROPS

    AppCtrl -->|"💡/⚡"| AGENT
    AppCtrl -->|"💾/📂"| API

    style AppCtrl fill:#1e2736,stroke:#22d3ee,color:#22d3ee
    style Views   fill:#111827,stroke:#818cf8,color:#818cf8
    style Compute fill:#111827,stroke:#4ade80,color:#4ade80
    style Output  fill:#111827,stroke:#facc15,color:#facc15
```

---

## 4. Modèle de classes — modules principaux

Diagramme UML des classes principales, attributs, méthodes et relations.

```mermaid
classDiagram
    class Nanotube {
        +int m
        +int n
        +float length
        +float rotation
        +string color
        +string hexKey
        +diameter() float
        +type() string
        +conductivity() string
        +bandGap() float
        +toJSON() object
        +toOmeka(setId) object
    }

    class Scene3D {
        +Map tubeObjects
        +Map hexObjects
        +Map hexFaceObjects
        +buildGrid(hexes, orient)
        +setTube(key, tube)
        +removeTube(key)
        +addHorizontalTube(tube, center, normal, faceKey)
        +onSelect(cb)
        +onTubeHexSelect(cb)
        +screenshot() string
    }

    class OmekaClient {
        +string baseUrl
        +ping() bool
        +listMaps() array
        +saveMap(data) object
        +listResourceTemplates() array
        +getResourceTemplate(id) object
        +saveHexItem(hexData) object
    }

    class App {
        +Map tubes
        +Map horizTubes
        +Map horizTubesData
        +Map hexFaceData
        +object _activeHexFace
        +init()
        +_onTubeHexSelect(info)
        +_computeChildTubeChirality(hexKey)
        +_spawnHorizontalTube()
        +_saveHexToOmeka()
        +_loadTemplates()
    }

    class HexMap {
        +Map tubes
        +build(radius, orient)
        +setTube(key, tube)
        +onSelect(cb)
        +getStats() object
    }

    App "1" --> "1" HexMap
    App "1" --> "1" Scene3D
    App "1" --> "1" OmekaClient
    App "1" --> "*" Nanotube
    Scene3D --> Nanotube : userData.nanotube
```

---

## 5. Boucle agentic — Tool Use Anthropic

Séquence multi-tours : streaming, détection des tool calls, exécution locale.

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
            Agent-->>UI: onDelta(chunk)
        else stop_reason = "tool_use"
            API-->>Agent: tool_use block
            Agent->>Tools: executeTool(name, input)
            Tools-->>Agent: result
            Agent-->>UI: onTool(name, input, result)
            Agent->>API: messages += tool_result
        end
    end

    UI-->>User: Réponse finale
```

---

## 6. CRUD Omeka S — séquence complète

Toutes les opérations REST : cartographies, hexagones et resource templates.

```mermaid
sequenceDiagram
    participant App as 🖥️ App.js
    participant Client as 💾 OmekaClient
    participant REST as 🌐 Omeka S API

    Note over App,REST: ── Cartographies ──
    App->>Client: saveMap({title, tubes, gridRadius})
    Client->>REST: POST /api/items
    REST-->>Client: 201 {o:id: 42}
    Client-->>App: item

    Note over App,REST: ── Resource Templates ──
    App->>Client: listResourceTemplates()
    Client->>REST: GET /api/resource_templates
    REST-->>Client: [{o:id, o:label}, ...]
    Client-->>App: [{id, label}]

    App->>Client: getResourceTemplate(5)
    Client->>REST: GET /api/resource_templates/5
    REST-->>Client: {o:resource_template_property: [...]}
    Client-->>App: {id, label, properties: [{term, label, type}]}

    Note over App,REST: ── Hexagone (Item) ──
    App->>Client: saveHexItem({hexKey, templateId, properties})
    Client->>REST: POST /api/items\n{dcterms:title, dcterms:description,\ndcterms:subject: nanotube:hex,\n<terme_template>: valeur}
    REST-->>Client: 201 {o:id: 99}
    Client-->>App: item sauvegardé
```

---

## 7. Cycle de vie d'une cartographie

Machine à états depuis la création jusqu'à la sauvegarde.

```mermaid
stateDiagram-v2
    [*] --> Vide : + Carte (nouveau)

    Vide --> EnCours : Double-clic cellule\n→ nanotube aléatoire

    EnCours --> EnCours : Édition (m,n,longueur…)\nAppliquer

    EnCours --> EnCours : Clic hexagone tube\n→ propriétés / tube enfant

    EnCours --> Sauvegardée : 💾 Sauver\nPOST Omeka S

    Sauvegardée --> EnCours : Modification

    Sauvegardée --> Sauvegardée : 💾 Sauver update\nPATCH Omeka S

    Vide --> Chargée : 📂 Charger\nGET Omeka S

    Chargée --> EnCours : Modification

    EnCours --> Exportée : 📷 Exporter PNG

    Exportée --> EnCours : Continue

    EnCours --> Vide : + Carte

    note right of EnCours
        State interne :
        tubes: Map(hexKey → Nanotube)
        horizTubes: Map(faceKey → Group)
        hexFaceData: Map(faceKey → OmekaData)
    end note
```

---

## 8. Pipeline de rendu 3D — buildNanotubeGroup

Construction de la géométrie Three.js pour un nanotube.

```mermaid
flowchart TD
    INPUT["Nanotube(m, n, length, color)"]

    INPUT --> SCALE["📐 Calcul de l'échelle\ndiameter × NM_SCALE × 8\nheight = length × NM_SCALE\nnHex = max(6, m+n)"]

    SCALE --> SEGS["⬡ Segments de cylindre\nmax(12, (m+n)×2)"]

    subgraph GROUP["THREE.Group\nuserData.nanotube = référence modèle"]
        TUBE["CylinderGeometry\nMeshPhysicalMaterial\n・metalness = 0.9 si métallique\n・opacity = 0.55, DoubleSide"]

        LATTICE["LineSegments\nLattice honeycomb graphène EXACT\nZigzag : a1=(√3d,0), a2=(√3d/2,3d/2)\nProjection x→θ=x/r sur cylindre\n3 liaisons par atome A"]

        CAPTOP["SphereGeometry ½\ncapuchon haut\ny = +height/2"]

        CAPBOT["SphereGeometry ½\ncapuchon bas\ny = -height/2, rotX = π"]

        GLOW["CylinderGeometry halo\nradius × 1.3\nopacity = 0.06, BackSide"]

        FACES["buildTubeHexFaces()\nMesh[] invisibles (opacity=0)\nraycastables\nuserData.isHexFace, hexFaceIdx,\nhexFacePos, tubeHexKey"]
    end

    SEGS --> TUBE
    SEGS --> LATTICE
    SEGS --> CAPTOP
    SEGS --> CAPBOT
    SEGS --> GLOW
    SEGS --> FACES

    GROUP --> ROT["rotation.y = rotation × π/180"]
    ROT --> SCENE["→ Scene3D\nposition = (hexCenter.x, h/2, hexCenter.z)"]

    style GROUP   fill:#1e2736,stroke:#22d3ee,color:#e2e8f0
    style TUBE    fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
    style LATTICE fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style CAPTOP  fill:#1a1a2e,stroke:#818cf8,color:#818cf8
    style CAPBOT  fill:#1a1a2e,stroke:#818cf8,color:#818cf8
    style GLOW    fill:#2a1a0a,stroke:#facc15,color:#facc15
    style FACES   fill:#2a0a2a,stroke:#f87171,color:#f87171
    style INPUT   fill:#22d3ee,stroke:#22d3ee,color:#000
    style SCENE   fill:#111827,stroke:#7a8fa8,color:#e2e8f0
```

---

## 9. Coordonnées hexagonales cube — voisins et directions

Les 6 directions standard en coordonnées cube et les matrices de conversion.

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

    RULE["Règle invariante\nq + r + s = 0"]
    DIST["Distance A→B\n= (|dq|+|dr|+|ds|) / 2"]

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

## 10. Lattice carbone — projection sur cylindre

Comment le réseau honeycomb graphène 2D est enroulé sur la surface cylindrique du tube.

```mermaid
flowchart LR
    subgraph Param["Paramètres"]
        P1["nHex = max(6, m+n)\nnombre d'hex autour"]
        P2["circumference = 2π·r"]
        P3["d = circumference / (nHex·√3)\nlongueur liaison C-C scène"]
    end

    subgraph Lattice2D["Lattice 2D — orientation zigzag"]
        LA["Atomes A\n(i·a1x + j·a2x, j·a2y)"]
        LB["Atomes B = A + (0, d)"]
        BONDS["3 liaisons depuis A :\n① A → B  (haut)\n② A → B-gauche (-√3d/2, -d/2)\n③ A → B-droite (+√3d/2, -d/2)"]
    end

    subgraph Proj["Projection cylindrique"]
        THETA["θ = x / radius"]
        XYZ["(cos θ·r, y, sin θ·r)"]
    end

    subgraph GL["Rendu Three.js"]
        LS["LineSegments\nFloat32BufferAttribute"]
    end

    Param --> Lattice2D
    LA --> BONDS
    LB --> BONDS
    BONDS --> Proj
    Proj --> THETA --> XYZ --> GL

    style Param    fill:#1e2736,stroke:#22d3ee,color:#22d3ee
    style Lattice2D fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style Proj     fill:#1a1a3e,stroke:#818cf8,color:#818cf8
    style GL       fill:#0e3a40,stroke:#22d3ee,color:#22d3ee
```

---

## 11. Hexagone interactif — tube enfant

Séquence complète depuis le clic sur un hexagone du tube jusqu'au tube enfant créé.

```mermaid
sequenceDiagram
    actor User as 👤 Utilisateur
    participant Canvas as 🎬 canvas-3d
    participant Raycaster as 🎯 Raycaster
    participant Scene as scene3d.js
    participant App as app.js
    participant Panel as 📋 Panel hex
    participant Omeka as 💾 Omeka S

    User->>Canvas: Clic sur hexagone du tube

    Canvas->>Raycaster: setFromCamera(mouse)
    Raycaster->>Scene: intersectObjects(hexFaceObjects)
    Scene->>Scene: Calcule hexCenterWorld\net hexNormalWorld\nvia matrixWorld du tubeGroup

    Scene->>App: onTubeHexSelect({hexKey, hexFaceIdx,\nhexFacePos, hexCenterWorld, hexNormalWorld})

    App->>App: _computeChildTubeChirality(hexKey)\n→ d_enfant = π·d_parent/nHex\n→ n = round(π·d / a₀·√3)\n→ armchair (n,n)

    App->>Panel: Ouvre panel\nm=n=2, ⌀ inscrit≈0.246nm

    alt Template Omeka S
        User->>Panel: Choisit template, remplit champs
        Panel->>App: _saveHexToOmeka()
        App->>Omeka: listResourceTemplates()\ngetResourceTemplate(id)\nsaveHexItem(hexData)
        Omeka-->>App: Item créé (omekaId)
        App->>Panel: ✓ Sauvegardé #99
    else Tube enfant
        User->>Panel: Clique [⬡ Créer nanotube]
        Panel->>App: _spawnHorizontalTube()
        App->>App: Nanotube({m,n,length,color})
        App->>Scene: addHorizontalTube(tube,\nhexCenterWorld, hexNormalWorld, faceKey)
        Scene->>Scene: quaternion = setFromUnitVectors(Y, normal)\nposition = center + normal × halfLen\nbuildTubeHexFaces() → faces cliquables
        Scene-->>App: group (dans horizTubes)
        App->>App: horizTubesData.set(faceKey, tube)
        Note over App,Scene: Le tube enfant a ses propres hexagones\ncliquables → même séquence récursive
    end
```

---

## 12. Calcul chiralité du tube enfant

Dérivation des indices `(m, n)` du tube enfant depuis la géométrie de l'hexagone parent.

```mermaid
flowchart TD
    START(["Hexagone cliqué\nsur tube parent (m_p, n_p)"])

    START --> NHEX["nHex = max(6, m_p + n_p)"]
    NHEX  --> RADIUS["r = d_parent × NM_SCALE × 8 / 2\n(rayon visuel du tube parent)"]
    RADIUS --> DSCENE["d_liaison = 2π·r / (nHex · √3)\n(longueur C-C en unités scène)"]
    DSCENE --> INSCRIT["⌀ inscrit = √3 · d_liaison\n(diamètre du cercle inscrit\ndans l'hexagone)"]
    INSCRIT --> DNM["d_enfant (nm) = ⌀_inscrit / (NM_SCALE × 8)\n\nSimplification :\nd_enfant = π · d_parent / nHex"]
    DNM --> NARM["n_armchair = round(π · d_enfant / (a₀ · √3))\na₀ = 0.246 nm"]
    NARM --> CHILD(["Tube enfant : armchair (n,n)\navec rayon = cercle inscrit\nde l'hexagone parent"])

    EXAMPLE["Exemple :\nParent (9,0) → d=0.705 nm\nnHex=9\nd_enfant ≈ 0.246 nm\nn = round(π×0.246 / 0.246×√3) = 2\n→ Enfant armchair (2,2)"]

    CHILD -.->|"vérifié avec"| EXAMPLE

    style START  fill:#22d3ee,stroke:#22d3ee,color:#000
    style CHILD  fill:#0a2a1a,stroke:#4ade80,color:#4ade80
    style EXAMPLE fill:#1e2736,stroke:#facc15,color:#facc15
```

---

## 13. Gantt — workflow utilisateur typique

Chronologie d'une session standard sur NanoTubeStory.

```mermaid
gantt
    title Workflow utilisateur — NanoTubeStory v1.1
    dateFormat  X
    axisFormat %s

    section Configuration
    Ouvrir l'application        :done,    c1, 0, 2
    Configurer Omeka S / API    :done,    c2, 1, 3
    Choisir rayon de grille     :done,    c3, 3, 4

    section Création de tubes
    Placer nanotubes (dbl-clic) :active,  n1, 4, 8
    Éditer chiralité (m,n)      :         n2, 6, 10
    Visualiser réseau honeycomb :         n3, 4, 10

    section Hexagones interactifs
    Cliquer hexagone du tube    :         h1, 10, 11
    Choisir template Omeka S    :         h2, 11, 13
    Remplir propriétés / sauver :         h3, 12, 14
    Créer tube enfant           :         h4, 13, 15
    Explorer récursivement      :         h5, 14, 17

    section Analyse
    Lire graphiques D3          :         a1, 15, 17
    Demander analyse à l'agent  :         a2, 16, 19
    Appliquer suggestions IA    :         a3, 18, 20

    section Sauvegarde
    Saisir un titre             :         s1, 19, 20
    Sauvegarder (Omeka S)       :         s2, 20, 21
    Exporter PNG                :         s3, 20, 22
```

---

*NanoTubeStory v1.1 — Licence MIT*
