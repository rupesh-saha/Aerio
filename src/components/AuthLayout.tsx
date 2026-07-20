"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-brand-sand-light flex selection:bg-brand-teal/30">
      {/* Left Half - Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-brand-graphite items-end justify-start p-12 overflow-hidden">
        <Image 
          src="/auth-bg.png"
          alt="Aerio Purifier in a modern home"
          fill
          className="object-cover mix-blend-screen opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-brand-teal/5 pointer-events-none mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg mb-8">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-white">Aerio</h1>
          </Link>
          <p className="text-white/80 text-2xl font-light text-balance leading-relaxed">
            Engineering the future of clean air. Designed for spaces where health and aesthetics matter equally.
          </p>
        </div>
      </div>

      {/* Right Half - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto bg-brand-sand-light">
        <div className="absolute top-8 left-8 lg:hidden z-10">
          <Link href="/" className="text-2xl font-bold tracking-tight text-brand-graphite">
            Aerio
          </Link>
        </div>
        <div className="absolute top-8 right-8 z-10">
           <Link href="/" className="flex items-center gap-2 text-brand-graphite/60 hover:text-brand-teal transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-black/5">
             <ArrowLeft className="w-4 h-4" /> Back to site
           </Link>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 lg:p-24 relative">
          <motion.div 
            className="w-full max-w-md relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
