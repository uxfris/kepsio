import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed data for development
  console.log("Seeding database...");

  // Seed platforms
  const platforms = await prisma.platform.createMany({
    data: [
      {
        name: "Instagram",
        network: "instagram",
        description: "Visual storytelling & engagement",
      },
      {
        name: "TikTok",
        network: "tiktok",
        description: "Short-form video content",
      },
      {
        name: "LinkedIn",
        network: "linkedin",
        description: "Professional networking",
      },
      {
        name: "X",
        network: "x",
        description: "Real-time conversations",
      },
      {
        name: "Multi-platform",
        network: null,
        description: "Cross-platform strategy",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${platforms.count} platforms`);

  // Seed brand tones
  const tones = await prisma.brandTone.createMany({
    data: [
      {
        name: "Casual & Friendly",
        emoji: "🌟",
        description: "Approachable and conversational",
        example: "Hey friends! Let me tell you about...",
      },
      {
        name: "Professional & Polished",
        emoji: "💼",
        description: "Authoritative and credible",
        example: "I'm excited to share insights on...",
      },
      {
        name: "Bold & Edgy",
        emoji: "🔥",
        description: "Confident and attention-grabbing",
        example: "Real talk: here's what nobody tells you...",
      },
      {
        name: "Warm & Authentic",
        emoji: "💛",
        description: "Personal and genuine",
        example: "I wanted to share something close to my heart...",
      },
      {
        name: "Witty & Playful",
        emoji: "😄",
        description: "Clever and entertaining",
        example: "Plot twist: this actually works...",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${tones.count} brand tones`);

  // Seed content types
  const contentTypes = await prisma.contentType.createMany({
    data: [
      { name: "Product launches" },
      { name: "Behind-the-scenes" },
      { name: "Educational content" },
      { name: "Personal stories" },
      { name: "Motivational posts" },
      { name: "Promotional content" },
      { name: "Industry insights" },
      { name: "Tips & tutorials" },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${contentTypes.count} content types`);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
