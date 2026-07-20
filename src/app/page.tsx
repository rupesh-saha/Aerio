import { Hero } from "@/components/Hero";
import { ProductShelf } from "@/components/ProductShelf";
import { ComparisonTable } from "@/components/ComparisonTable";
import { EditorialHighlight } from "@/components/EditorialHighlight";
import { QuietByDesign } from "@/components/QuietByDesign";
import { SmartFeatures } from "@/components/SmartFeatures";
import { Testimonials } from "@/components/Testimonials";
import { SustainabilityStrip } from "@/components/SustainabilityStrip";
import { Faq } from "@/components/Faq";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <Hero />
      <ProductShelf />
      <ComparisonTable />
      <EditorialHighlight />
      <QuietByDesign />
      <SmartFeatures />
      <Testimonials />
      <SustainabilityStrip />
      <Faq />
      <Newsletter />
    </main>
  );
}
