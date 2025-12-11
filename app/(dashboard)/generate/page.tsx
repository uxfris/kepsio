"use client"

import { InitialState } from "@/components/generate/generate-initial-state";
import { GenerateInput } from "@/components/generate/generate-input";
import { LoadingState } from "@/components/generate/generate-loading-state";
import { useEffect, useState } from "react";

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
      <GenerateInput />
      <main className="flex-1 h-[calc(100vh-52px)] overflow-hidden flex items-center justify-center px-8 ">
        {/* <InitialState /> */}
        <LoadingState progress={progress} />
      </main>
    </div>
  );
}
