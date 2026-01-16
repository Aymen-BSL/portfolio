import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { RecentProjectsClient } from "./RecentProjectsClient";

// 1. Define the Query
const PROJECTS_QUERY = defineQuery(`
  *[_type == "showcaseProject"] | order(_updatedAt desc) {
    _id,
    title,
    des,
    img,
    iconLists,
    link
  }
`);

const RecentProjects = async () => {
  // 2. Fetch Data
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  // Fallback if no projects exist
  if (!projects || projects.length === 0) return null;

  return <RecentProjectsClient projects={projects} />;
};

export default RecentProjects;
