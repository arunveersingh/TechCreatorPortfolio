import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import SocialProof from "@/components/sections/social-proof";
import Contact from "@/components/sections/contact";
import Newsletter from "@/components/sections/newsletter";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 md:gap-24">
      <Hero />
      <About />
      <SocialProof />
      <Contact />
      <Newsletter />
    </main>
  );
}
