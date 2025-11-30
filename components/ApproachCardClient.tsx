"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const ClientCard = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/20 group/canvas-card flex items-center justify-center
       dark:border-white/20 max-w-sm w-full mx-auto p-4 relative lg:h-140 rounded-3xl bg-muted/30"
      style={{
        // Uses your brand gradient
        backgroundColor: "linear-gradient(90deg, #4b6cb7 0%, #13162D 100%)",
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className={`text-center ${
            hovered ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          } absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          transition duration-200 min-w-40 mx-auto flex items-center justify-center`}
        >
          {icon}
        </div>
        <h2
          className={`dark:text-white text-center text-3xl ${
            hovered ? "opacity-100 -translate-y-2" : "opacity-0 translate-y-0"
          } relative z-10 text-black mt-4 font-bold 
          group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 
          transition duration-200`}
        >
          {title}
        </h2>
        <p
          className={`text-sm ${
            hovered ? "opacity-100 -translate-y-2" : "opacity-0 translate-y-0"
          } relative z-10 mt-4 group-hover/canvas-card:text-white text-center text-balance 
          group-hover/canvas-card:-translate-y-2 transition duration-200 text-black/75 bg-black/30 py-6 px-4 rounded-xl`}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

export const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-lg p-px ">
        <span
          className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]
          bg-[conic-gradient(from_90deg_at_50%_50%,#4b6cb7_0%,#13162D_50%,#4b6cb7_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-lg bg-linear-to-br from-[#4b6cb7] via-[#243b80] to-[#13162c] px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
