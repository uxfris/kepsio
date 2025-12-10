import GenerateInput from "@/components/generate/generate-input";
import Image from "next/image";

export default function GeneratePage() {
  return (
    <div className="flex items-start">
      <GenerateInput />
      <div className="flex-1 min-h-screen flex items-center justify-center px-8 pb-32">
        <div className="flex flex-col items-center justify-center gap-12">
          <Image src={"/icons/logo-outline.svg"} alt={"Logo"} width={120} height={98} />
          <div className="space-y-5 text-center">
            <h2 className="text-3xl font-heading">Your content will appear here</h2>
            <p className="text-sm">Describe your content on the left, and we'll generate 5 variations in your voice</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl shadow-shadowbrand p-3">
            <Image src={"/icons/bulb.svg"} alt={"Idea"} width={20} height={20} />
            <p className="text-sm">Pro tip: The more context you add, the better your captions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
