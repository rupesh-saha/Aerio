"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf } from "lucide-react";

export function SustainabilityStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".sus-element", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-margin-edge bg-brand-graphite text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 sus-element">
          <div className="flex items-center gap-3 mb-4 text-brand-teal">
            <Leaf className="w-6 h-6" />
            <span className="font-semibold tracking-widest uppercase text-sm">Designed for Tomorrow</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-brand-sand-light">
            Breathe easy. We all do.
          </h2>
          <p className="text-brand-sand/70 text-lg max-w-lg">
            Aerio units are built with 75% recycled aerospace-grade aluminum. Our filters use 100% biodegradable frames, and we offset all shipping carbon emissions.
          </p>
        </div>
        
        <div className="flex gap-12 sus-element">
          <div>
            <p className="text-4xl font-bold text-brand-teal mb-2">75%</p>
            <p className="text-sm text-brand-sand/60 uppercase tracking-wider">Recycled Materials</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-brand-teal mb-2">100%</p>
            <p className="text-sm text-brand-sand/60 uppercase tracking-wider">Carbon Neutral</p>
          </div>
        </div>
      </div>
    </section>
  );
}
