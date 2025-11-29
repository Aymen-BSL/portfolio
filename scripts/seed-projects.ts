import { createClient } from "next-sanity";
import dotenv from "dotenv";

// Load environment variables
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

const projectsToSeed = [
  {
    _id: "showcase-project-1",
    _type: "showcaseProject",
    title: "The Wild Oasis",
    des: "A luxurious wooden cabin hotel offering an immersive booking experience with stunning cabin options, designed to establish trust and attract guests seeking a serene escape.",
    link: "https://the-wild-oasis-4-customers.vercel.app",
    // img & iconLists left empty for manual upload
  },
  {
    _id: "showcase-project-2",
    _type: "showcaseProject",
    title: "Zentry mini clone",
    des: "A scaled-down recreation of the award-winning Zentry website, featuring smooth animations, immersive visuals, and refined UI/UX inspired by an Awwwards Site of the Month.",
    link: "https://zentry-clone-nine-eta.vercel.app",
  },
  {
    _id: "showcase-project-3",
    _type: "showcaseProject",
    title: "The Roofing Website",
    des: "Professional roofing company website, showcasing services, portfolio, and client testimonials to establish trust and attract new customers.",
    link: "https://the-roofing-website.vercel.app",
  },
  {
    _id: "showcase-project-4",
    _type: "showcaseProject",
    title: "CarePulse",
    des: "A patient management system to streamline patient registration, schedule appointments, and manage medical records.",
    link: "https://care-pulse-mu-seven.vercel.app",
  },
];

async function seedProjects() {
  console.log("🚀 Seeding showcase projects...");
  const transaction = client.transaction();

  projectsToSeed.forEach((project) => {
    transaction.createOrReplace(project);
  });

  try {
    await transaction.commit();
    console.log("✅ Showcase Projects seeded successfully!");
    console.log(
      "⚠️  ACTION REQUIRED: Go to Sanity Studio to upload the Cover Image and Tech Stack Icons for each project."
    );
  } catch (err) {
    console.error("❌ Failed to seed projects:", err);
  }
}

seedProjects();
