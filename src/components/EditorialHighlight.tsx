"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EditorialHighlight() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".editorial-element", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      
      // Animate the stat number
      gsap.fromTo(".stat-number", 
        { innerText: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          innerText: 99.97,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 0.01 },
          onUpdate: function() {
            const el = document.querySelector('.stat-number');
            if (el) {
               // format to 2 decimal places
               el.innerHTML = Number(this.targets()[0].innerText).toFixed(2);
            }
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-section-v px-margin-edge bg-brand-sand dark:bg-[#151515] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Stat Callout */}
        <div className="editorial-element flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-baseline text-brand-teal mb-4">
            <span className="stat-number text-7xl md:text-9xl font-bold tracking-tighter">99.97</span>
            <span className="text-4xl md:text-6xl font-bold">%</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-medium text-brand-graphite dark:text-brand-sand-light max-w-sm">
            Removal of airborne particles down to 0.1 microns.
          </h3>
        </div>

        {/* Editorial Text */}
        <div className="flex-1 space-y-6">
          <h2 className="editorial-element text-sm font-semibold tracking-widest uppercase text-brand-graphite/60 dark:text-brand-sand/60">
            Medical-Grade Filtration
          </h2>
          <p className="editorial-element text-2xl md:text-4xl leading-tight text-brand-graphite dark:text-brand-sand-light font-medium">
            Not all HEPA is created equal. We engineered a proprietary filtration matrix that captures what others miss.
          </p>
          <p className="editorial-element text-lg text-brand-graphite/80 dark:text-brand-sand/80 max-w-lg">
            From wildfire smoke and VOCs to pet dander and microscopic allergens, the Aerio system actively monitors and neutralizes threats before you even take your next breath.
          </p>
          <div className="editorial-element pt-4">
             <button className="text-brand-teal font-medium hover:text-brand-teal/80 transition-colors inline-flex items-center gap-2 group">
               Read the Whitepaper
               <span className="transform group-hover:translate-x-1 transition-transform">→</span>
             </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
