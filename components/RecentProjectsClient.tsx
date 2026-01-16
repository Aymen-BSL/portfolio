"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { PinContainer } from "./ui/3d-pin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface Project {
  _id: string;
  title?: string | null;
  des?: string | null;
  img?: any;
  iconLists?: any[] | null;
  link?: string | null;
}

interface RecentProjectsClientProps {
  projects: Project[];
}

const MAX_VISIBLE_PROJECTS = 4;

export function RecentProjectsClient({ projects }: RecentProjectsClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const visibleProjects = projects.slice(0, MAX_VISIBLE_PROJECTS);
  const hasMoreProjects = projects.length > MAX_VISIBLE_PROJECTS;

  return (
    <>
      <section
        className="py-20 px-6"
        id="projects"
        aria-label="Recent Projects"
      >
        <div className="text-center mb-4 max-md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-28 gap-20 md:gap-y-8 max-w-6xl mx-auto">
          {visibleProjects.map((item) => (
            <ProjectCard key={item._id} item={item} />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setModalOpen(true)}
              className="relative inline-flex overflow-hidden rounded-lg p-px group"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]
                bg-[conic-gradient(from_90deg_at_50%_50%,#4b6cb7_0%,#13162D_50%,#4b6cb7_100%)]"
              />
              <span
                className="inline-flex h-full w-full cursor-pointer items-center 
                justify-center rounded-lg bg-gradient-to-br from-[#4b6cb7] via-[#243b80] to-[#13162c] 
                px-8 py-3 text-lg font-medium text-white backdrop-blur-3xl transition-all duration-300 
                group-hover:scale-105 active:scale-95"
              >
                Show More Projects
              </span>
            </button>
          </div>
        )}
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle className="text-3xl md:text-4xl font-bold text-center mb-2">
              All Projects
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              Explore all {projects.length} of my projects
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap justify-center gap-x-28 gap-20 md:gap-y-8 max-w-6xl mx-auto mt-6">
            {projects.map((item) => (
              <ProjectCard key={item._id} item={item} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProjectCard({ item }: { item: Project }) {
  return (
    <div className="h-114 sm:h-128 md:h-129 lg:h-141 xl:h-164 lg:min-h-130 flex items-center justify-center lg:w-[500px] w-[80vw]">
      <PinContainer
        title={item.title!}
        href={item.link!}
        link={item.link!}
        cardId={+item._id!}
      >
        <div
          className="relative flex items-center justify-center sm:w-[540px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10"
          aria-label={`Project preview for ${item.title}`}
        >
          <div
            className="relative w-full h-full overflow-hidden lg:rounded-3xl"
            style={{ backgroundColor: "#13162D" }}
          >
            <img src="/bg.png" alt="background image" />
          </div>

          {/* Dynamic Cover Image */}
          {item.img && (
            <img
              src={urlFor(item.img).url()}
              alt={`Cover image for ${item.title}`}
              className="z-10 absolute rounded-lg w-[95%] h-[84%] rotate-1 object-cover"
            />
          )}
        </div>

        <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
          {item.title}
        </h1>

        <p
          className="lg:text-lg lg:font-normal font-light text-sm line-clamp-3 text-muted-foreground dark:text-[#BEC1DD]"
          style={{ margin: "1vh 0" }}
        >
          {item.des}
        </p>

        <div className="flex items-center justify-between mt-7 mb-3">
          <div className="flex items-center">
            {/* Dynamic Tech Icons */}
            {item.iconLists &&
              item.iconLists.map((icon: any, index: number) => (
                <div
                  key={index}
                  className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index + 2}px)`,
                  }}
                >
                  <img
                    src={urlFor(icon).url()}
                    alt={`Technology icon ${index + 1}`}
                    className="p-2"
                  />
                </div>
              ))}
          </div>

          {/* View Link - Using anchor tag for Server Component compatibility */}
          <a
            href={item.link!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            aria-label={`Visit ${item.title} live site`}
          >
            <p className="flex lg:text-xl md:text-xs text-sm text-purple">
              Check Live Site
            </p>
            <FaLocationArrow className="ms-3" color="#CBACF9" />
          </a>
        </div>
      </PinContainer>
    </div>
  );
}
