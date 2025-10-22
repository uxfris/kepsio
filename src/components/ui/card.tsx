"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from "@/lib/types";

const cardVariants = cva(
  "rounded-2xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-surface border-border-alt",
        elevated: "bg-surface border-border-alt shadow-lg",
        outlined: "bg-surface border-border",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardVariantProps
  extends CardProps,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardVariantProps>(
  ({ className, variant, padding, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold leading-none tracking-tight text-text-head">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-text-body">{description}</p>
      )}
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-text-body", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter, cardVariants };
