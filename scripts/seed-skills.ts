import { createClient } from "next-sanity";
import dotenv from "dotenv";

// Load environment variables from .env.local or .env if running standalone
dotenv.config({ path: ".env.local" });
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing required environment variables.");
  console.error(
    "   Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN are set in your .env file."
  );
  process.exit(1);
}

// 1. Data to import
const skillsToSeed = [
  {
    _id: "skill-cat-programming",
    _type: "skillCategory",
    category: "Programming Languages",
    items: ["TypeScript", "JavaScript", "SQL", "MySQL"],
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
  },
  {
    _id: "skill-cat-web-dev",
    _type: "skillCategory",
    category: "Web Development",
    items: ["Next.js", "React", "Tailwind CSS", "GSAP"],
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
  },
  {
    _id: "skill-cat-backend",
    _type: "skillCategory",
    category: "Backend & Database",
    items: ["PostgreSQL", "Supabase", "Prisma", "Neon DB"],
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>`,
  },
  {
    _id: "skill-cat-ai",
    _type: "skillCategory",
    category: "AI & Tools",
    items: ["Google AI", "n8n", "Git", "GitHub"],
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>`,
  },
];

async function createSkills() {
  // Configured client using your .env variables
  const client = createClient({
    projectId,
    dataset,
    token, // We need the write token to create documents
    apiVersion: "2024-01-01",
    useCdn: false, // We are writing data, so bypass CDN
  });

  console.log("🚀 Starting skill seed...");
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}`);

  const transaction = client.transaction();

  skillsToSeed.forEach((skill) => {
    transaction.createOrReplace(skill);
  });

  try {
    await transaction.commit();
    console.log("✅ Skills seeded successfully!");
  } catch (err) {
    console.error("❌ Data seed failed:", err);
  }
}

createSkills();
