import { Testimonial, FAQItem } from "../../components/pricing";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah-k",
    name: "Sarah K.",
    role: "Lifestyle Creator",
    quote:
      "This tool 5x'd my posting consistency. I went from posting once a week to daily without the stress.",
    avatar: "SK",
    rating: 5,
  },
  {
    id: "marcus-t",
    name: "Marcus T.",
    role: "Agency Owner",
    quote:
      "Cut caption writing time by 80%. My team can now focus on strategy instead of content creation.",
    avatar: "MT",
    rating: 5,
  },
  {
    id: "priya-l",
    name: "Priya L.",
    role: "E-commerce Brand",
    quote:
      "My captions finally convert. Sales increased 40% after switching to AI-generated captions.",
    avatar: "PL",
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "cancel-anytime",
    question: "Can I cancel anytime?",
    answer:
      "Yes! Cancel anytime from your account settings. No questions asked, no hidden fees.",
  },
  {
    id: "free-plan-limit",
    question: "What happens when I hit the free plan limit?",
    answer:
      "You'll see a prompt to upgrade. Your saved captions remain accessible, you just can't generate new ones until next month or you upgrade.",
  },
  {
    id: "refunds",
    question: "Do you offer refunds?",
    answer:
      "Absolutely. If you're not satisfied within 30 days, we'll refund you in full.",
  },
  {
    id: "change-plans",
    question: "Can I change plans later?",
    answer:
      "Yes! Upgrade or downgrade anytime. Changes take effect on your next billing cycle.",
  },
];

export const PRICING_CONFIG = {
  annualDiscountPercentage: 20,
  autoRotateInterval: 4000,
} as const;
