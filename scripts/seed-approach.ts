import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const approachesToSeed = [
  {
    _id: "approach-phase-1",
    _type: "approach",
    phase: "Phase 1",
    title: "Strategic Discovery & Research",
    description:
      "Every successful project begins with deep understanding. Drawing on my research background in intelligent systems, I prioritize analyzing the core problem and user needs before writing a single line of code. I focus on designing user-centric interfaces that ensure the final solution is intuitive and aligned with business goals.",
    animationSpeed: 3,
    containerClassName: "bg-yellow-600/50 rounded-3xl overflow-hidden",
    colors: JSON.stringify([[202, 138, 4, 0.6]]),
  },
  {
    _id: "approach-phase-2",
    _type: "approach",
    phase: "Phase 2",
    title: "Agile Development & Collaboration",
    description:
      "I believe in building scalable systems through iterative development and active collaboration. Whether working independently or coordinating with backend teams, I maintain open communication to ensure seamless integration and rapid adaptation to feedback. My focus is on writing clean, modular code that supports long-term growth and performance.",
    animationSpeed: 3,
    containerClassName: "bg-purple-500/20 rounded-3xl overflow-hidden",
    colors: JSON.stringify([[168, 85, 247]]),
  },
  {
    _id: "approach-phase-3",
    _type: "approach",
    phase: "Phase 3",
    title: "Innovation & Efficiency",
    description:
      "Delivery is not just about functionality; it is about impact. I strive to enhance efficiency by integrating intelligent automation into workflows, reducing manual friction for end-users. My goal is to deliver innovative solutions that secure real-world value, a mindset that has helped me lead teams to win competitive hackathons.",
    animationSpeed: 3,
    containerClassName: "bg-[#243b80] rounded-3xl overflow-hidden",
    colors: JSON.stringify([[100, 150, 200, 0.8]]),
  },
];

async function seedApproach() {
  console.log("🚀 Seeding approach section...");
  const transaction = client.transaction();

  approachesToSeed.forEach((item) => {
    transaction.createOrReplace(item);
  });

  try {
    await transaction.commit();
    console.log("✅ Approach phases seeded successfully!");
  } catch (err) {
    console.error("❌ Failed to seed approach:", err);
  }
}

seedApproach();
