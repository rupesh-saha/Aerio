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
import { getProducts } from "./actions";

export default async function Home() {
  const products = await getProducts();
  const homepageSlugs = ['aerio-pro', 'aerio-core', 'aerio-nano'];
  const homepageProducts = products
    .filter(p => homepageSlugs.includes(p.slug))
    .sort((a, b) => homepageSlugs.indexOf(a.slug) - homepageSlugs.indexOf(b.slug));

  return (
    <main className="flex-1 w-full">
      <Hero />
      <ProductShelf initialProducts={homepageProducts} />
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
