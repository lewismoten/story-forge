import { safeSlug } from "../helpers/safeSlug.mjs";
import { nowIso } from "../helpers/nowISO.mjs";
import { MODEL } from "../config/MODEL.mjs";

export const defaultPersonaSpec = name => {
  const slug = safeSlug(name);
  
  const presets = {
    "present-prophet": {
      role: "Speculative near-present forecaster",
      style: "Grounded, plausibly-tomorrow, tight scenes, subtle dread/hope balance",
      timeline_bias: "Treat future stories as 'leaked possibilities' and infer predictions from canon.",
    },
    "near-future-storyteller": {
      role: "Futuristic storyteller (living in the moment)",
      style: "Immediate sensory detail, character-forward, 1-2 sharp images, a twist",
      timeline_bias: "Advance the timeline; add concrete events that become canon.",
    },
    "far-future-historian": {
      role: "Far-future historian / explainer",
      style: "Mythic, analytical, summarizes eras, explains causes, avoids small daily detail",
      timeline_bias: "Reference canon as settled history; connect dots, explain why it happened.",
    },
  };

  const preset = presets[slug] || {
    role: "Storyteller",
    style: "Clear, vivid, character-driven",
    timelineBias: "Build consistently on canon; introduce at most 1 new major concept per story.",
  };

  return {
    name,
    created_at: nowIso(),
    model: MODEL,
    previous_response_id: null,
    memory_summaries: [],
    instructions: {
      ...preset,
      hard_rules: [
        `Story will appear on a blog with multiple authors`,
        "Use shared canon when possible; don't contradict established facts.",
        "If you introduce something new, make it clearly compatible with existing canon.",
      ],
    },
    crossPersona: {
      enabled: true,
      borrowStrength: "medium", // low | medium | high
    },
  };
}