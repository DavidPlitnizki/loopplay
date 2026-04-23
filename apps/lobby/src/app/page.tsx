import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Games } from "@/components/landing/Games";
import { Features } from "@/components/landing/Features";
import { Leaderboard } from "@/components/landing/Leaderboard";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      <Navbar />
      <Hero />
      <Games />
      <Features />
      <Leaderboard />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
