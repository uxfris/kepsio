import React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => {
    const baseStyles =
      "rounded-[var(--radius-xl)] bg-[var(--color-surface)] transition-all duration-fast";

    const variants = {
      default: "border border-[var(--color-border)]",
      elevated: "shadow-[var(--shadow-md)] border border-[var(--color-border)]",
      outlined: "border-2 border-[var(--color-border)]",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding = "md", ...props }, ref) => {
    const paddings = {
      none: "",
      sm: "p-4 pb-2",
      md: "p-6 pb-4",
      lg: "p-8 pb-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          paddings[padding],
          className
        )}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "text-lg font-display leading-none tracking-tight text-[var(--color-text-head)]",
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--color-text-body)]", className)}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = "md", ...props }, ref) => {
    const paddings = {
      none: "",
      sm: "p-4 pt-0",
      md: "p-6 pt-0",
      lg: "p-8 pt-0",
    };

    return (
      <div ref={ref} className={cn(paddings[padding], className)} {...props} />
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding = "md", ...props }, ref) => {
    const paddings = {
      none: "",
      sm: "p-4 pt-2",
      md: "p-6 pt-4",
      lg: "p-8 pt-6",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", paddings[padding], className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
