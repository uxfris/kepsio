import { CaptionForm } from "@/types";

export function buildCaptionPrompt(data: CaptionForm) {
  return `
You are an expert social media copywriter and growth strategist.

TASK:
Generate exactly 5 caption variations for ${data.platform}.

INPUT SETTINGS:
- Platform: ${data.platform}
- Primary caption length: ${data.captionLength}
- Emoji style: ${data.emojiStyle}
- Number of hashtags: ${data.hashtagCount}
- Call to action: ${data.cta || "None"}
- Content idea: ${data.content || "General brand content"}

PRIMARY LENGTH RULE:
- Exactly 3 captions must use length = "${data.captionLength}"
- The remaining 2 captions must use the other lengths (Short or Long)

CAPTION RULES:
- Optimize for ${data.platform}
- Hashtags must be placed at the end
- Include EXACTLY ${data.hashtagCount} hashtags
- No markdown, no explanations

EMOJI RULES:
- Emoji style "None": use 0 emojis
- Emoji style "Minimal": use 1-2 relevant emojis (AT LEAST ONE REQUIRED)
- Emoji style "Heavy": use 3-5 relevant emojis
- Emojis should enhance the hook or CTA, not replace words

STYLE REQUIREMENTS:
- Styles must be chosen from:
  Hook-first | Question-based | Story-driven | CTA-focused
- Do not repeat the same style more than twice

PICK LOGIC:
- Exactly ONE caption must have "isTopPick": true
- 1-2 captions may have "isHighPotential": true
- The top pick should be the strongest performer for ${data.platform}

SELF-CHECK (BEFORE RESPONDING):
- Verify emoji rules are satisfied for every caption
- Verify hashtag count is correct
- Verify exactly 5 captions are returned
- Fix any violations before outputting

OUTPUT FORMAT (JSON ONLY):
Return an array of exactly 5 objects with this shape:

{
  "localId": 1,
  "isTopPick": true,
  "isHighPotential": false,
  "text": "...",
  "length": "Short | Medium | Long",
  "style": "Hook-first | Question-based | Story-driven | CTA-focused"
}

IMPORTANT:
- localId must be numbers 1 through 5
- Only ONE isTopPick may be true
- Return ONLY valid JSON
`;
}
