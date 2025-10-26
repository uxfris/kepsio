import { Zap, MessageSquare, TrendingUp } from "lucide-react";

export const PLATFORM_EXAMPLES = {
  instagram: {
    generic:
      "Check out our new product! Link in bio. #newproduct #excited #launch",
    ours: "You know that feeling when something just clicks? 🌟\n\nThat's exactly what happened when we created this. Months of late nights, endless iterations, and about 47 cups of coffee later... it's finally here.\n\nWant the full story? 👆 Link in bio\n\n#authenticbranding #behindthescenes",
  },
  linkedin: {
    generic:
      "Excited to share our latest achievement. Great team effort. #business #success",
    ours: "3 years ago, we pitched this idea to 47 investors.\n\n46 said no.\n\nToday, we're announcing $5M in revenue. Here's what we learned about resilience:\n\n→ Rejection isn't failure—it's data\n→ Your timeline isn't their timeline\n→ One yes can change everything\n\nTo everyone building in the shadows: keep going.",
  },
  x: {
    generic: "New blog post is live! Check it out. #content #blog",
    ours: "spent 40 hours writing about why most AI tools feel soulless\n\ntl;dr: they optimize for clicks, not connection\n\nfull breakdown (actually worth reading): [link]",
  },
} as const;

export const FEATURES = [
  {
    icon: Zap,
    title: "Generate in Seconds",
    description:
      "Describe your content, hit generate, get 5 caption variations instantly. No prompting gymnastics required.",
    benefits: [
      "Platform-specific formatting",
      "Hashtag suggestions included",
      "CTA optimization built-in",
    ],
  },
  {
    icon: MessageSquare,
    title: "Your Voice, Not Ours",
    description:
      "Train the AI on your style. It learns your tone, vocabulary, and emoji preferences automatically.",
    benefits: [
      "Voice cloning from past captions",
      "Multi-brand profiles for agencies",
      "Tone consistency guardrails",
    ],
  },
  {
    icon: TrendingUp,
    title: "Built to Perform",
    description:
      "Not just words—captions optimized for engagement. Every suggestion follows proven best practices.",
    benefits: [
      "Hook formulas that stop scrolling",
      "Engagement prediction scores",
      "A/B testing recommendations",
    ],
  },
];

export const TESTIMONIALS = [
  {
    text: "This tool 5x'd my posting consistency. I used to dread writing captions—now I actually look forward to it.",
    author: "Sarah Chen",
    role: "Lifestyle Creator, 47K followers",
    avatar: "SC",
  },
  {
    text: "Managing 8 client accounts was burning me out. AI Caption Studio cut my caption writing time by 70%.",
    author: "Marcus Johnson",
    role: "Social Media Manager",
    avatar: "MJ",
  },
  {
    text: "The voice cloning is scary good. My captions sound exactly like me, not some generic AI bot.",
    author: "Priya Patel",
    role: "E-commerce Brand Owner",
    avatar: "PP",
  },
];

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Examples", href: "#examples" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Examples", href: "#examples" },
      { label: "Integrations", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Caption Guide", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];
