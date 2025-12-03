import { FaLocationArrow } from "react-icons/fa6";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { PinContainer } from "./ui/3d-pin";

// 1. Define the Query
const PROJECTS_QUERY = defineQuery(`
  *[_type == "showcaseProject"] | order(_createdAt desc) {
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

  return (
    <section className="py-20 px-6" id="projects" aria-label="Recent Projects">
      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground">Some of my best work</p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-28 gap-10 md:gap-y-8 max-w-6xl mx-auto">
        {projects.map((item) => (
          <div
            className="h-114 sm:h-128 md:h-129 lg:h-141 xl:h-164 lg:min-h-130 flex items-center justify-center lg:w-[500px] w-[80vw]"
            key={item._id}
          >
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
                    className="z-10 absolute rounded-lg w-[95%] h-[80%] rotate-1 object-cover"
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
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
