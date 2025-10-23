import { useState, useRef, useEffect } from "react";
import {
  CaptionInputState,
  ContextData,
  CaptionGenerationOptions,
} from "../types";

export const useCaptionInput = () => {
  const [state, setState] = useState<CaptionInputState>({
    contentInput: "",
    isAdvancedOpen: false,
    showError: false,
    isGenerating: false,
    generatedCaptions: [],
    copiedIndex: null,
    showContextMenu: false,
    selectedContextItems: [],
  });

  const [contextData, setContextData] = useState<ContextData>({
    productLink: "",
    uploadedImage: null,
    imagePreview: null,
    selectedPreviousPost: "",
  });

  const [options, setOptions] = useState<CaptionGenerationOptions>({
    ctaType: "link-in-bio",
    hashtagCount: 5,
    captionLength: "medium",
    emojiStyle: "minimal",
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node) &&
        plusButtonRef.current &&
        !plusButtonRef.current.contains(event.target as Node)
      ) {
        setState((prev) => ({ ...prev, showContextMenu: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateState = (updates: Partial<CaptionInputState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const updateContextData = (updates: Partial<ContextData>) => {
    setContextData((prev) => ({ ...prev, ...updates }));
  };

  const updateOptions = (updates: Partial<CaptionGenerationOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  };

  return {
    state,
    contextData,
    options,
    contextMenuRef,
    plusButtonRef,
    updateState,
    updateContextData,
    updateOptions,
  };
};
