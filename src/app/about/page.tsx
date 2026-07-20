import { PremiumPageLayout } from "@/components/PremiumPageLayout";
import Image from "next/image";

export default function AboutPage() {
  return (
    <PremiumPageLayout 
      title="About Us" 
      subtitle="We are a collective of obsessive engineers, designers, and health advocates rethinking the air we breathe."
    >
      <div className="mt-12 flex flex-col gap-16 md:gap-24">
        {/* Main Image */}
        <div className="w-full relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden bg-brand-graphite shadow-sm border border-black/5">
          <Image 
            src="/about-studio.png" 
            alt="Aerio Design Studio" 
            fill 
            className="object-cover opacity-90 mix-blend-screen hover:scale-105 transition-transform duration-1000 ease-out"
            priority
          />
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start max-w-5xl mx-auto">
          <div className="md:col-span-5">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-brand-graphite leading-tight md:sticky md:top-32">
              Driven by a singular, uncompromising vision.
            </h2>
          </div>
          <div className="md:col-span-7 prose prose-lg text-brand-graphite/70 leading-relaxed font-light">
            <p className="mb-6 text-xl text-brand-graphite font-medium">
              We believe that health and aesthetics should never be a compromise.
            </p>
            <p className="mb-6">
              In 2023, a team of former aerospace engineers and industrial designers came together to rethink indoor air quality from the ground up. We were tired of the noisy, utilitarian boxes that dominated the market—appliances that you felt compelled to hide in the corner rather than proudly display.
            </p>
            <p className="mb-6">
              Aerio was founded on a very simple principle: world-class performance wrapped in an invisible, silent footprint. We spent two rigorous years developing our proprietary whisper-quiet bionic fan technology and pairing it with a massive, medical-grade H13 HEPA filtration system. We then encased it all in a sculptural, minimalist form factor inspired by high-end furniture.
            </p>
            <p>
              Today, Aerio is trusted by leading allergists, pediatricians, and design aficionados alike, setting an entirely new standard for what an air purifier can—and should—be. Our mission remains singular: to make the air you breathe as pure and beautiful as the space you live in.
            </p>
          </div>
        </div>
      </div>
    </PremiumPageLayout>
  );
}
