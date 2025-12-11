import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons";

/**
 * Platform selection tabs for choosing the target social media platform.
 * Allows users to choose between Instagram, X (Twitter), and LinkedIn.
 * 
 * @example
 * ```tsx
 * <GeneratorPlatformSelector />
 * ```
 */
export function GeneratorPlatformSelector({ value, onChange }: { value: "instagram" | "x" | "linkedin", onChange: (val: "instagram" | "x" | "linkedin") => void }) {
    return (
        <div className="flex flex-col gap-3 mb-8">
            <label htmlFor="platform">Platform</label>
            <Tabs defaultValue="instagram" value={value} onValueChange={(val) => onChange(val as any)} className="w-full">
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
