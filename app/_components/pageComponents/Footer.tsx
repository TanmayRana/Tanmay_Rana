"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getProfileData } from "@/lib/storeData/profileSlice";
import { getSocialMedia } from "@/lib/storeData/SocialMediaSlice";
import { getContact } from "@/lib/storeData/contactSlice";

export function Footer() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const socialStore = useAppSelector((state) => state.socialMedia.data);
  const contactStore = useAppSelector((state) => state.contact.data);

  useEffect(() => {
    if (!profile.name) dispatch(getProfileData());
    if (!socialStore) dispatch(getSocialMedia());
    if (!contactStore) dispatch(getContact());
  }, [dispatch, profile.name, socialStore, contactStore]);

  const currentYear = new Date().getFullYear();



  const socialLinks = [
    { href: contactStore?.email ? `mailto:${contactStore.email}` : null, icon: Mail, label: "Email", color: "hover:text-blue-400" },
    { href: socialStore?.githunurl, icon: Github, label: "GitHub", color: "hover:text-purple-400" },
    { href: socialStore?.linkedinurl, icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500" },
    { href: socialStore?.twitterurl, icon: Twitter, label: "Twitter", color: "hover:text-sky-400" },
  ].filter(link => link.href);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black border-t border-slate-800/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-emerald-500/5 to-cyan-500/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

            {/* Left: Logo & Copyright */}
            <motion.div
              className="flex flex-col items-center lg:items-start gap-3 order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="group text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:via-emerald-400 group-hover:to-emerald-500 transition-all duration-300">
                  Portfolio
                </span>
              </motion.a>

              <p className="text-sm sm:text-base text-gray-400 flex items-center gap-2 text-center lg:text-left flex-wrap justify-center lg:justify-start">
                <span>© {currentYear} Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                <span>by</span>
                <span className="font-semibold text-white">{profile?.name || "Developer"}</span>
              </p>

              <p className="text-xs sm:text-sm text-gray-500 text-center lg:text-left">
                Crafted with passion • Built with Next.js & Tailwind
              </p>
            </motion.div>

            {/* Center: Social Links */}
            <motion.div
              className="flex items-center justify-center gap-3 sm:gap-4 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group relative p-3 sm:p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm text-gray-400 ${social.color} transition-all duration-300 border border-slate-700/50 hover:border-slate-600 hover:shadow-lg hover:shadow-emerald-500/10`}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <social.icon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                </motion.a>
              ))}
            </motion.div>

            {/* Right: Back to Top Button */}
            <motion.div
              className="flex justify-center lg:justify-end order-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                onClick={scrollToTop}
                className="group relative flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-gray-300 hover:text-white bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-emerald-600/80 hover:to-teal-600/80 rounded-full transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-500/25 overflow-hidden"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative z-10">Back to top</span>
                <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}