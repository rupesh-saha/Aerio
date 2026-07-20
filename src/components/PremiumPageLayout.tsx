"use client";

import { motion } from "framer-motion";

interface PremiumPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PremiumPageLayout({ title, subtitle, children }: PremiumPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-sand-light selection:bg-brand-teal/30 pt-32">
      {/* Hero Section */}
      <section className="px-margin-edge py-16 md:py-24 max-w-5xl mx-auto w-full text-center md:text-left flex flex-col items-center md:items-start">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-brand-graphite text-balance leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="mt-6 md:mt-8 text-xl md:text-2xl text-brand-graphite/70 max-w-2xl text-balance font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </section>

      {/* Main Content Area */}
      <motion.main 
        className="flex-1 px-margin-edge pb-32 max-w-5xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </div>
  );
}
