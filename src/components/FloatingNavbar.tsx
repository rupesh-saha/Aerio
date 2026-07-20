"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

gsap.registerPlugin(ScrollTrigger);

export function FloatingNavbar() {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const { itemCount, setIsCartOpen } = useCart();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    // When scrolling past the hero (e.g., ~80vh), shrink padding and add shadow
    ScrollTrigger.create({
      start: "top -80%", // trigger when scroll hits 80% down
      end: "max",
      onUpdate: (self) => {
        if (!isMobileMenuOpen) {
          if (self.direction === 1) {
            gsap.to(navRef.current, {
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              duration: 0.3,
              ease: "power2.out"
            });
          } else if (self.progress === 0 || self.direction === -1 && self.scroll() < window.innerHeight * 0.8) {
            gsap.to(navRef.current, {
              paddingTop: "1rem",
              paddingBottom: "1rem",
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      }
    });
  }, { scope: navRef, dependencies: [isMobileMenuOpen] });

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Concierge", path: "/chat" },
    { name: "Home Strategy", path: "/deploy" },
    { name: "About", path: "/about" },
  ];

  const drawerVariants: Variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { 
      y: "-100%", 
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center mt-6 px-margin-edge pointer-events-none">
        <nav 
          ref={navRef}
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full max-w-6xl",
            "px-6 md:px-8 py-4 bg-white/70 backdrop-blur-xl rounded-full",
            "border border-white/50 shadow-sm transition-all duration-300 relative"
          )}
        >
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-brand-graphite hover:text-brand-teal transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <Link href="/" className="text-xl font-bold tracking-tight text-brand-graphite z-10" onClick={() => setIsMobileMenuOpen(false)}>
              Aerio
            </Link>
          </div>
          
          {/* Main Navigation Links */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-graphite/80 relative">
            <AnimatePresence>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="relative px-4 py-2 z-10 transition-colors hover:text-brand-teal"
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <span className="relative z-10">{link.name}</span>
                  {hoveredPath === link.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/80 rounded-full shadow-sm backdrop-blur-md border border-black/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4 z-10">
            {!isPending && (
              <div className="hidden md:flex items-center gap-2 mr-2 text-sm font-medium">
                {session ? (
                  <div className="relative">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors group"
                    >
                      <div className="w-7 h-7 bg-brand-graphite text-white rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                        {session.user.name.charAt(0)}
                      </div>
                      <span className="text-brand-graphite group-hover:text-brand-teal transition-colors">
                        {session.user.name.split(" ")[0]}
                      </span>
                    </button>
                    
                    {/* User Dropdown */}
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-4 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-black/5 overflow-hidden flex flex-col p-2"
                        >
                          <div className="px-4 py-3 border-b border-black/5 mb-2">
                            <p className="text-xs text-brand-graphite/50 font-medium tracking-widest uppercase mb-1">Account</p>
                            <p className="text-sm text-brand-graphite font-medium truncate">{session.user.email}</p>
                          </div>
                          <Link href="/dashboard" className="px-4 py-2 text-sm text-brand-graphite/80 hover:text-brand-teal hover:bg-black/5 rounded-xl transition-all" onClick={() => setIsUserMenuOpen(false)}>
                            Dashboard
                          </Link>
                          <button 
                            onClick={handleSignOut}
                            className="px-4 py-2 text-sm text-red-500/80 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-left mt-2"
                          >
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="px-4 py-2 hover:text-brand-teal transition-colors">
                      Login
                    </Link>
                    <Link href="/signup" className="px-5 py-2 bg-brand-graphite text-white rounded-full hover:bg-black transition-colors shadow-sm">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            )}
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="p-2 hover:text-brand-teal transition-colors relative group"
            >
              <ShoppingCart className="w-5 h-5 text-brand-graphite group-hover:text-brand-teal transition-colors" strokeWidth={2} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-teal text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Premium Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-brand-sand-light flex flex-col justify-center px-10 md:hidden overflow-hidden"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Ambient Background Blur for extra premium feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-graphite/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="flex flex-col gap-10 relative z-10 mt-16">
              <motion.div variants={linkVariants} className="flex flex-col gap-8 border-b border-black/5 pb-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="text-[2.5rem] leading-none font-medium tracking-tight text-brand-graphite hover:text-brand-teal transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>

              <motion.div variants={linkVariants} className="flex flex-col gap-6">
                {!isPending && session ? (
                  <>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 bg-brand-graphite text-white rounded-full flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                        {session.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xl font-medium text-brand-graphite">{session.user.name}</p>
                        <p className="text-sm text-brand-graphite/50">{session.user.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" className="text-2xl font-medium text-brand-graphite/80 hover:text-brand-teal transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                    <button onClick={handleSignOut} className="text-2xl font-medium text-red-500/80 hover:text-red-600 transition-colors text-left mt-4">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-2xl font-medium text-brand-graphite/80 hover:text-brand-teal transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    <Link href="/signup" className="text-2xl font-medium text-brand-graphite/80 hover:text-brand-teal transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Create Account</Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
