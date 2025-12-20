import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    try {
        console.log('🌱 Starting seed...');

        // Cleanup existing data
        await prisma.generatedCaption.deleteMany();
        await prisma.user.deleteMany();

        // Create a test user
        const user = await prisma.user.create({
            data: {
                id: 'cm4vyl1k000000100abcdefgh', // specific ID for reproducibility
                name: 'Test User',
                email: 'test@example.com',
                emailVerified: true,
                image: 'https://github.com/shadcn.png',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        console.log(`Created user: ${user.name} (${user.id})`);

        // Create generated captions for the user
        const captions = [
            {
                content: "Discover the magic of minimalism. ✨ #MinimalistDesign #InteriorInspo",
                userId: user.id,
                platform: "instagram",
                length: "short",
                style: "minimalist"
            },
            {
                content: "Boost your productivity with these simple tips! 🚀 #ProductivityHacks #WorkSmart",
                userId: user.id,
                platform: "twitter",
                length: "medium",
                style: "professional"
            },
            {
                content: "Sunday vibes. ☕️ #SundayFunday #CoffeeLovers",
                userId: user.id,
                platform: "instagram",
                length: "short",
                style: "casual"
            }
        ];

        for (const caption of captions) {
            await prisma.generatedCaption.create({
                data: caption
            });
        }

        console.log(`Created ${captions.length} captions for user ${user.name}`);
        console.log('✅ Seed completed successfully');

    } catch (e) {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();