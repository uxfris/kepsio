import { useState } from "react";

interface CaptionGenerationRequest {
  content: string;
  context?: string;
  voiceProfile?: string;
}

interface CaptionGenerationResponse {
  caption: string;
  success: boolean;
  error?: string;
}

export function useCaptionGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCaption = async (
    request: CaptionGenerationRequest
  ): Promise<CaptionGenerationResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/captions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate caption");
      }

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return { caption: "", success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateCaption,
    isLoading,
    error,
  };
}
