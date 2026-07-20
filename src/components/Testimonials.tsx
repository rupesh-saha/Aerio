"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Aerio has completely transformed my mornings. I used to wake up congested every day, and now the air in my bedroom feels as crisp as a mountain retreat.",
    author: "Sarah J.",
    role: "Verified Buyer",
    rating: 5
  },
  {
    quote: "As an architect, I'm incredibly picky about what I bring into my home. Aerio is the first purifier I don't feel the need to hide in a corner.",
    author: "Michael T.",
    role: "Verified Buyer",
    rating: 5
  },
  {
    quote: "With three dogs, keeping the house smelling fresh was a constant battle. The Aerio Pro handles it effortlessly and operates so quietly we forget it's on.",
    author: "Elena R.",
    role: "Verified Buyer",
    rating: 5
  }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="testimonials" className="py-section-v px-margin-edge bg-brand-sand dark:bg-[#181818]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium text-brand-graphite dark:text-brand-sand-light mb-16 text-center">
          Loved by thousands.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="testimonial-card bg-white dark:bg-brand-graphite p-8 rounded-[var(--radius-product)] shadow-sm border border-black/[0.02] dark:border-white/[0.02] flex flex-col h-full">
              <div className="flex gap-1 mb-6 text-brand-teal">
                {[...Array(item.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg text-brand-graphite dark:text-brand-sand-light leading-relaxed mb-8 flex-1">
                "{item.quote}"
              </p>
              <div className="mt-auto">
                <p className="font-medium text-brand-graphite dark:text-white">
                  {item.author}
                </p>
                <p className="text-sm text-brand-graphite/60 dark:text-brand-sand-light/60">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
