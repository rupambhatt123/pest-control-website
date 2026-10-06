import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00482B] selection:text-white">
      <TopBar />
      <Navbar />
      <PageBanner
        title="Services"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <ServicesGrid />
      <Footer />
    </main>
  );
}