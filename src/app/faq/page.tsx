"use client";

import { PremiumPageLayout } from "@/components/PremiumPageLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How often do I need to replace the filter?",
    a: "Under normal usage (12 hours a day on auto mode), the filter lasts approximately 6 to 8 months. The Aerio app will notify you when it's time for a replacement, and the indicator light on the unit will pulse gently."
  },
  {
    q: "How large of a room can Aerio purify?",
    a: "Aerio Pro is engineered to completely purify the air in a 1,000 sq ft room every 30 minutes, or a 500 sq ft room every 15 minutes. It is ideal for large living rooms, open-plan kitchens, and master bedrooms."
  },
  {
    q: "Is it really as quiet as you claim?",
    a: "Yes. On sleep mode, Aerio operates at just 22dB—which is literally quieter than a whisper (30dB). We achieved this through computational fluid dynamics to minimize air turbulence, combined with a custom-engineered brushless DC motor."
  },
  {
    q: "Does it emit ozone?",
    a: "Absolutely not. Aerio relies entirely on mechanical filtration (H13 True HEPA and activated carbon) to clean the air. We do not use ionizers, UV-C light, or any other technology that produces harmful ozone byproducts."
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PremiumPageLayout 
      title="Frequently Asked Questions" 
      subtitle="Everything you need to know about the product, shipping, and maintenance."
    >
      <div className="max-w-3xl mt-12">
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={cn(
                "border border-black/5 rounded-3xl overflow-hidden transition-colors duration-300",
                openIndex === i ? "bg-white shadow-sm" : "bg-white/50 hover:bg-white"
              )}
            >
              <button 
                className="flex items-center justify-between w-full p-8 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-xl font-medium text-brand-graphite pr-8">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center text-brand-graphite"
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-brand-graphite/70 leading-relaxed font-light">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center md:text-left">
          <p className="text-brand-graphite/70">
            Still have questions? <a href="/contact" className="text-brand-teal font-medium hover:underline">Contact our support team.</a>
          </p>
        </div>
      </div>
    </PremiumPageLayout>
  );
}
