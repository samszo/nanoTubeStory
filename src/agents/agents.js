/**
 * Agent NanoTube — workflow d'analyse et génération de configurations
 * Implémenté avec l'Anthropic SDK directement (browser-compatible)
 * Architecture inspirée de Mastra : tools définis séparément, exécutés par l'agent
 */
import Anthropic from '@anthropic-ai/sdk';

// ── Définitions des tools (style Mastra) ──────────────────────────────

const TOOLS = [
  {
    name: 'analyze_nanotube_config',
    description: 'Analyse une configuration de nanotubes sur une grille hexagonale et retourne ses propriétés physiques globales',
    input_schema: {
      type: 'object',
      properties: {
        tubes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              m: { type: 'number' }, n: { type: 'number' },
              type: { type: 'string' }, diameter: { type: 'number' },
              conductivity: { type: 'string' }, length: { type: 'number' },
            },
          },
        },
      },
      required: ['tubes'],
    },
  },
  {
    name: 'suggest_nanotube',
    description: 'Suggère des paramètres de chiralité (m,n) pour un nanotube selon les propriétés souhaitées',
    input_schema: {
      type: 'object',
      properties: {
        desired_property: {
          type: 'string',
          enum: ['metallic', 'semiconductor', 'high-strength', 'small-diameter', 'large-diameter'],
        },
        position_context: { type: 'string', description: 'Description de la position sur la grille' },
      },
      required: ['desired_property'],
    },
  },
  {
    name: 'generate_configuration',
    description: 'Génère une configuration optimale de nanotubes pour remplir une grille hexagonale',
    input_schema: {
      type: 'object',
      properties: {
        grid_radius: { type: 'number', description: 'Rayon de la grille en hexagones' },
        optimization_goal: {
          type: 'string',
          enum: ['max-conductivity', 'max-semiconductor', 'mixed', 'uniform-diameter'],
        },
      },
      required: ['grid_radius', 'optimization_goal'],
    },
  },
];

// ── Exécuteurs des tools ──────────────────────────────────────────────

function executeTool(name, input) {
  switch (name) {
    case 'analyze_nanotube_config': {
      const { tubes = [] } = input;
      const metallic = tubes.filter(t => t.conductivity === 'Métallique').length;
      const byType = tubes.reduce((a, t) => { a[t.type] = (a[t.type] || 0) + 1; return a; }, {});
      const avgD = tubes.reduce((s, t) => s + (t.diameter || 0), 0) / Math.max(1, tubes.length);
      return {
        totalTubes: tubes.length,
        metallicCount: metallic,
        semiconductorCount: tubes.length - metallic,
        avgDiameter: avgD.toFixed(3) + ' nm',
        typeDistribution: byType,
        dominantType: Object.entries(byType).sort((a,b) => b[1]-a[1])[0]?.[0] || 'aucun',
      };
    }
    case 'suggest_nanotube': {
      const map = {
        metallic:       { m: 5,  n: 5,  rationale: 'Armchair (5,5) — conductivité métallique parfaite' },
        semiconductor:  { m: 6,  n: 2,  rationale: 'Chiral (6,2) — semi-conducteur avec Eg≈0.5eV' },
        'high-strength':{ m: 10, n: 10, rationale: 'Armchair (10,10) — grand diamètre, haute résistance mécanique' },
        'small-diameter':{ m: 4, n: 0,  rationale: 'Zigzag (4,0) — diamètre ~0.31nm, le plus petit SWNT stable' },
        'large-diameter':{ m: 15,n: 15, rationale: 'Armchair (15,15) — grand diamètre ~2nm' },
      };
      return map[input.desired_property] || map.metallic;
    }
    case 'generate_configuration': {
      const configs = {
        'max-conductivity': [
          { m:5,n:5 }, { m:10,n:10 }, { m:7,n:7 }, { m:5,n:5 }, { m:9,n:9 },
        ],
        'max-semiconductor': [
          { m:6,n:2 }, { m:8,n:3 }, { m:7,n:0 }, { m:9,n:3 }, { m:6,n:2 },
        ],
        mixed: [
          { m:5,n:5 }, { m:6,n:2 }, { m:7,n:0 }, { m:10,n:10 }, { m:8,n:3 },
        ],
        'uniform-diameter': [
          { m:6,n:6 }, { m:6,n:6 }, { m:6,n:6 }, { m:6,n:6 }, { m:6,n:6 },
        ],
      };
      return {
        suggestedTubes: configs[input.optimization_goal] || configs.mixed,
        gridRadius: input.grid_radius,
        strategy: input.optimization_goal,
      };
    }
    default: return { error: `Tool inconnu: ${name}` };
  }
}

// ── Agent principal ──────────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es un expert en nanotubes de carbone (CNT) et en physique des matériaux nano.
Tu aides à analyser, optimiser et générer des configurations de nanotubes sur des grilles hexagonales.

Physique des nanotubes que tu maîtrises parfaitement :
- Chiralité (m,n) : armchair si m=n (métallique), zigzag si n=0 (semi-cond.), chiral sinon
- Diamètre : d = (a₀/π)×√(m²+mn+n²) avec a₀ = 0.246 nm
- Conductivité électrique : métallique si (m-n) mod 3 = 0, semi-conducteur sinon
- Band gap : Eg ≈ 0.9/d eV pour les semi-conducteurs (0 pour métalliques)
- SWNT typiques : d entre 0.44 nm et 6 nm

Coordonnées hexagonales : cube (q,r,s) avec q+r+s=0, axial (q,r), distances et voisins standards.

Réponds en français, de façon concise et scientifiquement précise.
Utilise les tools disponibles quand c'est pertinent.`;

export async function streamAgentResponse(apiKey, userMessage, onDelta, onTool) {
  if (!apiKey) throw new Error('Clé API Anthropic non configurée. Allez dans ⚙ Paramètres.');

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  const messages = [{ role: 'user', content: userMessage }];

  // Boucle agentic : max 3 tours pour tool use
  for (let turn = 0; turn < 3; turn++) {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      tool_choice: { type: 'auto' },
      messages,
    });

    let assistantContent = [];
    let currentText = '';
    let toolUses = [];

    for await (const event of stream) {
      if (event.type === 'content_block_start') {
        if (event.content_block.type === 'text') {
          currentText = '';
        } else if (event.content_block.type === 'tool_use') {
          toolUses.push({ id: event.content_block.id, name: event.content_block.name, input: '' });
        }
      } else if (event.type === 'content_block_delta') {
        if (event.delta.type === 'text_delta') {
          currentText += event.delta.text;
          onDelta?.(event.delta.text);
        } else if (event.delta.type === 'input_json_delta') {
          if (toolUses.length > 0) toolUses[toolUses.length - 1].input += event.delta.partial_json;
        }
      } else if (event.type === 'content_block_stop') {
        if (currentText) {
          assistantContent.push({ type: 'text', text: currentText });
          currentText = '';
        }
      } else if (event.type === 'message_delta') {
        if (event.delta.stop_reason === 'end_turn') {
          // Fin normale
          toolUses.forEach(tu => {
            if (tu.input) {
              try { tu.input = JSON.parse(tu.input); } catch { tu.input = {}; }
              assistantContent.push({ type: 'tool_use', id: tu.id, name: tu.name, input: tu.input });
            }
          });
          messages.push({ role: 'assistant', content: assistantContent });
          return; // Terminé
        }
        if (event.delta.stop_reason === 'tool_use') {
          toolUses.forEach(tu => {
            if (tu.input) {
              try { tu.input = JSON.parse(tu.input); } catch { tu.input = {}; }
              assistantContent.push({ type: 'tool_use', id: tu.id, name: tu.name, input: tu.input });
            }
          });
          messages.push({ role: 'assistant', content: assistantContent });

          // Exécuter les tools
          const toolResults = toolUses.map(tu => {
            const result = executeTool(tu.name, tu.input);
            onTool?.(tu.name, tu.input, result);
            return {
              type: 'tool_result',
              tool_use_id: tu.id,
              content: JSON.stringify(result),
            };
          });
          messages.push({ role: 'user', content: toolResults });
          assistantContent = [];
          toolUses = [];
          // Continuer la boucle pour la réponse post-tool
        }
      }
    }
  }
}

/** Expose les tools pour affichage dans l'UI */
export { TOOLS, executeTool };
