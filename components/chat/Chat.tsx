"use client";

import { CHAT_PROFILE_QUERYResult } from "@/sanity.types";
import { useSidebar } from "../ui/sidebar";

function Chat({ profile }: { profile: CHAT_PROFILE_QUERYResult | null }) {
  const { toggleSidebar } = useSidebar();

  // Generate greeting based on available profile data
  const getGreeting = () => {
    if (!profile?.firstName) {
      return "Hi there! Ask me anything about my work, experience, or projects.";
    }

    // The .filter(Boolean) removes all falsy values from the array, so if the firstName or lastName is not set, it will be removed
    const fullName = [profile.firstName, profile.lastName]
      .filter(Boolean)
      .join(" ");

    return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
  };

  return (
    <div className="h-full p-4 py flex flex-col justify-between items-start">
      <button type="button" onClick={toggleSidebar} className="cursor-pointer">
        X
      </button>
      <h1 className="text-black dark:text-primary text-xl self-center">
        Ai Chat-Twin is Coming Soon
      </h1>
    </div>
  );
}

export default Chat;
