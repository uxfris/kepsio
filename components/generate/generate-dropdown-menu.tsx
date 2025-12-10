import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function GenerateDropdownMenuContent() {
    const menu = [
        {
            id: 1,
            icon: "/icons/link.svg",
            alt: "Link",
            title: "Add product link",
        },
        {
            id: 2,
            icon: "/icons/image.svg",
            alt: "image",
            title: "Upload image",
        }
    ];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full [&[data-state=open]>img]:rotate-45">
                    <Image
                        src={"/icons/add.svg"}
                        alt={"Add Icon"}
                        width={16}
                        height={16}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl shadow-lg p-4" align="start">
                {menu.map(({ id, icon, alt, title }) => (
                    <DropdownMenuItem key={id} className="bg-sidebar-primary rounded-lg mb-1">
                        <div className="flex items-center w-full">
                            <div className="flex-1 flex items-center gap-2">
                                <Image
                                    src={icon}
                                    alt={alt}
                                    width={20}
                                    height={20}
                                />
                                {title}
                            </div>
                            <Image
                                src={"/icons/check.svg"}
                                alt={"Check"}
                                width={24}
                                height={24}
                            />
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
