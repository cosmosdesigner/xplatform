import { HeroSection } from "@/components/sections/HeroSection";
import { PrerequisitesSection } from "@/components/sections/PrerequisitesSection";
import { ModuleSection } from "@/components/sections/ModuleSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function AiAgentsCourse() {
  return (
    <>
      <HeroSection />
      <PrerequisitesSection />
      <ModuleSection accent="#de3163" />
      <ResourcesSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
