import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";

export function AdvancedOption() {
  return (
    <div className="shadow-shadowbrand rounded-2xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:bg-muted text-base font-body px-4 hover:no-underline">
            Advanced Options
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8 border-t border-border px-4 py-5">
              <div className="flex flex-col gap-3">
                <label htmlFor="cta">Call-to-Action</label>
                <Select>
                  <SelectTrigger className="w-full bg-input rounded-2xl p-4 shadow-shadowbrand">
                    <SelectValue placeholder="Select Call-to-Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link-in-bio">Link in bio</SelectItem>
                    <SelectItem value="shop-now">Shop now</SelectItem>
                    <SelectItem value="dm-me">DM me</SelectItem>
                    <SelectItem value="comment-below">Comment below</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="hashtag">Hashtag: 5</label>
                <Slider defaultValue={[5]} max={10} step={1} />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground-2">Min</p>
                  <p className="text-xs text-muted-foreground-2">Max</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="caption-length">Caption length</label>
                <Tabs defaultValue="medium" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="short">
                      <p className="text-xs">Short</p>
                    </TabsTrigger>
                    <TabsTrigger value="medium">
                      <p className="text-xs">Medium</p>
                    </TabsTrigger>
                    <TabsTrigger value="long">
                      <p className="text-xs">Long</p>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="emoji-style">Emoji Style</label>
                <Tabs defaultValue="minimal" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="none">
                      <p className="text-xs">None</p>
                    </TabsTrigger>
                    <TabsTrigger value="minimal" className="">
                      <p className="text-xs">Minimal</p>
                    </TabsTrigger>
                    <TabsTrigger value="generous">
                      <p className="text-xs">Generous</p>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
