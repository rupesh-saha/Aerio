"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

const specs = [
  { feature: "Room Coverage", mini: "Up to 400 sq ft", classic: "Up to 800 sq ft", pro: "Up to 1,200 sq ft" },
  { feature: "HEPA Grade", mini: "True HEPA H13", classic: "True HEPA H13", pro: "Medical Grade H14" },
  { feature: "Noise Level (Min)", mini: "22 dB", classic: "20 dB", pro: "18 dB" },
  { feature: "Smart Sensors", mini: false, classic: true, pro: true },
  { feature: "VOC Filtration", mini: "Basic", classic: "Advanced", pro: "Pro-Grade Carbon" },
  { feature: "App Control", mini: true, classic: true, pro: true },
];

export function ComparisonTable() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".spec-row", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="specs" className="py-section-v px-margin-edge bg-brand-sand-light dark:bg-brand-graphite">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[length:var(--text-headline-section)] leading-[var(--text-headline-section--line-height)] tracking-[var(--text-headline-section--letter-spacing)] font-medium text-center text-brand-graphite dark:text-brand-sand-light mb-16">
          Which one is right for you?
        </h2>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="py-4 px-4 font-medium text-brand-graphite/50 dark:text-brand-sand-light/50 w-1/4">Feature</th>
                <th className="py-4 px-4 font-semibold text-lg text-brand-graphite dark:text-brand-sand-light w-1/4">Aerio Mini</th>
                <th className="py-4 px-4 font-semibold text-lg text-brand-graphite dark:text-brand-sand-light w-1/4">Aerio</th>
                <th className="py-4 px-4 font-semibold text-lg text-brand-teal w-1/4">Aerio Pro</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, i) => (
                <tr key={i} className="spec-row border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-medium text-brand-graphite dark:text-brand-sand-light">
                    {spec.feature}
                  </td>
                  <td className="py-4 px-4 text-brand-graphite/80 dark:text-brand-sand-light/80">
                    {typeof spec.mini === 'boolean' ? (spec.mini ? <Check className="w-5 h-5 text-brand-teal" /> : <span className="text-brand-graphite/30">-</span>) : spec.mini}
                  </td>
                  <td className="py-4 px-4 text-brand-graphite/80 dark:text-brand-sand-light/80">
                    {typeof spec.classic === 'boolean' ? (spec.classic ? <Check className="w-5 h-5 text-brand-teal" /> : <span className="text-brand-graphite/30">-</span>) : spec.classic}
                  </td>
                  <td className="py-4 px-4 font-medium text-brand-graphite dark:text-brand-sand-light">
                    {typeof spec.pro === 'boolean' ? (spec.pro ? <Check className="w-5 h-5 text-brand-teal" /> : <span className="text-brand-graphite/30">-</span>) : spec.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
