import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import FaqContent from "@/components/FaqContent";
import Footer from "@/components/Footer";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00482B] selection:text-white">
      <TopBar />
      <Navbar />
      <PageBanner
        title="FAQ"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <FaqContent />
      <Footer />
    </main>
  );
}