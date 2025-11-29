import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { AceternityIcon, ClientCard } from "../ApproachCardClient";
import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";

/* interface ApproachItem {
  _id: string;
  phase: string;
  title: string;
  description: string;
  animationSpeed?: number;
  containerClassName?: string;
  colors?: string; // This comes as a stringified JSON from Sanity
} */

const APPROACH_QUERY = defineQuery(`
  *[_type == "approach"] | order(phase asc) {
    _id,
    phase,
    title,
    description,
    animationSpeed,
    containerClassName,
    colors
  }
`);

const ApproachSection = async () => {
  const { data: approaches } = await sanityFetch({ query: APPROACH_QUERY });

  if (!approaches || approaches.length === 0) return null;

  return (
    <section
      id="approach"
      className="max-w-6xl py-20 mx-auto px-6"
      aria-label="Our Approach"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Approach</h2>
        <p className="text-xl text-muted-foreground">
          How I turn ideas into reality
        </p>
      </div>

      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {approaches.map((item) => (
          <ClientCard
            key={item._id}
            title={item.title!}
            icon={<AceternityIcon order={item.phase!} />}
            des={item.description!}
          >
            <CanvasRevealEffect
              animationSpeed={item.animationSpeed || 3}
              containerClassName={item.containerClassName!}
              // Parse the JSON string from Sanity back into the required number[][] format
              colors={item.colors ? JSON.parse(item.colors) : [[125, 211, 252]]}
              dotSize={2}
            />
          </ClientCard>
        ))}
      </div>
    </section>
  );
};

export default ApproachSection;
