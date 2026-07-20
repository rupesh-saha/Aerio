"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "aerio-pro",
    name: "Aerio Pro",
    description: "Maximum coverage for large living spaces up to 1,200 sq ft.",
    price: "$599",
    image: "/aerio-pro.png"
  },
  {
    id: "aerio-classic",
    name: "Aerio",
    description: "The original perfect balance for bedrooms and studies.",
    price: "$399",
    image: "/aerio.png"
  },
  {
    id: "aerio-mini",
    name: "Aerio Mini",
    description: "Compact design for personal spaces and nurseries.",
    price: "$249",
    image: "/aerio-mini.png"
  }
];

export function ProductShelf() {
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-graphite mb-4">
            Meet the Aerio Family
          </h2>
          <p className="text-xl text-brand-graphite/60 max-w-xl mx-auto font-light">
            A purifier perfectly sized for every room in your home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="product-card flex flex-col bg-[#f1f3f4] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden pt-12 md:pt-16 px-6 md:px-8 relative isolate"
              style={{ minHeight: '650px' }}
            >
              {/* Product Details Area (Top) */}
              <div className="flex flex-col items-center text-center z-10 relative">
                <h3 className="text-3xl md:text-4xl font-medium text-brand-graphite mb-3 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-brand-graphite/70 max-w-xs mx-auto mb-8 text-balance font-light leading-relaxed">
                  {product.description}
                </p>
                <Link 
                  href={`/shop`}
                  className="px-6 py-2.5 rounded-full border border-black/20 text-brand-graphite font-medium text-sm hover:bg-black/5 hover:border-black/30 transition-all bg-[#f1f3f4] backdrop-blur-sm shadow-sm"
                >
                  Learn more
                </Link>
              </div>

              {/* Product Image Area (Bottom) */}
              <div className="w-full flex-1 relative mt-12 flex items-end justify-center pointer-events-none">
                <div 
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className="relative w-full h-[400px] md:h-[480px] origin-bottom"
                >
                  <Image
                    src={product.image}
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
