"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.6], ["0%", "30%"]);

  return (
    <section 
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center",
        "min-h-[100svh] pt-32 pb-16 px-gutter bg-brand-sand-light overflow-hidden"
      )}
    >
      {/* Background Parallax Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ y: yBg }}
      >
        <Image 
          src="/hero-purifier.png" 
          alt="Aerio Pro Air Purifier in a beautifully lit Scandinavian living room"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-sand-light/90 via-brand-sand-light/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-sand-light/80 via-transparent to-transparent h-1/2 bottom-0" />
      </motion.div>
      
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8"
        style={{ opacity: opacityText, y: yText }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span 
          className="inline-block px-5 py-2 rounded-full border border-brand-teal/20 bg-brand-teal/5 text-brand-teal text-xs md:text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Introducing Aerio Pro
        </motion.span>
        
        <motion.h1 
          className="text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[1.05] tracking-tight font-medium text-brand-graphite text-balance"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Breathe purely.<br /> Live beautifully.
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl text-xl md:text-2xl text-brand-graphite/80 text-balance font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The world's most advanced air purification system, designed to seamlessly blend into your premium living space.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="w-full sm:w-auto px-10 py-5 bg-brand-teal text-white rounded-full text-lg font-medium hover:bg-brand-teal/90 transition-all shadow-xl shadow-brand-teal/20 hover:shadow-2xl hover:shadow-brand-teal/30 hover:-translate-y-1">
            Order Now
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white/80 backdrop-blur-md text-brand-graphite border border-black/5 rounded-full text-lg font-medium hover:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
            Watch the Film
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
