import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Platform selection tabs for choosing the target social media platform.
 * Allows users to choose between Instagram, X (Twitter), and LinkedIn.
 * 
 * @example
 * ```tsx
 * <GeneratorPlatformSelector />
 * ```
 */
export function GeneratorPlatformSelector({ className, value, onChange, isWithTitle, isWithLabel }: { className?: string, value: "instagram" | "x" | "linkedin", onChange: (val: "instagram" | "x" | "linkedin") => void, isWithTitle?: boolean, isWithLabel?: boolean }) {
    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {isWithTitle && <label htmlFor="platform">Platform</label>}
            <Tabs defaultValue="instagram" value={value} onValueChange={(val) => onChange(val as any)} className="w-full">
                <TabsList className="w-full h-[52px] space-x-1">
                    <TabsTrigger value="instagram" className="data-[state=active]:text-foreground text-secondary-foreground">
                        <InstagramIcon className="size-5 fill-current" />
                        {isWithLabel && <p className="text-sm">Instagram</p>}
                    </TabsTrigger>
                    <TabsTrigger value="x" className="data-[state=active]:text-foreground text-secondary-foreground">
                        <XIcon className="size-5 stroke-current" />
                        {isWithLabel && <p className="text-sm">Twitter/X</p>}
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="data-[state=active]:text-foreground text-secondary-foreground">
                        <LinkedInIcon className="size-5 fill-current" />
                        {isWithLabel && <p className="text-sm">LinkedIn</p>}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
