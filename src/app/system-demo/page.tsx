"use client";

import React, { useState } from "react";
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
} from "../../../design-system/components/ui";

export default function SystemDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const features = [
    {
      title: "Design Tokens",
      description:
        "Consistent color palette, typography, and spacing system built on CSS variables.",
      icon: "🎨",
    },
    {
      title: "Component Library",
      description:
        "Reusable, accessible components with TypeScript support and proper ARIA attributes.",
      icon: "🧩",
    },
    {
      title: "Responsive Design",
      description:
        "Mobile-first approach with flexible layouts that work across all devices.",
      icon: "📱",
    },
    {
      title: "Accessibility",
      description:
        "WCAG AA compliant with keyboard navigation and screen reader support.",
      icon: "♿",
    },
  ];

  const stats = [
    { label: "Components", value: "12+" },
    { label: "Design Tokens", value: "50+" },
    { label: "Accessibility Score", value: "100%" },
    { label: "Bundle Size", value: "<15KB" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <Navbar
        brand={
          <span className="text-xl font-bold text-primary">
            Design System Demo
          </span>
        }
        items={[
          { label: "Home", href: "/", active: false },
          { label: "Style Guide", href: "/style-guide", active: false },
          { label: "Demo", href: "/system-demo", active: true },
        ]}
        actions={<Button size="sm">Get Started</Button>}
      />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-display text-primary mb-6">
            Design System Live Demo
          </h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto mb-8">
            This page demonstrates the live implementation of our design system.
            Explore real-world examples of our components in action, showcasing
            consistency, accessibility, and the clean aesthetic inspired by
            Claude.ai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              View Components
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/style-guide">Style Guide</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-bg-highlight">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-primary mb-4">
              System Features
            </h2>
            <p className="text-lg text-secondary">
              Built with modern web standards and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Example */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-highlight">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-text-head mb-4">
              Dashboard Example
            </h2>
            <p className="text-lg text-text-body">
              Real-world layout using our design system components
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>
                    Track your project progress and key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-highlight rounded-lg">
                      <span className="text-text-body">Tasks Completed</span>
                      <span className="font-semibold text-text-head">
                        24/30
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bg-highlight rounded-lg">
                      <span className="text-text-body">Team Members</span>
                      <span className="font-semibold text-text-head">8</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bg-highlight rounded-lg">
                      <span className="text-text-body">Deadline</span>
                      <span className="font-semibold text-text-head">
                        Dec 15
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Sarah completed the user authentication module",
                      "Mike updated the project documentation",
                      "Alex reviewed the design mockups",
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-bg-highlight rounded-md"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm text-text-body">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📝 New Task
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    👥 Add Member
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📊 View Reports
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Sarah Chen",
                      "Mike Johnson",
                      "Alex Rivera",
                      "Emma Davis",
                    ].map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm text-text-body">{member}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-text-head mb-4">
              Contact Form Example
            </h2>
            <p className="text-lg text-text-body">
              Demonstrating form components with validation and accessibility
            </p>
          </div>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    helperText="We'll never share your email"
                    required
                  />
                </div>

                <Textarea
                  label="Message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  helperText="Please provide as much detail as possible"
                  required
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="flex-1">
                    Send Message
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-highlight">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-text-head mb-4">
              Component Showcase
            </h2>
            <p className="text-lg text-text-body">
              Interactive examples of all design system components
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Button Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Different button styles for various use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">⚙</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input States */}
            <Card>
              <CardHeader>
                <CardTitle>Input States</CardTitle>
                <CardDescription>
                  Form inputs with different states and validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Default input" />
                  <Input
                    placeholder="Error state"
                    error="This field is required"
                  />
                  <Input placeholder="Success state" success />
                  <Input
                    label="With Label"
                    placeholder="Enter your email"
                    helperText="We'll never share your email"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-text-head mb-4">
              Typography System
            </h2>
            <p className="text-lg text-text-body">
              Demonstrating our three-font system: Sora for headings, Inter for
              body text, and JetBrains Mono for code
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Font Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Font Families</CardTitle>
                <CardDescription>
                  Our typography hierarchy in action
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-display mb-2">
                    Sora (Display Font)
                  </h3>
                  <p className="text-sm text-text-body mb-2">
                    Used for headings and important text
                  </p>
                  <div className="p-4 bg-bg-highlight rounded-lg">
                    <h4 className="text-xl font-display mb-2">
                      Beautiful Typography
                    </h4>
                    <p className="text-sm font-display">
                      Clean, elegant, and highly readable
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display mb-2">
                    Inter (Body Font)
                  </h3>
                  <p className="text-sm text-text-body mb-2">
                    Used for body text, labels, and UI elements
                  </p>
                  <div className="p-4 bg-bg-highlight rounded-lg">
                    <p className="text-sm mb-2">
                      This is body text using Inter font. It's designed for
                      optimal readability at all sizes and provides excellent
                      legibility for user interfaces.
                    </p>
                    <p className="text-xs">
                      Even small text remains clear and accessible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>Code Typography</CardTitle>
                <CardDescription>
                  JetBrains Mono for code snippets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-bg-highlight rounded-lg">
                  <h4 className="text-sm font-display mb-3">Example Code:</h4>
                  <pre className="text-sm overflow-x-auto font-mono">
                    {`// Design System Component
import { Button } from '@/design-system';

export function MyComponent() {
  return (
    <Button 
      variant="primary"
      size="lg"
      onClick={handleClick}
    >
      Click me
    </Button>
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        brand={
          <span className="text-lg font-bold text-text-head">
            Design System Demo
          </span>
        }
        description="A comprehensive design system built with Next.js, Tailwind CSS v4, and TypeScript"
        links={[
          { label: "Style Guide", href: "/style-guide" },
          { label: "Components", href: "/system-demo" },
          { label: "Documentation", href: "/design-system/docs" },
        ]}
        socialLinks={[
          {
            label: "GitHub",
            href: "#",
            icon: <span className="text-lg">🐙</span>,
          },
          {
            label: "Twitter",
            href: "#",
            icon: <span className="text-lg">🐦</span>,
          },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thank You!"
        description="Your message has been sent successfully."
        size="md"
      >
        <ModalBody>
          <p className="text-text-body mb-4">
            Thank you for your interest in our design system. We'll get back to
            you soon!
          </p>
          <div className="p-4 bg-bg-highlight rounded-lg">
            <h4 className="font-semibold text-text-head mb-2">What's Next?</h4>
            <ul className="text-sm text-text-body space-y-1">
              <li>• Review your message within 24 hours</li>
              <li>• Schedule a consultation call</li>
              <li>• Provide custom implementation guidance</li>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Got it!</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
