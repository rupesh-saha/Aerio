import { PremiumPageLayout } from "@/components/PremiumPageLayout";
import { ShieldCheck } from "lucide-react";

export default function WarrantyPage() {
  return (
    <PremiumPageLayout 
      title="Warranty" 
      subtitle="Engineered for longevity. Backed by our comprehensive coverage."
    >
      <div className="max-w-3xl mt-12 bg-white p-10 md:p-14 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-brand-teal" />
          </div>
          <h2 className="text-3xl font-medium text-brand-graphite">5-Year Limited Warranty</h2>
        </div>

        <div className="prose prose-lg text-brand-graphite/80 leading-relaxed font-light max-w-none">
          <p className="mb-8">
            Aerio Inc. ("Aerio") warrants the motor and electronic components of your air purifier to be free from defects in material and workmanship for a period of <strong>five (5) years</strong> from the date of original purchase, when used for normal household purposes in accordance with the User Manual.
          </p>

          <h3 className="text-xl font-medium text-brand-graphite mb-4">What is Covered</h3>
          <ul className="mb-8 space-y-2 list-disc pl-5">
            <li>The internal brushless DC motor.</li>
            <li>The printed circuit boards (PCBs) and electronic controls.</li>
            <li>The touch interface and LED display elements.</li>
          </ul>

          <h3 className="text-xl font-medium text-brand-graphite mb-4">What is Not Covered</h3>
          <ul className="mb-8 space-y-2 list-disc pl-5">
            <li>Replacement filters (HEPA and Carbon), which are consumable items.</li>
            <li>Damage caused by misuse, abuse, or improper maintenance.</li>
            <li>Cosmetic damage, including scratches, dents, and broken plastic on parts that do not affect the operation of the machine.</li>
            <li>Units purchased from unauthorized resellers.</li>
          </ul>

          <h3 className="text-xl font-medium text-brand-graphite mb-4">Claim Process</h3>
          <p>
            To make a warranty claim, please contact us at warranty@aerio.com with your proof of purchase and a description of the issue. If the defect is covered under this warranty, we will repair or replace the unit at our discretion, free of charge (including shipping costs).
          </p>
        </div>
      </div>
    </PremiumPageLayout>
  );
}
