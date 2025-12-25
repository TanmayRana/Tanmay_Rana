"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getResume } from "@/lib/storeData/resumeSlice";
import { toast } from "sonner";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Technologies", href: "#technologies" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  const dispatch = useAppDispatch();
  const { resumeUrl, isLoading } = useAppSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getResume()).catch(() => {
      toast.error("Failed to load resume");
    });
  }, [dispatch]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection (scrollspy)
  useEffect(() => {
    const handler = () => {
      const offset = 120;
      let current = "about";

      navItems.forEach((item) => {
        const id = item.href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0 && rect.bottom > offset) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20"
          : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

            {/* Logo */}
            <motion.button
              onClick={scrollToTop}
              className="group relative text-xl sm:text-2xl font-bold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-lg px-2 -ml-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-teal-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:via-emerald-400 group-hover:to-emerald-500 transition-all duration-300">
                Portfolio
              </span>
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${isActive
                      ? "text-emerald-300"
                      : "text-slate-400 hover:text-white"
                      }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full border border-emerald-500/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={() => resumeUrl && window.open(resumeUrl, '_blank')}
                disabled={isLoading || !resumeUrl}
                className="flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full text-sm font-medium bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                {isLoading ? "Loading..." : "Resume"}
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="relative group px-5 xl:px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 overflow-hidden"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-16 sm:top-18 right-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-l border-slate-800/50 shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.slice(1);
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${isActive
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                {/* CTA Buttons */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => {
                      resumeUrl && window.open(resumeUrl, '_blank');
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={isLoading || !resumeUrl}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    {isLoading ? "Loading..." : "Download Resume"}
                  </motion.button>

                  <motion.button
                    onClick={() => scrollToSection("#contact")}
                    className="w-full px-5 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white transition-all duration-300 shadow-lg shadow-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.button>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                  className="pt-6 border-t border-slate-800/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-slate-500 text-center">
                    Made with ❤️ by Tanmay
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}