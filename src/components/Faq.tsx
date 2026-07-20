"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How often do I need to replace the filters?",
    answer: "Our advanced filter tracking calculates actual usage rather than just time. On average with continuous use, filters last between 9-12 months. The app will notify you when it's time for a replacement."
  },
  {
    question: "Is it safe to leave running 24/7?",
    answer: "Absolutely. Aerio is designed for continuous operation. In fact, leaving it in 'Auto' mode 24/7 is the most efficient way to maintain pristine air quality while minimizing energy consumption."
  },
  {
    question: "How much energy does Aerio consume?",
    answer: "Aerio uses a highly efficient DC motor. Even on its highest setting, it consumes less energy than a standard LED light bulb (about 30W maximum, and typically around 5W in Sleep mode)."
  },
  {
    question: "Can I control multiple units from one app?",
    answer: "Yes, the Aerio app supports an unlimited number of units. You can group them by room, set schedules independently, or control them all at once."
  }
];

export function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="faq" className="py-section-v px-margin-edge bg-brand-sand-light dark:bg-brand-graphite">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[length:var(--text-headline-section)] leading-[var(--text-headline-section--line-height)] tracking-[var(--text-headline-section--letter-spacing)] font-medium text-brand-graphite dark:text-brand-sand-light mb-12 text-center">
          Common Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="faq-item bg-white dark:bg-[#1f1f1f] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-black/10 dark:hover:border-white/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-brand-graphite dark:text-brand-sand-light pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-brand-graphite/40 dark:text-brand-sand/40 transition-transform duration-300",
                      isOpen && "transform rotate-180 text-brand-teal"
                    )} 
                  />
                </button>
                <div 
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-brand-graphite/70 dark:text-brand-sand/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
