import { PremiumPageLayout } from "@/components/PremiumPageLayout";
import { Download } from "lucide-react";

export default function PressPage() {
  return (
    <PremiumPageLayout 
      title="Press" 
      subtitle="For media inquiries, interview requests, and access to our digital media kit."
    >
      <div className="grid lg:grid-cols-2 gap-16 mt-12 items-start">
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-graphite/50 mb-6">Latest Coverage</h2>
            <div className="flex flex-col gap-8">
              <a href="#" className="group">
                <p className="text-brand-teal font-medium mb-2">The Verge</p>
                <h3 className="text-2xl font-medium text-brand-graphite group-hover:text-brand-teal transition-colors">"Aerio Pro is the first air purifier that actually looks good in a living room."</h3>
              </a>
              <a href="#" className="group">
                <p className="text-brand-teal font-medium mb-2">Wired</p>
                <h3 className="text-2xl font-medium text-brand-graphite group-hover:text-brand-teal transition-colors">"An absolute triumph of industrial design and medical-grade engineering."</h3>
              </a>
              <a href="#" className="group">
                <p className="text-brand-teal font-medium mb-2">Fast Company</p>
                <h3 className="text-2xl font-medium text-brand-graphite group-hover:text-brand-teal transition-colors">"How this ex-Apple team is disrupting the stagnant indoor air quality market."</h3>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-black/5 shadow-sm">
          <h2 className="text-2xl font-medium text-brand-graphite mb-4">Media Kit</h2>
          <p className="text-brand-graphite/70 mb-8">
            Download our press kit for high-resolution product photography, lifestyle imagery, brand guidelines, and executive headshots.
          </p>
          <button className="flex items-center justify-center gap-3 w-full py-4 bg-brand-graphite text-white rounded-full font-medium hover:bg-black transition-colors">
            <Download className="w-5 h-5" /> Download Media Kit (ZIP)
          </button>
          
          <div className="mt-12 pt-8 border-t border-black/5">
            <h3 className="font-medium text-brand-graphite mb-2">Press Contact</h3>
            <a href="mailto:press@aerio.com" className="text-brand-teal hover:underline">press@aerio.com</a>
          </div>
        </div>
      </div>
    </PremiumPageLayout>
  );
}
