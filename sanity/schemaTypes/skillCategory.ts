import { defineField, defineType } from "sanity";

export default defineType({
  name: "skillCategory", // Unique name to avoid conflict with "skill"
  title: "Skill Categories (Marquee)",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category Name",
      type: "string",
      description: "e.g. 'Web Development'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Skill Items",
      type: "array",
      of: [{ type: "string" }],
      description: "List of skills (e.g. 'React', 'Next.js')",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "icon",
      title: "Icon SVG Code",
      type: "text",
      rows: 5,
      description: "Paste the full <svg>...</svg> code here.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "category",
      items: "items",
    },
    prepare(selection) {
      const { title, items } = selection;
      return {
        title: title,
        subtitle: items ? items.join(", ") : "No items",
      };
    },
  },
});
