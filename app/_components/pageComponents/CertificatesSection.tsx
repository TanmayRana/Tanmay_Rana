"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, Building, Trophy, X, CheckCircle, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCertifications } from "@/lib/storeData/certificationSlice";

export function CertificatesSection() {
  const dispatch = useAppDispatch();
  const { certifications: certificationsData, loading, error } = useAppSelector(
    (state) => state.certifications
  );
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCertifications());
  }, [dispatch]);

  const featuredCerts = certificationsData.filter((c) => c.featured);
  const otherCerts = certificationsData.filter((c) => !c.featured);

  if (loading && certificationsData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="certificates" className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.2) 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* <motion.div
            className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-amber-500/10 border border-amber-500/30"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              🏆 Certifications
            </span>
          </motion.div> */}

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Professional </span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Certificates
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Continuous learning and professional development through industry-recognized certifications
          </p>
        </motion.div>

        {/* Featured Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {featuredCerts.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCert(cert._id!)}
              onHoverEnd={() => setHoveredCert(null)}
            >
              <motion.div
                className="relative bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 h-full border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 group overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-orange-500/0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  animate={
                    hoveredCert === cert._id
                      ? { opacity: [0.1, 0.25, 0.1] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Featured Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                  <motion.span
                    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    Featured
                  </motion.span>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Top Section */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {cert.credentialUrl ? (
                      <motion.div
                        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-700 group-hover:border-amber-500/50 transition-all duration-300 cursor-pointer shadow-lg"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage({ url: cert.credentialUrl!, title: cert.title })}
                      >
                        <img
                          src={cert.credentialUrl}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ) : (
                      <div className="shrink-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                        <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-400" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                        <Building className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">{cert.issuer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm lg:text-base text-slate-400 mb-4 sm:mb-5 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{cert.date}</span>
                    </div>

                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-700/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-600/50 hover:border-amber-500/50 transition-all duration-300 text-xs sm:text-sm font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Verify
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Other Certificates */}
        {otherCerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          >
            {featuredCerts.length > 0 && (
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Other Certifications
              </motion.h3>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {otherCerts.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group"
                >
                  <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 h-full border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-500" />

                    {/* Content */}
                    <div className="relative">
                      {/* Top section */}
                      <div className="flex items-center gap-3 mb-3">
                        {cert.credentialUrl ? (
                          <motion.div
                            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-slate-700 group-hover:border-amber-500/50 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 3 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage({ url: cert.credentialUrl!, title: cert.title });
                            }}
                          >
                            <img
                              src={cert.credentialUrl}
                              alt={cert.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        ) : (
                          <div className="shrink-0 p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{cert.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                        {cert.title}
                      </h4>

                      {/* Issuer */}
                      <p className="text-xs sm:text-sm text-slate-400 truncate">{cert.issuer}</p>

                      {/* Verify link (appears on hover) */}
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4 text-amber-400" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Achievement Stats
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  value: certificationsData.length,
                  label: "Certifications",
                  suffix: "+",
                  color: "from-amber-400 to-orange-500"
                },
                {
                  value: new Set(certificationsData.map(c => c.issuer)).size,
                  label: "Issuers",
                  suffix: "+",
                  color: "from-purple-400 to-pink-500"
                },
                {
                  value: "100",
                  label: "Current & Valid",
                  suffix: "%",
                  color: "from-green-400 to-emerald-500"
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 sm:mb-3`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-6xl w-full bg-slate-800/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                    {selectedImage.title}
                  </h3>
                </div>
                <motion.button
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Image */}
              <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-slate-900/50 min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]">
                <motion.img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[60vh] sm:max-h-[70vh] lg:max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}