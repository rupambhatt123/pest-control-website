import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#0b5438] selection:text-white">
      <TopBar />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}