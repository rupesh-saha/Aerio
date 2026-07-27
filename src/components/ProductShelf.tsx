"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MagneticButton } from "./MagneticButton";
import type { Product } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export function ProductShelf({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Entrance animation
    if (!prefersReducedMotion) {
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }

    // Hover animation
    cardsRef.current.forEach((card, i) => {
      if (!card || prefersReducedMotion) return;
      const imageContainer = imageRefs.current[i];
      
      card.addEventListener("mouseenter", () => {
        gsap.to(imageContainer, {
          scale: 1.05,
          y: -10,
          duration: 0.6,
          ease: "power3.out"
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(imageContainer, {
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="products" className="py-section-v px-margin-edge bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-graphite mb-4">
            Meet the Aerio Family
          </h2>
          <p className="text-lg md:text-xl text-brand-graphite/60 max-w-xl mx-auto font-light px-4">
            A purifier perfectly sized for every room in your home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {initialProducts.map((product, i) => (
            <div
              key={product._id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="product-card flex flex-col bg-white rounded-[2rem] overflow-hidden pt-8 md:pt-10 px-6 relative isolate border border-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(11,79,63,0.1)] transition-shadow duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-sand-light/80 to-transparent pointer-events-none z-0" />
              
              {/* Product Details Area (Top) */}
              <div className="flex flex-col items-center text-center z-10 relative">
                <h3 className="text-2xl md:text-3xl font-medium text-brand-graphite mb-2 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-brand-teal font-mono text-sm tracking-widest mb-3">
                  ${product.price}
                </p>
                <p className="text-sm md:text-base text-brand-graphite/70 max-w-xs mx-auto mb-6 text-balance font-light leading-relaxed">
                  {product.description}
                </p>
                <MagneticButton 
                  onClick={() => router.push(`/shop/${product.slug}`)}
                  className="px-6 py-2.5 rounded-full border border-black/10 text-brand-graphite font-medium text-sm hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all bg-white backdrop-blur-sm shadow-sm"
                >
                  Learn more
                </MagneticButton>
              </div>

              {/* Product Image Area (Bottom) */}
              <div className="w-full flex-1 relative mt-8 flex items-end justify-center pointer-events-none">
                <div 
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] origin-bottom"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain object-bottom drop-shadow-2xl mix-blend-darken"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
