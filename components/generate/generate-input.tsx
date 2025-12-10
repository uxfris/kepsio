import { Button } from "../ui/button";
import { AdvancedOption } from "./generate-advanced-option";
import { ContentInput } from "./generate-content-input";
import { PlatformInput } from "./generate-platform-input";
import { Kbd } from "../ui/kbd";
import { SettingAdjustIcon, SparkleFilledIcon } from "../icons";

export default function GenerateInput() {
  return (
    <aside className="h-[calc(100vh-52px)] w-[440px] overflow-y-auto p-8 border-r border-border">
      <div className="relative pb-36">
        <PlatformInput />
        <ContentInput />
        <AdvancedOption />
      </div>
      <div className="fixed bottom-0 left-0 w-[440px] border-r border-t border-border bg-background px-16 py-5">
        <div className="lex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Button
              variant="outline"
              size="icon-lg"
              className="border-primary rounded-2xl h-12 w-12"
            >
              <SettingAdjustIcon className="size-12 p-3" />
              {/* <Image
                src={"/icons/setting-adjust.svg"}
                alt={"Setting"}
                width={48}
                height={48}
                className="p-3"
              /> */}
            </Button>
            <Button className="w-full rounded-2xl h-12 text-base" size="lg">
              <SparkleFilledIcon className="size-6" />
              Generate Captions
              <div className="flex items-center gap-1 ml-2">
                <Kbd>⌘</Kbd>
                <Kbd>Enter</Kbd>
              </div>
            </Button>
          </div>
          <p className="text-center text-xs">
            <span className="text-primary">10/10</span> free generation left
          </p>
        </div>
      </div>
    </aside>
  );
}
