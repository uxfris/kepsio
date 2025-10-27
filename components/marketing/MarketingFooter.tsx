"use client";

import React, { memo } from "react";
import { Sparkles } from "lucide-react";
import { SocialIcon } from "react-social-icons";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: readonly FooterLink[];
}

interface MarketingFooterProps {
  columns: readonly FooterColumn[];
}

export const MarketingFooter = memo(function MarketingFooter({
  columns,
}: MarketingFooterProps) {
  const socialLinks = [
    { network: "x", href: "#" },
    { network: "instagram", href: "#" },
    { network: "linkedin", href: "#" },
  ];

  return (
    <footer className="bg-primary text-text-body py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-surface" />
              </div>
              <span className="text-lg font-bold text-surface">Kepsio</span>
            </div>
            <p className="text-sm text-hint mb-4">
              The AI caption tool that actually sounds like you.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.network}
                  network={social.network}
                  url={social.href}
                  style={{ width: 16, height: 16 }}
                  className="w-9 h-9 bg-primary/50 hover:bg-primary/70 rounded-lg transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Other Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="text-surface font-semibold mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-surface transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-hint">
            © 2025 Kepsio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-hint">
            <a href="#" className="hover:text-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-surface transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-surface transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});
