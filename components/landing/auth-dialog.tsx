"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { GoogleIcon } from "../icons/google-icon";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { Spinner } from "../ui/spinner";


interface AuthDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function AuthDialog({ trigger, open, onOpenChange }: AuthDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[483px] p-0 overflow-hidden bg-popover rounded-4xl border-none shadow-lg">
                <VisuallyHidden>
                    <DialogTitle>Sign In</DialogTitle>
                </VisuallyHidden>
                <div className="flex flex-col gap-11 px-8 py-12 items-center text-center">
                    {/* Header */}
                    <div className="flex flex-col gap-6 w-full">
                        <h2 className="font-header text-[44px] leading-[50px]">
                            It starts now.
                        </h2>
                        <p className="font-body">
                            Create. Post. Win.
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-popover flex flex-col gap-5 p-8 rounded-3xl shadow-shadowbrand w-full relative border border-border">


                        {/* Google Button */}
                        <Button
                            variant="outline"
                            className="w-full h-14 bg-white border-border rounded-xl shadow-shadowbrand! hover:bg-white/5 flex items-center justify-center gap-3"
                            disabled={isLoading}
                            onClick={async () => {
                                setIsLoading(true);
                                try {
                                    await signIn.social({
                                        provider: "google",
                                        callbackURL: "/generate"
                                    });
                                } catch (error) {
                                    console.error(error);
                                    setIsLoading(false);
                                }
                            }}
                        >
                            {isLoading ? (
                                <Spinner className="w-6 h-6" />
                            ) : (
                                <>
                                    <GoogleIcon />
                                    <span>Continue with Google</span>
                                </>
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center w-full">
                            <span className="text-xs text-muted-foreground uppercase">OR</span>
                        </div>

                        {/* Email Input */}
                        <div className="w-full">
                            <Input
                                placeholder="Enter Your Email"
                                className="bg-input rounded-xl px-4 text-base shadow-shadowbrand focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
                            />
                        </div>

                        {/* Email Link Button */}
                        <Button className="w-full h-14 bg-popover-foreground hover:bg-black text-white rounded-xl font-semibold">
                            Continue with email
                        </Button>

                        <p className="text-xs text-center text-muted-foreground-2">
                            By continuing, you agree to Kepsio's <Link className="underline" href={"/privacy-policy"}>Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
