"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  Footer,
} from "../../components/ui";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const components = [
    {
      name: "Button Variants",
      element: (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
      description: "Button component with multiple variants and states",
    },
    {
      name: "Button Sizes",
      element: (
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">⚙</Button>
        </div>
      ),
      description: "Button component in different sizes",
    },
    {
      name: "Input Field",
      element: (
        <div className="w-full max-w-sm">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            helperText="We'll never share your email"
          />
        </div>
      ),
      description: "Input component with label and helper text",
    },
    {
      name: "Input States",
      element: (
        <div className="w-full max-w-sm space-y-4">
          <Input placeholder="Default state" />
          <Input placeholder="Error state" error="This field is required" />
          <Input placeholder="Success state" success />
        </div>
      ),
      description: "Input component with different states",
    },
    {
      name: "Textarea",
      element: (
        <div className="w-full max-w-sm">
          <Textarea
            label="Message"
            placeholder="Enter your message here..."
            helperText="Please provide detailed information"
            rows={4}
          />
        </div>
      ),
      description: "Textarea component for longer text input",
    },
    {
      name: "Card Component",
      element: (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This is the card content area with proper spacing and typography.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      ),
      description: "Card component with header, content, and proper structure",
    },
    {
      name: "Modal Component",
      element: (
        <div>
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            description="This is an example modal with proper accessibility"
          >
            <ModalBody>
              <p>
                This modal demonstrates proper focus management, keyboard
                navigation, and accessibility features.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </ModalFooter>
          </Modal>
        </div>
      ),
      description: "Modal component with accessibility features",
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
    { id: "layout", label: "Layout" },
    { id: "spacing", label: "Spacing & Layout" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold">Design System</h1>
          <p className="mt-1">
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
                          ? "bg-primary text-surface"
                          : "text-text-body hover:bg-section-light hover:text-text-head"
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
                <h2 className="text-3xl font-semibold mb-6">Colors</h2>
                <p className="text-lg mb-8">
                  Our color palette emphasizes trustworthiness and depth while
                  maintaining accessibility. Colors are designed to work
                  harmoniously across light and dark modes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {colorPalette.map((color) => (
                    <div
                      key={color.name}
                      className="bg-surface rounded-lg p-6 border border-border"
                    >
                      <div
                        className="w-full h-20 rounded-lg mb-4 border border-border"
                        style={{ backgroundColor: color.value }}
                      />
                      <h3 className="font-semibold mb-1">{color.name}</h3>
                      <p className="text-sm mb-2 font-mono">{color.value}</p>
                      <p className="text-sm">{color.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Typography Section */}
            {activeSection === "typography" && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">Typography</h2>
                <p className="text-lg mb-8">
                  Our typography system uses Sora for headings, Inter for body
                  text, and JetBrains Mono for code, with careful attention to
                  hierarchy and readability. All text maintains excellent
                  contrast ratios for accessibility.
                </p>

                <div className="space-y-8">
                  {typographyScale.map((type) => (
                    <div
                      key={type.name}
                      className="bg-surface rounded-lg p-6 border border-border"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-text-head">
                          {type.name}
                        </h3>
                        <div className="text-sm text-text-body font-mono">
                          {type.size} / {type.weight} / {type.lineHeight} /{" "}
                          {type.fontFamily}
                        </div>
                      </div>
                      <div
                        className="text-text-head mb-2"
                        style={{
                          fontSize: type.size,
                          fontWeight: type.weight,
                          lineHeight: type.lineHeight,
                          fontFamily:
                            type.fontFamily === "Sora"
                              ? "font-display"
                              : type.fontFamily === "JetBrains Mono"
                              ? "font-mono"
                              : "font-body",
                        }}
                      >
                        {type.fontFamily === "JetBrains Mono"
                          ? "const example = 'Hello World';"
                          : "The quick brown fox jumps over the lazy dog"}
                      </div>
                      <p className="text-sm">{type.usage}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Components Section */}
            {activeSection === "components" && (
              <section>
                <h2 className="text-3xl font-semibold text-text-head mb-6">
                  Components
                </h2>
                <p className="text-lg mb-8">
                  Our component library focuses on simplicity and functionality.
                  Each component is designed to feel conversational rather than
                  mechanical, with purposeful interactions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {components.map((component) => (
                    <div
                      key={component.name}
                      className="bg-surface rounded-lg p-6 border border-border"
                    >
                      <h3 className="font-semibold text-text-head mb-2">
                        {component.name}
                      </h3>
                      <p className="text-sm mb-4">{component.description}</p>
                      <div className="flex items-center justify-center p-4 bg-section-light rounded-lg">
                        {component.element}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Layout Section */}
            {activeSection === "layout" && (
              <section>
                <h2 className="text-3xl font-semibold text-text-head mb-6">
                  Layout Components
                </h2>
                <p className="text-lg mb-8">
                  Layout components provide structure and navigation for your
                  application. They are designed to be flexible and accessible
                  across all devices.
                </p>

                <div className="space-y-8">
                  {/* Navbar Example */}
                  <div className="bg-surface rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-text-head mb-4">
                      Navbar Component
                    </h3>
                    <p className="text-sm mb-4">
                      Responsive navigation component with mobile menu support
                    </p>
                    <div className="mb-4 p-4 bg-section-light rounded-lg">
                      <Navbar
                        brand={
                          <span className="text-xl font-bold text-text-head">
                            Brand
                          </span>
                        }
                        items={[
                          { label: "Home", href: "#", active: true },
                          { label: "About", href: "#" },
                          { label: "Contact", href: "#" },
                        ]}
                        actions={<Button size="sm">Get Started</Button>}
                      />
                    </div>
                  </div>

                  {/* Footer Example */}
                  <div className="bg-surface rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-text-head mb-4">
                      Footer Component
                    </h3>
                    <p className="text-sm mb-4">
                      Flexible footer component with multiple layout options
                    </p>
                    <div className="mb-4 p-4 bg-section-light rounded-lg">
                      <Footer
                        brand={
                          <span className="text-lg font-bold text-text-head">
                            Your Company
                          </span>
                        }
                        description="Building amazing products with our design system"
                        links={[
                          { label: "Privacy Policy", href: "#" },
                          { label: "Terms of Service", href: "#" },
                          { label: "Contact", href: "#" },
                        ]}
                        socialLinks={[
                          {
                            label: "Twitter",
                            href: "#",
                            icon: <span className="text-lg">🐦</span>,
                          },
                          {
                            label: "GitHub",
                            href: "#",
                            icon: <span className="text-lg">🐙</span>,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Spacing Section */}
            {activeSection === "spacing" && (
              <section>
                <h2 className="text-3xl font-semibold text-text-head mb-6">
                  Spacing & Layout
                </h2>
                <p className="text-lg mb-8">
                  Consistent spacing creates visual rhythm and hierarchy. We use
                  an 8px base unit system with a 12-column grid for optimal
                  alignment across all screen sizes.
                </p>

                <div className="space-y-6">
                  <div className="bg-surface rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-text-head mb-4">
                      Spacing Scale
                    </h3>
                    <div className="space-y-4">
                      {spacingScale.map((space) => (
                        <div
                          key={space.name}
                          className="flex items-center gap-4"
                        >
                          <div className="w-16 text-sm font-mono text-text-body">
                            {space.name}
                          </div>
                          <div className="w-20 text-sm font-mono text-text-body">
                            {space.value}
                          </div>
                          <div className="w-12 text-sm text-text-body">
                            {space.pixels}
                          </div>
                          <div
                            className="bg-primary rounded"
                            style={{
                              width: space.value,
                              height: "1rem",
                            }}
                          />
                          <div className="text-sm text-text-body">
                            {space.usage}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-text-head mb-4">
                      Grid System
                    </h3>
                    <div className="grid grid-cols-12 gap-4">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-border rounded flex items-center justify-center text-xs text-text-body"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm mt-4">
                      12-column grid with 16px gutters for consistent alignment
                    </p>
                  </div>

                  <div className="bg-surface rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-text-head mb-4">
                      Breakpoints
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-section-light rounded-lg">
                        <div className="font-semibold text-text-head">
                          Mobile
                        </div>
                        <div className="text-sm text-text-body">480px</div>
                      </div>
                      <div className="text-center p-4 bg-section-light rounded-lg">
                        <div className="font-semibold text-text-head">
                          Tablet
                        </div>
                        <div className="text-sm text-text-body">768px</div>
                      </div>
                      <div className="text-center p-4 bg-section-light rounded-lg">
                        <div className="font-semibold text-text-head">
                          Desktop
                        </div>
                        <div className="text-sm text-text-body">1024px</div>
                      </div>
                      <div className="text-center p-4 bg-section-light rounded-lg">
                        <div className="font-semibold text-text-head">
                          Large
                        </div>
                        <div className="text-sm text-text-body">1280px</div>
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
