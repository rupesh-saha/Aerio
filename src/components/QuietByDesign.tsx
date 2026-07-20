"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sounds = [
  { name: "Whisper", db: 30, color: "bg-brand-sand dark:bg-white/10" },
  { name: "Library", db: 40, color: "bg-brand-sand dark:bg-white/10" },
  { name: "Aerio Pro (Sleep)", db: 18, color: "bg-brand-teal text-white font-bold" },
  { name: "Normal Conversation", db: 60, color: "bg-brand-sand dark:bg-white/10" },
];

export function QuietByDesign() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".quiet-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".sound-bar", {
        scrollTrigger: {
          trigger: ".sound-chart",
          start: "top 80%",
        },
        width: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
      
      gsap.from(".sound-label", {
        scrollTrigger: {
          trigger: ".sound-chart",
          start: "top 80%",
        },
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.4
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-section-v px-margin-edge bg-white dark:bg-brand-graphite">
      <div className="max-w-4xl mx-auto">
        <div className="quiet-header text-center mb-16">
          <h2 className="text-[length:var(--text-headline-section)] leading-[var(--text-headline-section--line-height)] tracking-[var(--text-headline-section--letter-spacing)] font-medium text-brand-graphite dark:text-brand-sand-light mb-6 text-balance">
            So quiet, you'll forget it's there.
          </h2>
          <p className="text-xl text-brand-graphite/70 dark:text-brand-sand/80 max-w-2xl mx-auto text-balance">
            Our aerospace-inspired fan geometry moves more air at lower RPMs, resulting in a sound profile that's literally quieter than a whisper.
          </p>
        </div>

        <div className="sound-chart mt-16 space-y-6">
          {sounds.sort((a, b) => a.db - b.db).map((sound, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="sound-label w-32 md:w-48 text-right text-sm md:text-base font-medium text-brand-graphite dark:text-brand-sand-light shrink-0">
                {sound.name}
              </div>
              <div className="flex-1 flex items-center h-12 relative">
                <div 
                  className={`sound-bar h-full rounded-full flex items-center px-4 ${sound.color}`}
                  style={{ width: `${(sound.db / 70) * 100}%` }}
                >
                  <span className={`text-sm md:text-base ${sound.name.includes("Aerio") ? "text-white" : "text-brand-graphite dark:text-brand-sand-light"}`}>
                    {sound.db} dB
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
