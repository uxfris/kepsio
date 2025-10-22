"use client";

import { useState } from "react";

export default function StyleGuide() {
  const [activeSection, setActiveSection] = useState("colors");

  const colorPalette = [
    {
      name: "Background",
      value: "#FAF9F5",
      description: "Main background color",
    },
    {
      name: "Background Highlight",
      value: "#F0EEE6",
      description: "Highlighted background areas",
    },
    {
      name: "Surface",
      value: "#FFFFFF",
      description: "Card and surface backgrounds",
    },
    {
      name: "Primary",
      value: "#141413",
      description: "Primary brand color for text and actions",
    },
    {
      name: "Accent",
      value: "#C96442",
      description: "Accent color for highlights and CTAs",
    },
    {
      name: "Chip Background",
      value: "#F0EEE6",
      description: "Background for chips and tags",
    },
    {
      name: "Text Head",
      value: "#141413",
      description: "Headings and important text",
    },
    {
      name: "Text Body",
      value: "#5E5D59",
      description: "Body text color",
    },
    {
      name: "Hint",
      value: "rgba(94, 93, 89, 0.7)",
      description: "Subtle hints and placeholders",
    },
    {
      name: "Border",
      value: "#E8E6DC",
      description: "Primary border color",
    },
    {
      name: "Border Alt",
      value: "#F0EEE6",
      description: "Alternative border color",
    },
    {
      name: "Divider",
      value: "#E8E6DC",
      description: "Section dividers",
    },
  ];

  const typographyScale = [
    {
      name: "Heading 1",
      size: "2.5rem",
      weight: "600",
      lineHeight: "1.2",
      fontFamily: "Sora",
      usage: "Main page titles",
    },
    {
      name: "Heading 2",
      size: "2rem",
      weight: "600",
      lineHeight: "1.3",
      fontFamily: "Sora",
      usage: "Section headers",
    },
    {
      name: "Heading 3",
      size: "1.5rem",
      weight: "500",
      lineHeight: "1.4",
      fontFamily: "Sora",
      usage: "Subsection headers",
    },
    {
      name: "Body Large",
      size: "1.125rem",
      weight: "400",
      lineHeight: "1.6",
      fontFamily: "Inter",
      usage: "Large body text",
    },
    {
      name: "Body Regular",
      size: "1rem",
      weight: "400",
      lineHeight: "1.5",
      fontFamily: "Inter",
      usage: "Standard body text",
    },
    {
      name: "Body Small",
      size: "0.875rem",
      weight: "400",
      lineHeight: "1.4",
      fontFamily: "Inter",
      usage: "Small text and captions",
    },
    {
      name: "Code",
      size: "0.875rem",
      weight: "400",
      lineHeight: "1.4",
      fontFamily: "JetBrains Mono",
      usage: "Code snippets",
    },
  ];

  const components = [
    {
      name: "Primary Button",
      element: (
        <button className="px-6 py-3 bg-[#141413] text-white rounded-lg font-medium hover:bg-[#2A2A28] transition-colors">
          Primary Action
        </button>
      ),
      description: "Main call-to-action buttons",
    },
    {
      name: "Accent Button",
      element: (
        <button className="px-6 py-3 bg-[#C96442] text-white rounded-lg font-medium hover:bg-[#B55A3A] transition-colors">
          Accent Action
        </button>
      ),
      description: "Accent actions and highlights",
    },
    {
      name: "Outline Button",
      element: (
        <button className="px-6 py-3 border border-[#E8E6DC] text-[#141413] rounded-lg font-medium hover:bg-[#F0EEE6] transition-colors">
          Outline Action
        </button>
      ),
      description: "Subtle actions and alternatives",
    },
    {
      name: "Input Field",
      element: (
        <input
          type="text"
          placeholder="Enter text here"
          className="w-full px-4 py-3 border border-[#E8E6DC] rounded-xl focus:border-[#141413] focus:outline-none transition-colors bg-white"
        />
      ),
      description: "Text input fields",
    },
    {
      name: "Card",
      element: (
        <div className="p-6 bg-white border border-[#F0EEE6] rounded-2xl">
          <h3 className="text-lg font-semibold text-[#141413] mb-2">
            Card Title
          </h3>
          <p className="text-[#5E5D59]">
            This is a card component with subtle styling.
          </p>
        </div>
      ),
      description: "Content containers and cards",
    },
    {
      name: "Chip",
      element: (
        <span className="px-3 py-1 bg-[#F0EEE6] text-[#141413] text-sm font-medium rounded-full">
          Tag
        </span>
      ),
      description: "Tags and labels",
    },
  ];

  const spacingScale = [
    { name: "xs", value: "0.25rem", pixels: "4px", usage: "Tight spacing" },
    { name: "sm", value: "0.5rem", pixels: "8px", usage: "Small spacing" },
    { name: "md", value: "1rem", pixels: "16px", usage: "Medium spacing" },
    { name: "lg", value: "1.5rem", pixels: "24px", usage: "Large spacing" },
    { name: "xl", value: "2rem", pixels: "32px", usage: "Extra large spacing" },
    { name: "2xl", value: "3rem", pixels: "48px", usage: "Section spacing" },
    { name: "3xl", value: "4rem", pixels: "64px", usage: "Page spacing" },
  ];

  const navigationItems = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "components", label: "Components" },
    { id: "spacing", label: "Spacing & Layout" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E6DC] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-[#141413]">
            Design System
          </h1>
          <p className="text-[#5E5D59] mt-1">
            Inspired by Claude.ai's clean and minimal aesthetic
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-64 shrink-0">
            <div className="sticky top-24">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? "bg-[#141413] text-white"
                          : "text-[#5E5D59] hover:bg-[#F0EEE6] hover:text-[#141413]"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Colors Section */}
            {activeSection === "colors" && (
              <section>
                <h2 className="text-3xl font-semibold text-[#141413] mb-6">
                  Colors
                </h2>
                <p className="text-[#5E5D59] mb-8 text-lg">
                  Our color palette emphasizes trustworthiness and depth while
                  maintaining accessibility. Colors are designed to work
                  harmoniously across light and dark modes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {colorPalette.map((color) => (
                    <div
                      key={color.name}
                      className="bg-white rounded-lg p-6 border border-[#E8E6DC]"
                    >
                      <div
                        className="w-full h-20 rounded-lg mb-4 border border-[#E8E6DC]"
                        style={{ backgroundColor: color.value }}
                      />
                      <h3 className="font-semibold text-[#141413] mb-1">
                        {color.name}
                      </h3>
                      <p className="text-sm text-[#5E5D59] mb-2 font-mono">
                        {color.value}
                      </p>
                      <p className="text-sm text-[#5E5D59]">
                        {color.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Typography Section */}
            {activeSection === "typography" && (
              <section>
                <h2 className="text-3xl font-semibold text-[#141413] mb-6">
                  Typography
                </h2>
                <p className="text-[#5E5D59] mb-8 text-lg">
                  Our typography system uses Sora for headings, Inter for body
                  text, and JetBrains Mono for code, with careful attention to
                  hierarchy and readability. All text maintains excellent
                  contrast ratios for accessibility.
                </p>

                <div className="space-y-8">
                  {typographyScale.map((type) => (
                    <div
                      key={type.name}
                      className="bg-white rounded-lg p-6 border border-[#E8E6DC]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-[#141413]">
                          {type.name}
                        </h3>
                        <div className="text-sm text-[#5E5D59] font-mono">
                          {type.size} / {type.weight} / {type.lineHeight} /{" "}
                          {type.fontFamily}
                        </div>
                      </div>
                      <div
                        className="text-[#141413] mb-2"
                        style={{
                          fontSize: type.size,
                          fontWeight: type.weight,
                          lineHeight: type.lineHeight,
                          fontFamily:
                            type.fontFamily === "Sora"
                              ? "var(--font-sora)"
                              : type.fontFamily === "JetBrains Mono"
                              ? "var(--font-jetbrains-mono)"
                              : "var(--font-inter)",
                        }}
                      >
                        {type.fontFamily === "JetBrains Mono"
                          ? "const example = 'Hello World';"
                          : "The quick brown fox jumps over the lazy dog"}
                      </div>
                      <p className="text-sm text-[#5E5D59]">{type.usage}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Components Section */}
            {activeSection === "components" && (
              <section>
                <h2 className="text-3xl font-semibold text-[#141413] mb-6">
                  Components
                </h2>
                <p className="text-[#5E5D59] mb-8 text-lg">
                  Our component library focuses on simplicity and functionality.
                  Each component is designed to feel conversational rather than
                  mechanical, with purposeful interactions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {components.map((component) => (
                    <div
                      key={component.name}
                      className="bg-white rounded-lg p-6 border border-[#E8E6DC]"
                    >
                      <h3 className="font-semibold text-[#141413] mb-2">
                        {component.name}
                      </h3>
                      <p className="text-[#5E5D59] mb-4 text-sm">
                        {component.description}
                      </p>
                      <div className="flex items-center justify-center p-4 bg-[#F0EEE6] rounded-lg">
                        {component.element}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Spacing Section */}
            {activeSection === "spacing" && (
              <section>
                <h2 className="text-3xl font-semibold text-[#141413] mb-6">
                  Spacing & Layout
                </h2>
                <p className="text-[#5E5D59] mb-8 text-lg">
                  Consistent spacing creates visual rhythm and hierarchy. We use
                  an 8px base unit system with a 12-column grid for optimal
                  alignment across all screen sizes.
                </p>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border border-[#E8E6DC]">
                    <h3 className="font-semibold text-[#141413] mb-4">
                      Spacing Scale
                    </h3>
                    <div className="space-y-4">
                      {spacingScale.map((space) => (
                        <div
                          key={space.name}
                          className="flex items-center gap-4"
                        >
                          <div className="w-16 text-sm font-mono text-[#5E5D59]">
                            {space.name}
                          </div>
                          <div className="w-20 text-sm font-mono text-[#5E5D59]">
                            {space.value}
                          </div>
                          <div className="w-12 text-sm text-[#5E5D59]">
                            {space.pixels}
                          </div>
                          <div
                            className="bg-[#141413] rounded"
                            style={{
                              width: space.value,
                              height: "1rem",
                            }}
                          />
                          <div className="text-sm text-[#5E5D59]">
                            {space.usage}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-[#E8E6DC]">
                    <h3 className="font-semibold text-[#141413] mb-4">
                      Grid System
                    </h3>
                    <div className="grid grid-cols-12 gap-4">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-[#E8E6DC] rounded flex items-center justify-center text-xs text-[#5E5D59]"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#5E5D59] mt-4">
                      12-column grid with 16px gutters for consistent alignment
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-[#E8E6DC]">
                    <h3 className="font-semibold text-[#141413] mb-4">
                      Breakpoints
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-[#F0EEE6] rounded-lg">
                        <div className="font-semibold text-[#141413]">
                          Mobile
                        </div>
                        <div className="text-sm text-[#5E5D59]">480px</div>
                      </div>
                      <div className="text-center p-4 bg-[#F0EEE6] rounded-lg">
                        <div className="font-semibold text-[#141413]">
                          Tablet
                        </div>
                        <div className="text-sm text-[#5E5D59]">768px</div>
                      </div>
                      <div className="text-center p-4 bg-[#F0EEE6] rounded-lg">
                        <div className="font-semibold text-[#141413]">
                          Desktop
                        </div>
                        <div className="text-sm text-[#5E5D59]">1024px</div>
                      </div>
                      <div className="text-center p-4 bg-[#F0EEE6] rounded-lg">
                        <div className="font-semibold text-[#141413]">
                          Large
                        </div>
                        <div className="text-sm text-[#5E5D59]">1280px</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
