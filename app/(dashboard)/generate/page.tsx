"use client"

import { GeneratorSidebar, GeneratorInitialState, GeneratorLoadingState, GeneratorResultState } from "@/components/features/generator";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useEffect, useState } from "react";
import { GeneratorForm } from "./types";

/**
 * Generator page component.
 * Main page for the caption generation feature with sidebar and content area.
 * Displays different states: initial, loading, or results.
 */

type GeneratorState = "initial" | "loading" | "result"

export default function GeneratePage() {
  const [state, setState] = useState<GeneratorState>("initial")
  const [progress, setProgress] = useState(0);
  const [captions, setCaptions] = useState<string[]>([])

  // Simulate progress when loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === "loading") {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 10, 100));
      }, 300);
    } else {
      setProgress(0); // reset progress if not loading
    }

    return () => clearInterval(interval);
  }, [state]);

  async function handleSubmit(form: GeneratorForm) {
    setState("loading")

    try {
      const response = await api.post(API_ROUTES.generate.base, form)
      console.log(`Response`, response);
      setState("result")
    } catch (error) {
      console.log("Error generating captions:", error);
      setState("initial")
    }
  }


  return (
    <div className="flex items-start h-[calc(100vh-52px)]">
      <GeneratorSidebar onSubmit={handleSubmit} isLoading={state === "loading"} />
      <main className="flex-1 h-[calc(100vh-52px)] overflow-hidden flex items-center justify-center px-8 ">
        {state === "initial" && <GeneratorInitialState />}
        {state === "loading" && <GeneratorLoadingState progress={progress} />}
        {state === "result" && <GeneratorResultState />}
      </main>
    </div>
  );
}
