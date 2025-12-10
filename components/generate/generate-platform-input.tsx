import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function PlatformInput() {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <label htmlFor="platform">Platform</label>
      <Tabs defaultValue="instagram" className="w-full">
        <TabsList className="w-full h-[52px]">
          <TabsTrigger value="instagram">
            <Image
              width={20}
              height={20}
              src={"/icons/instagram.svg"}
              alt={"Instagram"}
            />
          </TabsTrigger>
          <TabsTrigger value="x">
            <Image
              width={20}
              height={20}
              src={"/icons/x.svg"}
              alt={"Twitter/X"}
            />
          </TabsTrigger>
          <TabsTrigger value="linkedin">
            <Image
              width={20}
              height={20}
              src={"/icons/linkedin.svg"}
              alt={"LinkedIn"}
            />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
