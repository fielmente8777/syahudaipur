import Hero from "@/components/Hero";
import { MenuGrid, Reasons } from "@/components/Reasons";
import { Footer, MobileBar, Reserve } from "@/components/Reserve";
import Reviews, { ProofStrip } from "@/components/Reviews";
import ThePlace from "@/components/ThePlace";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <div className="w-full bg-ink font-light text-cream">
      <Hero />
      <ProofStrip />
      <Reviews />
      <Reasons />
      <MenuGrid />
      <ThePlace />
      <Visit />
      <Reserve />
      <Footer />
      <MobileBar />
    </div>
  );
}
