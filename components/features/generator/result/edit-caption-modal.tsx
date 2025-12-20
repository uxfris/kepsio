"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { EditIcon } from "@/components/icons/edit-icon"
import { SaveIcon } from "@/components/icons/save-icon"
import { cn } from "@/lib/utils"

interface EditCaptionModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    initialCaption: string
    onSave: (newCaption: string) => void
}

export function EditCaptionModal({
    isOpen,
    onOpenChange,
    initialCaption,
    onSave
}: EditCaptionModalProps) {
    const [caption, setCaption] = useState(initialCaption)

    useEffect(() => {
        setCaption(initialCaption)
    }, [initialCaption])

    const handleSave = () => {
        onSave(caption)
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[749px] p-8 gap-6 rounded-[24px]">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <div className="size-6 text-foreground">
                            <EditIcon />
                        </div>
                        <DialogTitle className="text-base font-normal">Edit Caption</DialogTitle>
                    </div>
                    {/* Close button is handled by DialogPrimitive.Close in DialogContent */}
                </DialogHeader>

                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-medium">Content Input</label>
                    <div className="relative">
                        <Textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="min-h-[178px] resize-none bg-secondary/50 border-0 focus-visible:ring-0 text-base"
                            placeholder="Type functionality..."
                        />
                    </div>
                </div>

                <div className="flex justify-center pt-2">
                    <Button
                        onClick={handleSave}
                        className="w-[265px] h-12 rounded-full text-base font-medium"
                    >
                        <SaveIcon className="mr-2" />
                        Save changes
                        <span className="ml-4 flex items-center gap-1 text-xs opacity-70 bg-white/20 px-2 py-0.5 rounded">
                            <span>⌘</span><span>S</span>
                        </span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
