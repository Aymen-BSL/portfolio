import { defineField, defineType } from "sanity";

export default defineType({
  name: "approach",
  title: "Approach Phases",
  type: "document",
  fields: [
    defineField({
      name: "phase",
      title: "Phase Label",
      type: "string",
      description: "e.g., 'Phase 1'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "animationSpeed",
      title: "Animation Speed",
      type: "number",
      initialValue: 3,
    }),
    defineField({
      name: "containerClassName",
      title: "Container CSS Classes",
      type: "string",
      description:
        "Tailwind classes for background color (e.g., 'bg-yellow-600/50 rounded-3xl overflow-hidden')",
    }),
    defineField({
      name: "colors",
      title: "Canvas Colors (JSON)",
      type: "string",
      description:
        "Enter colors as a JSON array of arrays, e.g., [[125, 211, 252]]. Supports opacity.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Phase Order",
      name: "phaseOrder",
      by: [{ field: "phase", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "phase",
    },
  },
});
