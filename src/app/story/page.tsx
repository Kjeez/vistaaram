import { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import StoryHero from "@/components/sections/story/StoryHero";
import StoryChapter from "@/components/sections/story/StoryChapter";
import PanditNetwork from "@/components/sections/story/PanditNetwork";
import StoryTimeline from "@/components/sections/story/StoryTimeline";
import Founders from "@/components/sections/story/Founders";
import ValuesStrip from "@/components/sections/story/ValuesStrip";
import StoryCTA from "@/components/sections/story/StoryCTA";
import PahadiDivider from "@/components/ui/PahadiDivider";
import PageTransition from "@/components/ui/PageTransition";
import { ourStoryContent } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Story | Vistaaram",
  description: "The journey of Vistaaram, from the sacred temples of Devbhoomi to your home.",
};

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-[#FAF6EE]">
          <StoryHero />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <StoryChapter 
            number={ourStoryContent.chapters[0].number}
            title={ourStoryContent.chapters[0].title}
            body={ourStoryContent.chapters[0].body}
            image={ourStoryContent.chapters[0].image}
            pullQuote={ourStoryContent.chapters[0].pullQuote}
            dhams={ourStoryContent.chapters[0].dhams}
            reverse={false}
          />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <StoryChapter 
            number={ourStoryContent.chapters[1].number}
            title={ourStoryContent.chapters[1].title}
            body={ourStoryContent.chapters[1].body}
            image={ourStoryContent.chapters[1].image}
            pullQuote={ourStoryContent.chapters[1].pullQuote}
            dhams={ourStoryContent.chapters[1].dhams}
            reverse={true}
          />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <PanditNetwork />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <StoryTimeline />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <Founders />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <ValuesStrip />
          
          <StoryCTA />
          
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
