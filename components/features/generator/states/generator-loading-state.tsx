"use client"

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, animate, AnimationPlaybackControls } from "framer-motion";
import { LogoOutlineIcon, BulbIcon } from "@/components/icons";
import { ThemeIcon } from "@/components/icons/theme-icon";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BrainIcon } from "@/components/icons/brain-icon";
import { TargetIcon } from "@/components/icons/target-icon";
import { CAPTION_TIPS } from "@/lib/constants";
import { Particles } from "@/components/layout/particles";

interface GeneratorLoadingStateProps {
    /** Progress value from 0 to 100 */
    progress: number;
}

interface PhaseConfig {
    text: string;
    subtext: string;
    color: string;
}

// Constants
const PHASE_CONFIGS: PhaseConfig[] = [
    {
        text: "Analyzing your content",
        subtext: "Understanding context and intent",
        color: "from-[#E551FF] to-[#FF0206]"
    },
    {
        text: "Finding the perfect hooks...",
        subtext: "Crafting attention-grabbing openings",
        color: "from-[#FF6251] to-[#FFA202]"
    },
    {
        text: "Matching your brand voice...",
        subtext: "Personalizing tone and style",
        color: "from-[#FF4602] to-[#FF025B]"
    }
] as const;

const PHASE_ICONS = [BrainIcon, TargetIcon, ThemeIcon] as const;

const PHASE_THRESHOLDS = [33, 66] as const;
const PROGRESS_ANIMATION_DURATION = 0.6;
const TIP_ROTATION_INTERVAL = 2000;

// Layout constants
const LOGO_SIZE = { width: 120, height: 98 } as const;
const PHASE_CONTENT_HEIGHT = 88;
const PROGRESS_BAR_WIDTH = 432;
const BACKGROUND_GLOW_SIZE = 56; // in rem (w-56)

/**
 * Determines the current phase index based on progress percentage
 */
const getPhaseIndex = (progress: number): number => {
    if (progress < PHASE_THRESHOLDS[0]) return 0;
    if (progress < PHASE_THRESHOLDS[1]) return 1;
    return 2;
};

/**
 * Loading state component with animated phases, progress bar, and rotating tips.
 * Displays different phases as the generation progresses with smooth animations.
 * 
 * @param props - Component props
 * @param props.progress - Current progress from 0-100
 * 
 * @example
 * ```tsx
 * <GeneratorLoadingState progress={progress} />
 * ```
 */
export function GeneratorLoadingState({ progress }: GeneratorLoadingStateProps) {
    const motionProgress = useMotionValue(0);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [currentTip, setCurrentTip] = useState(0);
    const animationRef = useRef<AnimationPlaybackControls | null>(null);
    const lastPhaseRef = useRef(0);

    const currentPhase = PHASE_CONFIGS[phaseIndex];
    const PhaseIcon = PHASE_ICONS[phaseIndex];

    // Memoize particles to prevent re-creation on state changes
    const particles = useMemo(() => <Particles />, []);

    // Animate progress smoothly whenever parent updates
    useEffect(() => {
        // Stop any existing animation
        animationRef.current?.stop();

        animationRef.current = animate(motionProgress, progress, {
            duration: PROGRESS_ANIMATION_DURATION,
            ease: [0.25, 0.1, 0.25, 1],
            onUpdate: (latest) => {
                // Only update phase when it actually changes
                const newPhaseIndex = getPhaseIndex(latest);
                if (newPhaseIndex !== lastPhaseRef.current) {
                    lastPhaseRef.current = newPhaseIndex;
                    setPhaseIndex(newPhaseIndex);
                }
            }
        });

        return () => {
            animationRef.current?.stop();
        };
    }, [progress, motionProgress]);

    // Tip rotation interval
    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % CAPTION_TIPS.length);
        }, TIP_ROTATION_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center gap-12 pb-32">
            {/* Background Glow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={phaseIndex}
                    className={cn("absolute bg-linear-to-r w-56 h-56 rounded-full blur-[150px]", currentPhase.color)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            </AnimatePresence>

            {/* Floating particles - memoized to prevent jumping */}
            <div className="absolute inset-0 pointer-events-none">
                {particles}
            </div>

            <LogoOutlineIcon
                className="z-10"
                style={{ width: LOGO_SIZE.width, height: LOGO_SIZE.height }}
            />

            {/* Phase content - using absolute positioning to prevent layout shifts */}
            <div
                className="relative w-full flex items-center justify-center"
                style={{ height: PHASE_CONTENT_HEIGHT }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={phaseIndex}
                        className="absolute space-y-5 text-center z-10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <motion.div
                                animate={{ rotate: [-10, 10, -10] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <PhaseIcon />
                            </motion.div>

                            <h2 className="text-3xl font-heading whitespace-nowrap">{currentPhase.text}</h2>
                        </div>
                        <p className="text-sm">{currentPhase.subtext}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress bar - using motion value directly */}
            <div style={{ width: PROGRESS_BAR_WIDTH }}>
                <Progress motionValue={motionProgress} />
            </div>

            {/* Tip rotation */}
            {CAPTION_TIPS.length > 0 && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTip}
                        className="flex items-center gap-2 rounded-2xl shadow-shadowbrand p-3 bg-white z-10"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                    >
                        <BulbIcon className="size-5" />
                        <p className="text-sm">{CAPTION_TIPS[currentTip]}</p>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
