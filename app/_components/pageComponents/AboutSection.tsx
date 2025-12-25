


import { motion, useScroll, useTransform, type Easing } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchAbout } from '@/lib/storeData/aboutSlice';
import { getProfileData } from '@/lib/storeData/profileSlice';

const easeSmooth: Easing = [0.22, 1, 0.36, 1];

// Removed mock data as we are using Redux now

function ScrollReveal({ children, direction = "up", delay = 0 }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right", delay?: number }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, ease: easeSmooth, delay }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector((state) => state.about);
  const profile = useAppSelector((state) => state.profile);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // console.log(profile)

  useEffect(() => {
    dispatch(fetchAbout());
    dispatch(getProfileData());
  }, [dispatch]);

  const initials = profile.name
    ? profile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
    : 'JD';

  return (
    <section id="about" className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-slate-950">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-500/40 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left - Image Section */}
          <ScrollReveal direction="left">
            <motion.div className="relative">
              {/* Main image container with enhanced design */}
              <motion.div
                className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: easeSmooth }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-3xl blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Image frame */}
                <div className="relative h-full  overflow-hidden bg-slate-900/50 backdrop-blur-sm">
                  {/* Animated border gradient (refined) */}
                  {/* <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                    style={{
                      border: '1px solid rgba(139, 92, 246, 0.5)',
                      borderRadius: '1rem',
                    }}
                  /> */}

                  {/* Image or initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt={profile.name || "Profile"}
                        className=" w-full h-full object-cover  transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <motion.div
                        className="text-9xl md:text-[12rem] font-bold bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                        animate={{
                          y: [-5, 5, -5],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {initials}
                      </motion.div>
                    )}
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Decorative rotating ring */}
                <motion.div
                  className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-violet-500/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-violet-500 rounded-full -translate-x-1/2" />
                </motion.div>

                {/* Floating accent dots */}
                <motion.div
                  className="absolute top-1/4 -right-4 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/3 -left-4 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Right - Content Section */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative space-y-8">
              {/* Title with animated accent */}
              <div className="flex items-start gap-4 sm:gap-6">
                <motion.div
                  className="w-1 h-20 sm:h-28 bg-gradient-to-b from-violet-500 via-purple-500 to-blue-500 rounded-full flex-shrink-0"
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: easeSmooth }}
                />
                <div>
                  <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, ease: easeSmooth }}
                  >
                    Who am I?
                  </motion.h2>
                  <motion.div
                    className="h-1 bg-gradient-to-r from-violet-500 to-transparent rounded-full mt-2"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: easeSmooth }}
                  />
                </div>
              </div>

              {/* Content with enhanced typography */}
              <motion.div
                className="space-y-6 text-slate-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                  }
                }}
              >
                <motion.p
                  className="text-base sm:text-lg leading-relaxed"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSmooth } }
                  }}
                >
                  {aboutData.story}
                </motion.p>

                {aboutData.story2 && (
                  <motion.p
                    className="text-base sm:text-lg leading-relaxed"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSmooth } }
                    }}
                  >
                    {aboutData.story2}
                  </motion.p>
                )}

                <motion.p
                  className="text-base sm:text-lg leading-relaxed"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSmooth } }
                  }}
                >
                  4th-year B.Tech AI Engineering student with hands-on experience in ML & DL Projects. Proficient in{' '}
                  <span className="text-violet-400 font-semibold">Python</span>,{' '}
                  <span className="text-violet-400 font-semibold">PyTorch</span>,{' '}
                  <span className="text-violet-400 font-semibold">TensorFlow</span>, and data preprocessing. Seeking internship opportunities to contribute to impactful AI solutions.
                </motion.p>
              </motion.div>

              {/* Stats section with enhanced interactivity */}
              <motion.div
                className="grid grid-cols-3 gap-4 sm:gap-6 pt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                  }
                }}
              >
                {[
                  { value: aboutData?.exp_year || "2+", label: "Years Experience" },
                  { value: aboutData?.projects_completed || "15+", label: "Projects Completed" },
                  { value: aboutData?.happy_clients || "10+", label: "Happy Clients" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSmooth } }
                    }}
                    onHoverStart={() => setHoveredStat(idx)}
                    onHoverEnd={() => setHoveredStat(null)}
                  >
                    <motion.div
                      className="relative p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-violet-500/20 backdrop-blur-sm overflow-hidden"
                      whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
                      transition={{ duration: 0.3, ease: easeSmooth }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-blue-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredStat === idx ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative text-center">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-400">
                          {stat.label}
                        </div>
                      </div>

                      {/* Animated corner accent */}
                      <motion.div
                        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-violet-500/50 rounded-tr-xl"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredStat === idx ? 1 : 0,
                          opacity: hoveredStat === idx ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: easeSmooth }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: easeSmooth }}
      />
    </section>
  );
}