import { defineField, defineType } from "sanity";

export default defineType({
  name: "showcaseProject", // Unique name
  title: "Showcase Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "des",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "img",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconLists",
      title: "Tech Stack Icons",
      description: "Upload logos for technologies used (React, Tailwind, etc.)",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "link",
      title: "Live Site URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "img",
    },
  },
});
