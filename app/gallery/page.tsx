import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import GalleryContent from "@/components/GalleryContent";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00482B] selection:text-white">
      <TopBar />
      <Navbar />
      <PageBanner
        title="Gallery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />
      <GalleryContent />
      <Footer />
    </main>
  );
}