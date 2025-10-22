# Design System Documentation

A comprehensive design system built with Next.js, Tailwind CSS v4, and TypeScript, inspired by Claude.ai's clean and minimal aesthetic.

## 🎨 Design Philosophy

Our design system emphasizes:

- **Clean & Minimal**: Lots of white space, subtle borders, gentle shadows
- **Elegant Typography**: Clear hierarchy with excellent readability
- **Trustworthy Colors**: Muted, professional color palette
- **Interactive Elements**: Smooth transitions and hover states
- **Accessibility-First**: High contrast ratios and clear visual hierarchy

## 🏗️ Architecture

### Token-First Approach

All design tokens are defined in CSS variables within the `@theme` block in `/design-system/tokens/theme.css`. This approach ensures:

- **Consistency**: Single source of truth for all design values
- **Scalability**: Easy to extend and modify across the entire system
- **Theming**: Simple to create dark mode or brand variations
- **Performance**: CSS variables are optimized by the browser

### Component System

Components are built using Tailwind CSS v4 utilities powered by our design tokens. Each component:

- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Responsive**: Mobile-first design with breakpoint considerations
- **Customizable**: Flexible props and className overrides
- **TypeScript**: Full type safety and IntelliSense support

## 🎯 Core Tokens

### Colors

```css
/* Primary Colors */
--color-bg: #faf9f5; /* Main background */
--color-bg-highlight: #f0eee6; /* Highlighted areas */
--color-surface: #ffffff; /* Cards and surfaces */

--color-primary: #141413; /* Primary brand color */
--color-accent: #c96442; /* Accent color */

/* Text Colors */
--color-text-head: #141413; /* Headings */
--color-text-body: #5e5d59; /* Body text */
--color-hint: rgba(94, 93, 89, 0.7); /* Subtle hints */

/* Border Colors */
--color-border: #e8e6dc; /* Primary borders */
--color-border-alt: #f0eee6; /* Alternative borders */
--color-divider: #e8e6dc; /* Section dividers */
```

### Typography

```css
/* Font Families */
--font-display: var(--font-sora); /* Headings */
--font-body: var(--font-inter); /* Body text */
--font-mono: var(--font-jetbrains-mono); /* Code */

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 2rem; /* 32px */
--text-4xl: 2.5rem; /* 40px */
--text-5xl: 3rem; /* 48px */
```

### Spacing

```css
/* 8px Base Unit System */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
```

## 🧩 Components

### Button

```tsx
import { Button } from '@/design-system/components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">⚙</Button>

// States
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>

// With Icons
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>
```

### Input

```tsx
import { Input } from '@/design-system/components/ui';

// Basic Input
<Input placeholder="Enter text" />

// With Label and Helper Text
<Input
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// States
<Input placeholder="Error state" error="This field is required" />
<Input placeholder="Success state" success />

// With Icons
<Input
  leftIcon={<MailIcon />}
  placeholder="Email"
/>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/design-system/components/ui";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>;
```

### Modal

```tsx
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/design-system/components/ui";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  description="Modal description"
  size="md"
>
  <ModalBody>
    <p>Modal content goes here</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>;
```

## 🎨 Usage with Tailwind

### Using Design Tokens

```tsx
// Direct token usage
<div className="bg-[var(--color-bg)] text-[var(--color-text-head)]">
  Content
</div>

// With Tailwind utilities (recommended)
<div className="bg-bg text-text-head">
  Content
</div>
```

### Custom Component Styling

```tsx
// Override component styles
<Button className="bg-custom-color hover:bg-custom-hover">
  Custom Button
</Button>

// Extend with additional classes
<Card className="shadow-lg border-2">
  Extended Card
</Card>
```

## 🌙 Theming & Dark Mode

### Creating Theme Variations

To create a dark mode or brand variation:

1. **Define new color tokens** in your theme file:

```css
@theme {
  /* Dark mode overrides */
  --color-bg: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-text-head: #ffffff;
  --color-text-body: #a0a0a0;
}
```

2. **Apply conditionally** based on user preference:

```tsx
// In your root layout
<html className={isDark ? 'dark' : 'light'}>
```

3. **Components automatically adapt** to the new token values.

### Brand Customization

```css
@theme {
  /* Brand-specific overrides */
  --color-primary: #your-brand-color;
  --color-accent: #your-accent-color;
  --font-display: "Your-Brand-Font", sans-serif;
}
```

## 📱 Responsive Design

All components are built mobile-first with responsive breakpoints:

```css
/* Breakpoints */
--breakpoint-sm: 640px; /* Mobile */
--breakpoint-md: 768px; /* Tablet */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large Desktop */
```

## ♿ Accessibility

### Built-in Features

- **ARIA attributes**: Proper labeling and descriptions
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Visible focus indicators
- **Screen reader support**: Semantic HTML structure
- **Color contrast**: WCAG AA compliant ratios

### Usage Guidelines

```tsx
// Always provide accessible labels
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>

// Use semantic HTML
<Card role="article" aria-labelledby="card-title">
  <CardTitle id="card-title">Article Title</CardTitle>
</Card>
```

## 🚀 Performance

### Optimizations

- **CSS Variables**: Efficient token system
- **Tree Shaking**: Only import what you use
- **TypeScript**: Compile-time optimizations
- **Tailwind CSS v4**: Optimized utility classes

### Bundle Size

The design system is optimized for minimal bundle impact:

- Core tokens: ~2KB gzipped
- Individual components: ~1-3KB each
- Full component library: ~15KB gzipped

## 🔧 Development

### Setup

1. **Install dependencies**:

```bash
npm install clsx tailwind-merge
```

2. **Import tokens** in your `globals.css`:

```css
@import "../../design-system/tokens/theme.css";
```

3. **Use components**:

```tsx
import { Button, Input, Card } from "@/design-system/components/ui";
```

### Extending the System

1. **Add new tokens** to `theme.css`
2. **Create components** in `/design-system/components/ui/`
3. **Export from** `/design-system/components/ui/index.ts`
4. **Document usage** in this README

## 📚 Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design System Best Practices](https://designsystemsrepo.com/)

## 🤝 Contributing

1. Follow the established patterns
2. Maintain accessibility standards
3. Update documentation
4. Test across devices and browsers
5. Ensure TypeScript compliance

---

Built with ❤️ using Next.js, Tailwind CSS v4, and TypeScript.
