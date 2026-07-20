"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Activity, Sparkles, Wind, Moon, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Built-in laser particle sensors detect air quality changes instantly and adjust fan speed automatically."
  },
  {
    icon: Smartphone,
    title: "App Control",
    description: "Monitor air quality history, set schedules, and control your device from anywhere in the world."
  },
  {
    icon: Moon,
    title: "Smart Sleep Mode",
    description: "Light sensors detect when the room goes dark, automatically turning off the display and engaging ultra-quiet mode."
  },
  {
    icon: Wind,
    title: "360° Intake",
    description: "Draws air from all directions, allowing you to place Aerio anywhere in the room without sacrificing performance."
  },
  {
    icon: Sparkles,
    title: "Filter Tracking",
    description: "Advanced algorithms calculate actual filter life based on air quality and fan speed, not just a timer."
  },
  {
    icon: ShieldCheck,
    title: "Ozone Free",
    description: "100% mechanical filtration means zero ozone emission, keeping your family perfectly safe."
  }
];

export function SmartFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-section-v px-margin-edge bg-brand-sand-light dark:bg-[#111]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[length:var(--text-headline-section)] leading-[var(--text-headline-section--line-height)] tracking-[var(--text-headline-section--letter-spacing)] font-medium text-brand-graphite dark:text-brand-sand-light mb-4">
            Intelligence built in.
          </h2>
          <p className="text-lg text-brand-graphite/70 dark:text-brand-sand/80">
            Technology that works seamlessly in the background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, i) => (
            <div key={i} className="feature-card flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-6 text-brand-teal">
                <feature.icon strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-brand-graphite dark:text-brand-sand-light mb-3">
                {feature.title}
              </h3>
              <p className="text-brand-graphite/70 dark:text-brand-sand/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
