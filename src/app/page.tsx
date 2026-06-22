import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Services />
      <Products />
      <Testimonials />
      <Clients />
      <Footer />
    </div>
  );
}
