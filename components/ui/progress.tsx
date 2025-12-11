"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion, MotionValue, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number;
  motionValue?: MotionValue<number>;
}

function Progress({
  className,
  value,
  motionValue,
  ...props
}: ProgressProps) {
  // Use motion value if provided, otherwise use regular value
  const progressValue = motionValue || value || 0;
  const transform = typeof progressValue === 'number'
    ? `translateX(-${100 - progressValue}%)`
    : useTransform(progressValue, (v) => `translateX(-${100 - v}%)`);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-[#EFEFEE] relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-linear-to-r from-foreground to-primary h-full w-full flex-1 rounded-full"
        asChild
      >
        <motion.div
          style={{
            transform: typeof transform === 'string' ? transform : transform as any
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
