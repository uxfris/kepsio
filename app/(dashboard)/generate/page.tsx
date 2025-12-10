import { InitialState } from "@/components/generate/generate-initial-state";
import { GenerateInput } from "@/components/generate/generate-input";

export default function GeneratePage() {
  return (
    <div className="flex items-start h-[calc(100vh-52px)]">
      <GenerateInput />
      <main className="flex-1 h-[calc(100vh-52px)] overflow-hidden flex items-center justify-center px-8 ">
        <InitialState />
      </main>
    </div>
  );
}
