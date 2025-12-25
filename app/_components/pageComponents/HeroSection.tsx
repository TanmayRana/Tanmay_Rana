import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Briefcase, Phone, MessageCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getProfileData } from "@/lib/storeData/profileSlice";
import { getSocialMedia } from "@/lib/storeData/SocialMediaSlice";
import { getContact } from "@/lib/storeData/contactSlice";




const RotatingSubtitle = ({ items }: { items: string[] }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* Main Container */}
      <div
        className="min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4rem] overflow-hidden relative flex items-center justify-center px-2 sm:px-4 py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{
              y: 30,
              opacity: 0,
              filter: 'blur(6px)',
              scale: 0.95
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1
            }}
            exit={{
              y: -30,
              opacity: 0,
              filter: 'blur(6px)',
              scale: 0.95
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative group w-full max-w-full overflow-hidden"
          >
            {/* Text with gradient */}
            <h2 className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium tracking-tight bg-gradient-to-r from-slate-100 via-purple-300 to-pink-300 bg-clip-text text-transparent text-center whitespace-nowrap leading-tight overflow-hidden text-ellipsis px-2">
              {items[index]}
            </h2>

            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5 blur-xl rounded-full -z-10"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      {/* Removed - as per user request */}
    </div>
  );
};


export function HeroSection() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const socialData = useAppSelector((state) => state.socialMedia.data?.[0]);
  const contactData = useAppSelector((state) => state.contact.data?.[0]);

  // console.log(contactData);

  useEffect(() => {
    if (!profile.name) dispatch(getProfileData());
    if (!socialData) dispatch(getSocialMedia());
    if (!contactData) dispatch(getContact());
  }, [dispatch, profile.name, socialData, contactData]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const roles = profile.roles?.length > 0 ? profile.roles : [
    'AI Enthusiast',
    'ML Engineer',
    'Deep Learning',
    'Computer Vision',
    'Developer'
  ];

  const infoCards = [
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location || 'Bengaluru, India',
      color: 'text-pink-400'
    },
    {
      icon: Briefcase,
      label: 'Expertise',
      value: profile.expertise || 'AI/ML, Web Dev',
      color: 'text-orange-400'
    },
    {
      icon: Phone,
      label: 'Status',
      value: contactData?.phone || 'Available',
      color: 'text-green-400'
    },
  ];

  const whatsappUrl = profile.whatsapp
    ? `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`
    : 'https://wa.me/1234567890';

  const socialLinks = [
    { icon: Linkedin, href: socialData?.linkedinurl || '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: `mailto:${contactData?.email || 'hello@example.com'}`, label: 'Email', color: 'hover:text-red-400' },
    { icon: MessageCircle, href: whatsappUrl, label: 'WhatsApp', color: 'hover:text-green-400' },
    { icon: Github, href: socialData?.githunurl || '#', label: 'GitHub', color: 'hover:text-purple-400' },
  ].filter(link => link.href !== '#');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Desktop Social Sidebar */}
      <motion.div
        className="hidden xl:flex fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 ${link.color} transition-all duration-300`}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <link.icon className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-all" />
            <span className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700/50 pointer-events-none">
              {link.label}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting */}
            <motion.div
              className="space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-purple-400 text-base sm:text-lg md:text-xl font-medium">
                {profile.greeting || "👋 Hi! I'm"}
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {profile.name || 'Tanmay Rana'}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-start"
            >
              <RotatingSubtitle
                items={[
                  profile.title,
                  ...(profile.tagline?.split('|').map(s => s.trim()) || [])
                ].filter(Boolean)}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {profile.description || "Creating AI-powered solutions and building modern web experiences. Passionate about solving real-world problems with cutting-edge technology."}
            </motion.p>

            {/* Role Tags */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {roles.map((role, index) => (
                <motion.span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            {/* Info Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -4, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

                  <div className="relative flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900/50 group-hover:bg-slate-900/70 transition-colors">
                      <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-500 text-[10px] sm:text-xs font-medium mb-0.5">{card.label}</p>
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{card.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Social Links */}
            <motion.div
              className="xl:hidden flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 ${link.color} transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.05 }}
                >
                  <link.icon className="w-5 h-5 text-slate-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            className="relative flex items-center justify-center order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-pink-500/20"
                animate={{
                  scale: [1.15, 1, 1.15],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />

              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />

              {/* Profile container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-700/50 backdrop-blur-sm bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-2xl shadow-purple-500/20">
                {profile.profileImage ? (
                  <>
                    <img
                      src={profile.profileImage}
                      alt={profile.name || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                      {profile.name?.slice(0, 2).toUpperCase() || 'TR'}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400/40"
                  style={{
                    top: `${15 + (i * 12)}%`,
                    left: `${10 + (i * 11)}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-slate-400 text-xs sm:text-sm font-medium group-hover:text-purple-400 transition-colors">
          Scroll to explore
        </span>
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-slate-600 group-hover:border-purple-400 transition-colors flex items-start justify-center p-1.5 sm:p-2"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-400 group-hover:bg-purple-400 rounded-full"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}