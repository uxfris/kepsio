/**
 * Content variations for voice preview generation
 * Organized by tone, content type, and voice strength
 */

export type VoiceStrengthLevel = "low" | "mid" | "high";

export interface ContentVariation {
  low: string;
  mid: string;
  high: string;
}

export const PREVIEW_CONTENT_VARIATIONS: Record<
  string,
  Record<string, ContentVariation>
> = {
  "Casual & Friendly": {
    "Educational content": {
      low: "Did you know this cool trick? I just discovered it and HAD to share!",
      mid: "Hey friends! Let me walk you through something that's been a game-changer for me.",
      high: "Quick tip that I wish I knew earlier! Here's exactly how I do it:",
    },
    "Behind-the-scenes": {
      low: "Pulling back the curtain on my creative process today!",
      mid: "Hey team! Thought you'd enjoy seeing what goes into creating this stuff.",
      high: "Here's a peek behind the scenes of my workflow:",
    },
    "Product launches": {
      low: "OMG! I've been keeping this secret for weeks... finally sharing!",
      mid: "So excited to introduce something I've been working on!",
      high: "I'm thrilled to share what we've been building:",
    },
    default: {
      low: "This is honestly so exciting! Can't wait to hear your thoughts on this!",
      mid: "Hey friends! Sharing something that's been on my mind lately.",
      high: "Excited to share this with you all today:",
    },
  },
  "Professional & Polished": {
    "Educational content": {
      low: "Industry insight: Here's a perspective shift that transformed my approach.",
      mid: "I'm excited to share key insights on a topic that matters to our industry.",
      high: "Three critical insights every professional should know about this:",
    },
    "Industry insights": {
      low: "Analysis: The trends shaping our industry this quarter.",
      mid: "Sharing my perspective on the evolving landscape of our field.",
      high: "Key industry trends I'm tracking and their implications:",
    },
    "Product launches": {
      low: "Proud to unveil a solution we've been refining for months.",
      mid: "I'm excited to introduce a new offering designed for professionals like you.",
      high: "Today, we're launching something that addresses a critical need:",
    },
    default: {
      low: "Perspective: Here's an approach that's proven valuable in my experience.",
      mid: "I'm excited to share insights that have shaped my professional journey.",
      high: "Key takeaways from years of experience in this field:",
    },
  },
  "Bold & Edgy": {
    "Educational content": {
      low: "Hot take: Everything you've been told about this is backwards.",
      mid: "Real talk: Here's what nobody tells you about this topic.",
      high: "Let's be honest - the old way doesn't work anymore. Here's why:",
    },
    "Motivational posts": {
      low: "Stop playing small. You're capable of so much more than you think.",
      mid: "Real talk: Your comfort zone is killing your potential.",
      high: "The truth nobody wants to hear but everyone needs:",
    },
    "Product launches": {
      low: "Finally. A solution that doesn't treat you like an idiot.",
      mid: "Real talk: We built this because everything else was trash.",
      high: "Tired of overpriced, underwhelming options? Same. Here's what we did:",
    },
    default: {
      low: "Unpopular opinion incoming, but someone needs to say it...",
      mid: "Real talk: Here's what nobody tells you about this.",
      high: "Let's cut through the noise - here's the actual truth:",
    },
  },
  "Warm & Authentic": {
    "Personal stories": {
      low: "Can I share something vulnerable with you? This has been on my heart...",
      mid: "I wanted to share something close to my heart today.",
      high: "A personal story I've been meaning to share:",
    },
    "Behind-the-scenes": {
      low: "Inviting you into a moment that meant the world to me.",
      mid: "Sharing an honest glimpse into my journey today.",
      high: "An authentic look at what really goes on behind closed doors:",
    },
    "Motivational posts": {
      low: "Your journey matters. Your story matters. You matter.",
      mid: "I see you working hard, even when no one else notices.",
      high: "A gentle reminder for anyone who needs to hear this today:",
    },
    default: {
      low: "Something's been weighing on my heart, and I wanted to share it with you.",
      mid: "I wanted to share something personal and close to my heart today.",
      high: "An honest moment I wanted to share with this community:",
    },
  },
  "Witty & Playful": {
    "Educational content": {
      low: "Plot twist: The 'right way' to do this is actually all wrong! 🤯",
      mid: "Plot twist: This actually works (I was skeptical too!).",
      high: "Spoiler alert: The secret ingredient was right in front of us all along.",
    },
    "Behind-the-scenes": {
      low: "What I thought would happen vs. what actually happened... 😅",
      mid: "The chaotic reality behind the polished Instagram feed!",
      high: "Behind every perfect post is a story you won't believe:",
    },
    "Product launches": {
      low: "New thing alert! And yes, it's cooler than it sounds 😎",
      mid: "Drumroll please... 🥁 We made something you didn't know you needed!",
      high: "Breaking news: We created something actually useful (shocking, I know).",
    },
    default: {
      low: "Well, well, well... look what we have here! Something interesting happened...",
      mid: "Plot twist: This isn't your average post about the usual stuff!",
      high: "Confession time: This turned out way differently than expected.",
    },
  },
};

export const PREVIEW_PLATFORM_SUFFIXES: Record<string, string> = {
  Instagram: "#CreatorLife",
  TikTok: "duet this if you relate!",
  LinkedIn: "Thoughts? I'd love to hear your perspective.",
  X: "Thread below 🧵",
  "Multi-platform": "",
};

export const PREVIEW_EMOJIS = ["✨", "💫", "🌟", "🚀", "💡"];

export const PREVIEW_QUESTIONS: Record<string, string[]> = {
  "Casual & Friendly": [
    " What's your experience with this?",
    " Have you tried this before?",
    " What do you think?",
  ],
  "Professional & Polished": [
    " What's your take on this approach?",
    " How do you handle this in your practice?",
    " What has your experience been?",
  ],
  "Bold & Edgy": [
    " Am I wrong?",
    " Who else feels this way?",
    " Change my mind.",
  ],
  "Warm & Authentic": [
    " Can you relate?",
    " Does this resonate with you?",
    " Have you felt this too?",
  ],
  "Witty & Playful": [" Just me?", " Anyone else?", " Too relatable?"],
};

export const PREVIEW_CTAS: Record<string, string[]> = {
  "Casual & Friendly": [
    " Drop a comment below!",
    " Let me know in the comments!",
    " Share your thoughts! 👇",
  ],
  "Professional & Polished": [
    " I'd welcome your insights in the comments.",
    " Share your perspective below.",
    " Let's discuss in the comments.",
  ],
  "Bold & Edgy": [
    " Comment now.",
    " Drop your take below.",
    " Fight me in the comments.",
  ],
  "Warm & Authentic": [
    " I'd love to hear from you. 💛",
    " Share your story below.",
    " Let's connect in the comments.",
  ],
  "Witty & Playful": [
    " Spill the tea in the comments! ☕",
    " Comments are open (for hot takes only).",
    " Tell me everything below! 👇",
  ],
};
