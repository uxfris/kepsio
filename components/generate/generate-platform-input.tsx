import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { InstagramIcon } from "../icons/instagram-icon";
import { XIcon } from "../icons/x-icon";
import { LinkedInIcon } from "../icons/linkedin-icon";

export function PlatformInput() {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <label htmlFor="platform">Platform</label>
      <Tabs defaultValue="instagram" className="w-full">
        <TabsList className="w-full h-[52px]">
          <TabsTrigger value="instagram" className="data-[state=active]:text-foreground text-secondary-foreground">
            <InstagramIcon className="size-5 fill-current" />
          </TabsTrigger>
          <TabsTrigger value="x" className="data-[state=active]:text-foreground text-secondary-foreground">
            <XIcon className="size-5 stroke-current" />
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="data-[state=active]:text-foreground text-secondary-foreground">
            <LinkedInIcon className="size-5 fill-current" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
