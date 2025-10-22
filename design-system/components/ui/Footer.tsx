import React from "react";
import { cn } from "../../utils/cn";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  description?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  variant?: "default" | "minimal" | "extended";
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      brand,
      description,
      links = [],
      socialLinks = [],
      variant = "default",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "bg-[var(--color-surface)] border-t border-[var(--color-border)]";

    const variants = {
      default: "py-12",
      minimal: "py-8",
      extended: "py-16",
    };

    return (
      <footer
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="mb-4">{brand}</div>
              {description && (
                <p className="text-[var(--color-text-body)] text-sm max-w-md">
                  {description}
                </p>
              )}
            </div>

            {/* Links Section */}
            {links.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-head)] mb-4">
                  Links
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--color-text-body)] hover:text-[var(--color-text-head)] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Links Section */}
            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-head)] mb-4">
                  Follow us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-[var(--color-text-body)] hover:text-[var(--color-text-head)] transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-[var(--color-divider)]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-[var(--color-hint)]">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-[var(--color-hint)]">
                  Built with our design system
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export { Footer };
