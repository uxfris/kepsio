import { Button } from "../ui/button";
import { Sparkle2Icon } from "../icons/sparkle-2-icon";
import { Badge } from "../ui/badge";
import { StormIcon } from "../icons/storm-icon";
import { ShortIcon } from "../icons/short-icon";
import { CaseIcon } from "../icons/case-icon";
import { SmileIcon } from "../icons/smile-icon";

export function DifferentOption() {
    const options = [
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
    ];
    return (
        <div className="flex flex-col p-5 gap-5 bg-card rounded-2xl shadow-shadowbrand">
            <p className="text-sm">Need different options? Try:</p>
            <div className="flex items-center gap-3">
                {options.map((option) => (
                    <Button key={option.text} variant="secondary" className="rounded-full text-foreground gap-1 text-sm font-normal">
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