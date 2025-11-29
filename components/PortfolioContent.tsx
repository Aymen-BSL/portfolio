import RecentProjects from "./RecentProjects";
import { AboutSection } from "./sections/AboutSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import ApproachSection from "./sections/ApproachSection";
import { BlogSection } from "./sections/BlogSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
// import { ProjectsSection } from "./sections/ProjectsSection";
// import { ServicesSection } from "./sections/ServicesSection";

function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      {/* <ProjectsSection /> */}
      <RecentProjects />
      <CertificationsSection />
      <AchievementsSection />
      <ApproachSection />
      {/* <ServicesSection /> */}
      <BlogSection />
      <ContactSection />
      {/*      
      <TestimonialsSection />
      */}
    </>
  );
}

export default PortfolioContent;
