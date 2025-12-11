"use client"

import { GeneratorSidebar, GeneratorInitialState, GeneratorLoadingState, GeneratorResultState } from "@/components/features/generator";
import { useEffect, useState } from "react";

/**
 * Generator page component.
 * Main page for the caption generation feature with sidebar and content area.
 * Displays different states: initial, loading, or results.
 */
export default function GeneratePage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a real process
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 5, 100));
    }, 300);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex items-start h-[calc(100vh-52px)]">
      <GeneratorSidebar />
      <main className="flex-1 h-[calc(100vh-52px)] overflow-hidden flex items-center justify-center px-8 ">
        {/* <GeneratorInitialState /> */}
        {/* <GeneratorLoadingState progress={progress} /> */}
        <GeneratorResultState />
      </main>
    </div>
  );
}
