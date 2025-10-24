import { CaptionState, ContextData, CaptionOptions } from "../types";

export const useCaptionGeneration = () => {
  const generateCaptions = async (
    contentInput: string,
    contextData: ContextData,
    selectedContextItems: string[],
    options: CaptionOptions
  ): Promise<string[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    // Mock generated captions with context
    const baseContent = contentInput.slice(0, 50);
    const contextText =
      contextInfo.length > 0 ? `\n\nContext: ${contextInfo.join(", ")}` : "";

    const mockCaptions = [
      `🚀 Excited to share this new chapter! ${baseContent}... What do you think? #innovation #growth${contextText}`,
      `Just launched something I've been working on! ${contentInput.slice(
        0,
        40
      )}... Can't wait to hear your thoughts! 💫${contextText}`,
      `Behind the scenes: ${contentInput.slice(
        0,
        60
      )}... The journey has been incredible! 🌟 #behindthescenes${contextText}`,
      `New project alert! ${contentInput.slice(
        0,
        45
      )}... This is just the beginning! ✨ #newbeginnings${contextText}`,
      `Sharing something special today: ${contentInput.slice(
        0,
        55
      )}... What's your take? 🤔 #community${contextText}`,
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
