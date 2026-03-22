import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Languages from "@/components/Languages";
import BlogSection from "@/components/BlogSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grain-overlay">
      <Nav />
      <Hero />
      <Features />
      <Languages />
      <BlogSection />
      <CTA />
      <Footer />
    </div>
  );
}
