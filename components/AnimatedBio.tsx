"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedBio({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate direct children (p, h2, h3, ul, etc.)
      const elements = containerRef.current?.children;

      if (elements) {
        gsap.fromTo(
          elements,
          {
            y: 20, // Start 20px lower
            opacity: 0, // Start invisible
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1, // Delay each line by 0.1s
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%", // Start when top of bio hits 80% of screen
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="prose prose-lg dark:prose-invert max-w-none"
    >
      {children}
    </div>
  );
}
