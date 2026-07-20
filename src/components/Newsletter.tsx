"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".newsletter-element", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
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
    <section ref={sectionRef} className="py-section-v px-margin-edge bg-white dark:bg-[#111]">
      <div className="max-w-4xl mx-auto bg-brand-sand dark:bg-[#1a1a1a] rounded-[var(--radius-product)] p-12 md:p-20 text-center flex flex-col items-center">
        <h2 className="newsletter-element text-3xl md:text-4xl font-medium text-brand-graphite dark:text-brand-sand-light mb-4 text-balance">
          Breathe the difference first.
        </h2>
        <p className="newsletter-element text-lg text-brand-graphite/70 dark:text-brand-sand/80 mb-10 max-w-md mx-auto">
          Join our newsletter for early access to new products, filter replacement discounts, and tips for a healthier home.
        </p>
        
        <form className="newsletter-element w-full max-w-md flex flex-col sm:flex-row gap-3 relative" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 h-14 px-6 rounded-[var(--radius-input)] bg-white dark:bg-black border border-black/10 dark:border-white/10 text-brand-graphite dark:text-brand-sand-light placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 transition-all"
            required
          />
          <button 
            type="submit"
            className="h-14 px-8 rounded-[var(--radius-input)] bg-brand-teal text-white font-medium hover:bg-brand-teal/90 transition-colors flex items-center justify-center gap-2 group"
          >
            Subscribe
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <p className="newsletter-element mt-6 text-sm text-brand-graphite/40 dark:text-brand-sand/40">
          We respect your inbox. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
