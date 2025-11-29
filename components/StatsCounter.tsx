"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: string; // The value from Sanity (e.g., "12+", "100%")
  label: string;
};

export function StatsCounter({ stats }: { stats: Stat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Select all elements with the class .stat-value inside the container
      const statElements = gsap.utils.toArray<HTMLElement>(".stat-value");

      statElements.forEach((el) => {
        // Parse the number from the string (e.g., "12+" -> 12)
        const rawValue = el.innerText;
        const numberValue = parseFloat(rawValue.replace(/[^0-9.]/g, ""));

        // If it's not a number (e.g. just text), skip animation
        if (isNaN(numberValue)) return;

        // Create a proxy object to animate
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: numberValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Animation starts when top of stats hits 80% of viewport height
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            // Update the text, preserving the suffix (e.g., "+", "%")
            // We strip the number from the original string to get the suffix
            const suffix = rawValue.replace(/[0-9.]/g, "");

            // Format to remove decimals if the original was an integer
            const isInteger = Number.isInteger(numberValue);
            const currentVal = isInteger
              ? Math.round(proxy.val)
              : proxy.val.toFixed(1);

            el.innerText = `${currentVal}${suffix}`;
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="@container mt-12 pt-12 border-t">
      <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={`${stat.label}-${idx}`}
            className="@container/stat text-center"
          >
            {/* We add the 'stat-value' class for GSAP to target */}
            <div className="stat-value text-3xl @md/stat:text-4xl font-bold text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-xs @md/stat:text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
