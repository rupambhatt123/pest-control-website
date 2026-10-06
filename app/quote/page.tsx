import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import QuoteContent from "@/components/QuoteContent";
import Footer from "@/components/Footer";

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00482B] selection:text-white">
      <TopBar />
      <Navbar />
      <PageBanner
        title="Get a Quote"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get a Quote" },
        ]}
      />
      <QuoteContent />
      <Footer />
    </main>
  );
}