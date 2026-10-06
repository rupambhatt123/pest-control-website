import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00482B] selection:text-white">
      <TopBar />
      <Navbar />
      <PageBanner
        title="Blog"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <Blog />
      <Footer />
    </main>
  );
}