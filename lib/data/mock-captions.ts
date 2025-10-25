import { CaptionItem } from "@/types/captions";

// Extended mock data with more captions for demonstration
export const MOCK_CAPTIONS: CaptionItem[] = [
  {
    id: 1,
    snippet: "Exciting news! 🎉 We're launching something special next week...",
    fullText:
      "Exciting news! 🎉 We're launching something special next week that's going to change how you create content. Can you guess what it is? Drop your guesses below! 👇",
    date: "2 hours ago",
    platform: "instagram",
    style: "Teaser",
    engagement: 4.2,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    snippet: "Behind the scenes of building a product people actually want...",
    fullText:
      "Behind the scenes of building a product people actually want: Talk to users early, ship fast, and don't be afraid to pivot. What's your #1 product lesson?",
    date: "Yesterday",
    platform: "linkedin",
    style: "Thought Leadership",
    engagement: 3.8,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    snippet: "Coffee first, creativity second ☕️ What's your morning ritual?",
    fullText:
      "Coffee first, creativity second ☕️ What's your morning ritual that helps you stay productive? Mine: 1. Coffee 2. Quick workout 3. Review goals. Let me know yours!",
    date: "2 days ago",
    platform: "instagram",
    style: "Engagement",
    engagement: 4.5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 4,
    snippet: "Quick tip: Your audience doesn't want perfection...",
    fullText:
      "Quick tip: Your audience doesn't want perfection, they want authenticity. Show up as you are, share your process, and watch engagement soar. 📈",
    date: "3 days ago",
    platform: "x",
    style: "Educational",
    engagement: 3.9,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 5,
    snippet: "5 things I learned launching my first product...",
    fullText:
      "5 things I learned launching my first product: 1. Launch before you're ready 2. Listen more than you talk 3. Iterate based on feedback 4. Celebrate small wins 5. Community > marketing budget",
    date: "5 days ago",
    platform: "linkedin",
    style: "Listicle",
    engagement: 4.1,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: 6,
    snippet: "That feeling when you finally solve a problem you've been...",
    fullText:
      "That feeling when you finally solve a problem you've been stuck on for days... 🎯 What's your latest win? Celebrate with me in the comments!",
    date: "1 week ago",
    platform: "instagram",
    style: "Relatable",
    engagement: 4.3,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: 7,
    snippet: "Building in public: Day 30 of my startup journey...",
    fullText:
      "Building in public: Day 30 of my startup journey. Today I hit 1000 users! 🚀 The biggest lesson? Ship fast, listen to feedback, and don't overthink. What's your biggest startup lesson?",
    date: "1 week ago",
    platform: "x",
    style: "Behind the Scenes",
    engagement: 3.7,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: 8,
    snippet: "Why I switched from perfectionism to progress...",
    fullText:
      "Why I switched from perfectionism to progress: Done is better than perfect. Your audience wants to see your journey, not just the polished result. Share the process!",
    date: "2 weeks ago",
    platform: "linkedin",
    style: "Personal Story",
    engagement: 4.0,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
  },
  {
    id: 9,
    snippet: "The content creator's dilemma: Quality vs Quantity...",
    fullText:
      "The content creator's dilemma: Quality vs Quantity. Here's what I learned after posting daily for 6 months: Consistency beats perfection every time. What's your take?",
    date: "2 weeks ago",
    platform: "instagram",
    style: "Discussion",
    engagement: 3.6,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
  },
  {
    id: 10,
    snippet: "My morning routine that changed everything...",
    fullText:
      "My morning routine that changed everything: 5 AM wake up, 20 min meditation, 30 min workout, 1 hour deep work. The key? Start with intention, not reaction. What's yours?",
    date: "3 weeks ago",
    platform: "linkedin",
    style: "Lifestyle",
    engagement: 4.4,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
  },
];
