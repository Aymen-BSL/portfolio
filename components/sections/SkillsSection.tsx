import React from "react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

// 1. Update Query to target "skillCategory"
const SKILLS_QUERY = defineQuery(`
  *[_type == "skillCategory"] | order(_createdAt asc) {
    category,
    items,
    icon
  }
`);

// 2. Define Type (allowing for nulls from Sanity)
type SkillCategoryData = {
  category: string | null;
  items: string[] | null;
  icon: string | null;
};

const SkillsSection = async () => {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `,
        }}
      />

      <section
        id="skills"
        className="relative w-0 min-w-full overflow-hidden py-10"
      >
        {/* Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-white/80 dark:from-black/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-white/80 dark:from-black/80 to-transparent" />

        {/* The Track */}
        <div className="flex w-fit animate-infinite-scroll hover:paused">
          {[...skills, ...skills].map((skill: SkillCategoryData, index) => (
            <div
              key={`${skill.category ?? "cat"}-${index}`}
              className="group mx-4 flex items-center gap-4 whitespace-nowrap rounded-lg border px-6 py-3 transition-colors duration-300 hover:border-[#4b6cb7] bg-card"
            >
              <div
                className="text-primary transition-colors duration-300 group-hover:text-[#4b6cb7] w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5"
                dangerouslySetInnerHTML={{ __html: skill.icon ?? "" }}
              />

              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-primary">
                  {skill.category ?? "Uncategorized"}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {(skill.items ?? []).join(" • ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SkillsSection;
