"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-brand-graphite pt-24 pb-12 px-margin-edge border-t border-brand-graphite text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-24 text-sm">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <Link href="/" className="text-3xl font-bold tracking-tight text-brand-sand-light inline-block mb-6">
              Aerio
            </Link>
            <p className="text-brand-sand/70 max-w-sm leading-relaxed text-base font-light">
              Engineering the future of clean air. Designed for spaces where health and aesthetics matter equally.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="font-semibold text-brand-sand-light tracking-widest uppercase text-xs">Products</h4>
            <ul className="flex flex-col gap-4 text-brand-sand/60">
              <li><Link href="#products" className="hover:text-white transition-colors duration-300">Aerio Pro</Link></li>
              <li><Link href="#products" className="hover:text-white transition-colors duration-300">Aerio Classic</Link></li>
              <li><Link href="#products" className="hover:text-white transition-colors duration-300">Aerio Mini</Link></li>
              <li><Link href="#filters" className="hover:text-white transition-colors duration-300">Replacement Filters</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="font-semibold text-brand-sand-light tracking-widest uppercase text-xs">Company</h4>
            <ul className="flex flex-col gap-4 text-brand-sand/60">
              <li><Link href="/about" className="hover:text-white transition-colors duration-300">Our Story</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors duration-300">Sustainability</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors duration-300">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors duration-300">Press</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="font-semibold text-brand-sand-light tracking-widest uppercase text-xs">Support</h4>
            <ul className="flex flex-col gap-4 text-brand-sand/60">
              <li><Link href="/faq" className="hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors duration-300">Returns</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors duration-300">Warranty</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col gap-6">
            <h4 className="font-semibold text-brand-sand-light tracking-widest uppercase text-xs">Social</h4>
            <ul className="flex lg:flex-col gap-6 text-brand-sand/60">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        {/* Massive Typography Sign-off */}
        <div className="w-full flex items-center justify-center py-10 overflow-hidden pointer-events-none select-none">
          <motion.h2 
            className="text-[18vw] leading-none font-bold text-brand-sand-light/[0.03] tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            AERIO
          </motion.h2>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-sand/40">
          <p>© {new Date().getFullYear()} Aerio Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
