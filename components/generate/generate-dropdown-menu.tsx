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
import { AddIcon, CheckIcon } from "../icons"
import { useDropdownMenuState } from "@/hooks"

/**
 * Dropdown menu component for adding optional content to the generate form.
 * Allows users to add product links or upload images to their content.
 */
export function GenerateDropdownMenuContent() {
    const menuStateMap = useDropdownMenuState(generateDropdownMenuContent);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full [&[data-state=open]>svg]:rotate-45">
                    <AddIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl shadow-lg p-2" align="start">
                {generateDropdownMenuContent.map(({ id, icon: IconComponent, title }) => {
                    const state = menuStateMap[id]
                    return (
                        <DropdownMenuItem onClick={() => state.toggle()} key={id} className={cn("rounded-lg mb-1", state.isOpen && "bg-sidebar-primary")}>
                            <div className="flex items-center w-full">
                                <div className="flex-1 flex items-center gap-2">
                                    <IconComponent className="size-5" />
                                    {title}
                                </div>
                                {state.isOpen && <CheckIcon className="size-6" />}
                            </div>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
