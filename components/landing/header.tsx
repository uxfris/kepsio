import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/landing/auth-dialog";

export function Header() {
    return (
        <div className="w-full flex justify-center pt-8 fixed top-0 z-50">
            <div className="bg-white flex items-center justify-between px-5 py-3 rounded-full shadow-[0px_5px_0px_0px_rgba(0,0,0,0.05)] w-full max-w-[1200px] mx-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="relative w-[23px] h-[21px]">
                        <div className="absolute top-0 left-0 bg-[#ff4602] h-[13.5px] w-[23px] rounded-full" />
                        <div className="absolute top-[7px] left-[2px] bg-[#1f1f1f] h-[13.5px] w-[23px] rounded-full" />
                    </div>
                    <span className="font-faculty-glyphic text-xl text-[#1f1f1f]">
                        Kepsio
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 font-lexend-deca text-sm text-[#1f1f1f]">
                    <Link href="#features" className="hover:text-[#ff4602] transition-colors">Features</Link>
                    <Link href="#examples" className="hover:text-[#ff4602] transition-colors">Examples</Link>
                    <Link href="#showcase" className="hover:text-[#ff4602] transition-colors">Showcase</Link>
                    <Link href="#pricing" className="hover:text-[#ff4602] transition-colors">Pricing</Link>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4 font-lexend-deca text-sm">
                    <AuthDialog
                        trigger={
                            <button className="font-semibold text-[#1f1f1f] hover:text-[#ff4602] transition-colors">
                                Sign In
                            </button>
                        }
                    />
                    <AuthDialog
                        trigger={
                            <Button
                                className="bg-[#ff4602] hover:bg-[#ff5f24] text-white rounded-full px-6 py-2 h-auto font-semibold"
                            >
                                Start Free
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
