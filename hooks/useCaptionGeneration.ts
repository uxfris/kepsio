import { CaptionState, ContextData, CaptionOptions } from "../types";

// Helper function to optimize and convert image to base64
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 1024x1024 to reduce tokens
        const MAX_SIZE = 1024;
        let width = img.width;
        let height = img.height;

        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = (height / width) * MAX_SIZE;
            width = MAX_SIZE;
          } else {
            width = (width / height) * MAX_SIZE;
            height = MAX_SIZE;
          }
        }

        // Create canvas and resize
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with 85% quality for optimal size/quality balance
        const base64String = canvas.toDataURL('image/jpeg', 0.85);
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

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
    // Phase 1: Analyzing content
    onPhaseUpdate?.("analyzing");

    try {
      // Convert image to base64 if present
      let imageBase64 = null;
      if (contextData.uploadedImage) {
        imageBase64 = await convertImageToBase64(contextData.uploadedImage);
      }

      // Call the API to generate captions
      const response = await fetch("/api/captions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentInput,
          contextData: {
            ...contextData,
            imageBase64, // Add base64 image data
            uploadedImage: contextData.uploadedImage
              ? { name: contextData.uploadedImage.name }
              : null, // Only send filename
          },
          selectedContextItems,
          options,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to generate captions");
      }

      // Phase 2: Finding hooks (simulate with delay for UX)
      onPhaseUpdate?.("hooking");
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Phase 3: Matching brand voice
      onPhaseUpdate?.("matching");

      const data = await response.json();

      if (!data.success || !data.captions) {
        throw new Error("Invalid response from server");
      }

      // Complete
      onPhaseUpdate?.("complete");

      return data.captions;
    } catch (error) {
      console.error("Caption generation error:", error);
      throw error;
    }
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
