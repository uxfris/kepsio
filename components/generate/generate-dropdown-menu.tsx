"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { generateDropdownMenuContent } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useDropdownMenuStore } from "@/store/userDropdownMenuStore"
import Image from "next/image"

export function GenerateDropdownMenuContent() {
    const { isProductLinkOpen, isUploadImageOpen, toggleProductLink, toggleUploadImage } = useDropdownMenuStore();
    const menuStateMap: Record<string, { isOpen: boolean; toggle: () => void }> = {
        productLink: { isOpen: isProductLinkOpen, toggle: toggleProductLink },
        uploadImage: { isOpen: isUploadImageOpen, toggle: toggleUploadImage },
    }
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
            <DropdownMenuContent className="w-56 rounded-2xl shadow-lg p-2" align="start">
                {generateDropdownMenuContent.map(({ id, icon, alt, title }) => {
                    const state = menuStateMap[id]
                    return (
                        <DropdownMenuItem onClick={() => state.toggle()} key={id} className={cn("rounded-lg mb-1", state.isOpen && "bg-sidebar-primary")}>
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
                                {state.isOpen && <Image
                                    src={"/icons/check.svg"}
                                    alt={"Check"}
                                    width={24}
                                    height={24}
                                />}
                            </div>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
