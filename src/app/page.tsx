import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Advantages } from "@/components/Advantages";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Advantages />
      <Faq />
      <Footer />
    </main>
  );
}
