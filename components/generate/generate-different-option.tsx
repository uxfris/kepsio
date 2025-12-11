import { Button } from "../ui/button";
import { Sparkle2Icon } from "../icons/sparkle-2-icon";
import { Badge } from "../ui/badge";

export function DifferentOption() {
    const options = [
        {
            icon: <Sparkle2Icon />,
            text: "More Playful"
        },
        {
            icon: <Sparkle2Icon />,
            text: "Add urgency"
        },
        {
            icon: <Sparkle2Icon />,
            text: "Shorter"
        },
        {
            icon: <Sparkle2Icon />,
            text: "More Professional"
        },
        {
            icon: <Sparkle2Icon />,
            text: "More casual"
        },
    ];
    return (
        <div className="flex flex-col p-5 gap-5 bg-card rounded-2xl shadow-shadowbrand">
            <p className="text-sm">Need different options? Try:</p>
            <div className="flex items-center gap-3">
                {options.map((option) => (
                    <Button key={option.text} variant="secondary" className="rounded-full text-foreground gap-0 text-sm font-normal">
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
                <Button variant="outline" size="sm">Upgrade for 10</Button>
            </div>
        </div>
    )
}