import { CaptionState, ContextData, CaptionOptions } from "../types";

export const useCaptionGeneration = () => {
  const generateCaptions = async (
    contentInput: string,
    contextData: ContextData,
    selectedContextItems: string[],
    options: CaptionOptions,
    onPhaseUpdate?: (
      phase: "analyzing" | "hooking" | "matching" | "complete"
    ) => void
  ): Promise<string[]> => {
    // Phase 1: Analyzing content (1-2s)
    onPhaseUpdate?.("analyzing");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Phase 2: Finding hooks (2-3s)
    onPhaseUpdate?.("hooking");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Phase 3: Matching brand voice (3-4s)
    onPhaseUpdate?.("matching");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Complete
    onPhaseUpdate?.("complete");

    // Build context information
    const contextInfo = [];
    if (
      selectedContextItems.includes("product-link") &&
      contextData.productLink
    ) {
      contextInfo.push(`Product link: ${contextData.productLink}`);
    }
    if (
      selectedContextItems.includes("upload-image") &&
      contextData.uploadedImage
    ) {
      contextInfo.push(`Image: ${contextData.uploadedImage.name}`);
    }
    if (
      selectedContextItems.includes("previous-post") &&
      contextData.selectedPreviousPost
    ) {
      contextInfo.push(`Related to: ${contextData.selectedPreviousPost}`);
    }

    // Generate CTA text based on options
    const generateCTA = () => {
      if (options.cta === "none") return "";
      if (options.cta === "custom" && options.customCta) {
        return `\n\n${options.customCta}`;
      }

      const ctaMap: Record<string, string> = {
        "link-in-bio": "Link in bio 🔗",
        "shop-now": "Shop now 🛍️",
        "dm-me": "DM me for more info 💬",
        "comment-below": "Comment below 👇",
      };

      return options.cta in ctaMap ? `\n\n${ctaMap[options.cta]}` : "";
    };

    const ctaText = generateCTA();

    // Mock generated captions with context
    const baseContent = contentInput.slice(0, 50);
    const contextText =
      contextInfo.length > 0 ? `\n\nContext: ${contextInfo.join(", ")}` : "";

    const mockCaptions = [
      `🚀 Excited to share this new chapter! ${baseContent}... What do you think? #innovation #growth${ctaText}${contextText}`,
      `Just launched something I've been working on! ${contentInput.slice(
        0,
        40
      )}... Can't wait to hear your thoughts! 💫${ctaText}${contextText}`,
      `Behind the scenes: ${contentInput.slice(
        0,
        60
      )}... The journey has been incredible! 🌟 #behindthescenes${ctaText}${contextText}`,
      `New project alert! ${contentInput.slice(
        0,
        45
      )}... This is just the beginning! ✨ #newbeginnings${ctaText}${contextText}`,
      `Sharing something special today: ${contentInput.slice(
        0,
        55
      )}... What's your take? 🤔 #community${ctaText}${contextText}`,
    ];

    return mockCaptions;
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  };

  return {
    generateCaptions,
    copyToClipboard,
  };
};
