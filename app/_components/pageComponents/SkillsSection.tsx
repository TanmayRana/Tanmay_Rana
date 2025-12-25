"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getSkillsCategories } from "@/lib/storeData/SkillsCategorySlice";
import { Skill } from "@/types";

export function SkillsSection() {
  const dispatch = useAppDispatch();
  const { skillsCategories, loading } = useAppSelector((state) => state.skillsCategory);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const isUrl = (str: string) => Boolean(str && (str.startsWith("http") || str.startsWith("/")));

  useEffect(() => {
    dispatch(getSkillsCategories());
  }, [dispatch]);


  if (loading && skillsCategories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="skills" className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.3) 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-[32rem] sm:h-[32rem] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* <motion.div
            className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-teal-500/10 border border-teal-500/30"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-teal-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              💼 Skills & Expertise
            </span>
          </motion.div> */}

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Technologies I </span>
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Work With
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            A comprehensive toolkit that enables me to build scalable, performant, and beautiful applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {skillsCategories.map((category, groupIndex) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              onHoverStart={() => setActiveCategory(category._id)}
              onHoverEnd={() => setActiveCategory(null)}
              className="group"
            >
              <motion.div
                className="relative h-full bg-slate-800/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to bottom right, ${category.color.replace('from-', '').split(' ')[0]}, transparent)` }}
                  animate={
                    activeCategory === category._id
                      ? { opacity: [0.1, 0.3, 0.1] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Category header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <motion.div
                    className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden"
                    animate={
                      activeCategory === category._id
                        ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {category.icon ? (
                      isUrl(category.icon) ? (
                        <Image src={category.icon} alt={category.category} fill className="object-contain" />
                      ) : (
                        <span className="text-3xl sm:text-4xl md:text-5xl">{category.icon}</span>
                      )
                    ) : (
                      <span className="text-3xl sm:text-4xl md:text-5xl">✨</span>
                    )}
                  </motion.div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                    {category.category}
                  </h3>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills?.map((skill, index: number) => (
                    <motion.span
                      key={skill._id || skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-700/50 text-slate-300 text-xs sm:text-sm font-medium border border-slate-600/50 hover:border-teal-500/50 hover:text-teal-400 hover:bg-slate-700/80 transition-all duration-300 cursor-pointer"
                    >
                      {skill.name}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 border border-teal-500/50 rounded-lg text-xs font-semibold text-teal-400 whitespace-nowrap shadow-lg"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {skill.level}% Proficiency
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-teal-500/50 rotate-45" />
                        </motion.div>
                      )}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl">📊</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Proficiency Overview
              </h3>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {skillsCategories.map((category, index) => {
                const averageLevel =
                  category.skills && category.skills.length > 0
                    ? Math.round(
                      category.skills.reduce(
                        (acc: number, skill: Skill) => acc + (skill.level || 0),
                        0
                      ) / category.skills.length
                    )
                    : 0;

                return (
                  <div key={category._id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative text-xl sm:text-2xl flex items-center justify-center w-8 h-8 overflow-hidden">
                          {category.icon ? (
                            isUrl(category.icon) ? (
                              <Image src={category.icon} alt={category.category} fill className="object-contain" />
                            ) : (
                              category.icon
                            )
                          ) : (
                            "✨"
                          )}
                        </div>
                        <span className="text-sm sm:text-base md:text-lg font-semibold text-white">
                          {category.category}
                        </span>
                      </div>
                      <motion.span
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {averageLevel}%
                      </motion.span>
                    </div>

                    <div className="relative h-3 sm:h-4 bg-slate-700/50 rounded-full overflow-hidden">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600/50 rounded-full" />

                      {/* Progress bar */}
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r shadow-lg ${category.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${averageLevel}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.2 + 1,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Skills breakdown on larger screens */}
                    <motion.div
                      className="hidden lg:flex flex-wrap gap-2 mt-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {category.skills?.map((skill) => (
                        <div
                          key={skill._id || skill.name}
                          className="text-xs text-slate-400 px-2 py-1 bg-slate-700/30 rounded"
                        >
                          {skill.name}: {skill.level}%
                        </div>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Stats Summary */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 border-t border-slate-700/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {skillsCategories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0)}+
                </div>
                <div className="text-xs sm:text-sm text-slate-400">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {skillsCategories.length}
                </div>
                <div className="text-xs sm:text-sm text-slate-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {Math.round(skillsCategories.reduce((acc, cat) => {
                    const avg = cat.skills && cat.skills.length > 0 ? cat.skills.reduce((sAcc: number, s) => sAcc + (s.level || 0), 0) / cat.skills.length : 0;
                    return acc + avg;
                  }, 0) / (skillsCategories.length || 1))}%
                </div>
                <div className="text-xs sm:text-sm text-slate-400">Avg Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  5+
                </div>
                <div className="text-xs sm:text-sm text-slate-400">Years Exp</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}