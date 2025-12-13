import { Button } from "@/components/ui/button";
import { Sparkle2Icon } from "@/components/icons/sparkle-2-icon";
import { Badge } from "@/components/ui/badge";
import { StormIcon } from "@/components/icons/storm-icon";
import { ShortIcon } from "@/components/icons/short-icon";
import { CaseIcon } from "@/components/icons/case-icon";
import { SmileIcon } from "@/components/icons/smile-icon";

const VARIATION_OPTIONS = [
    {
        icon: <Sparkle2Icon />,
        text: "More Playful"
    },
    {
        icon: <StormIcon />,
        text: "Add urgency"
    },
    {
        icon: <ShortIcon />,
        text: "Shorter"
    },
    {
        icon: <CaseIcon />,
        text: "More Professional"
    },
    {
        icon: <SmileIcon />,
        text: "More casual"
    },
] as const;

interface GeneratorDifferentOptionProps {
    onOptionSelect: (option: string) => void;
}

/**
 * Component displaying alternative caption generation options.
 * Allows users to request different variations of captions with different tones and styles.
 * 
 * @example
 * ```tsx
 * <GeneratorDifferentOption onOptionSelect={(opt) => console.log(opt)} />
 * ```
 */
export function GeneratorDifferentOption({ onOptionSelect }: GeneratorDifferentOptionProps) {
    return (
        <div className="flex flex-col p-5 gap-5 bg-card rounded-2xl shadow-shadowbrand">
            <p className="text-sm">Need different options? Try:</p>
            <div className="flex items-center gap-3">
                {VARIATION_OPTIONS.map((option) => (
                    <Button
                        key={option.text}
                        variant="secondary"
                        className="rounded-full text-foreground gap-1 text-sm font-normal"
                        onClick={() => onOptionSelect(option.text)}
                    >
                        {option.icon}
                        {option.text}
                    </Button>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">Free Plan</Badge>
                    <p className="text-sm">5 variations per generation</p>
                </div>
                <Button variant="outline" size="sm" className="font-normal">Upgrade for 10</Button>
            </div>
        </div>
    )
}
