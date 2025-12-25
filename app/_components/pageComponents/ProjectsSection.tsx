"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Folder, ArrowRight, Star, Code, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getProjects } from "@/lib/storeData/projectSlice";

export function ProjectsSection() {
  const dispatch = useAppDispatch();
  const { projects: projectsData, isLoading: loading } = useAppSelector((state) => state.project);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  if (loading && projectsData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="projects" className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
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
          className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
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
            className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-blue-500/10 border border-blue-500/30"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              🚀 Featured Work
            </span>
          </motion.div> */}

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            {/* <span className="text-white">Projects I've </span> */}
            <span className="text-white">{"Projects I've"}</span>

            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Built
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4 mb-8 sm:mb-10">
            A selection of projects that showcase my skills in building modern, scalable applications with great user experiences
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <motion.button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects ({projectsData.length})
            </motion.button>
            {featuredProjects.length > 0 && (
              <motion.button
                onClick={() => setFilter('featured')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${filter === 'featured'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="inline-block w-4 h-4 mr-1 sm:mr-2" />
                Featured ({featuredProjects.length})
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Featured Projects - Large Cards */}
        <AnimatePresence mode="wait">
          {filter === 'all' && featuredProjects.length > 0 && (
            <motion.div
              className="space-y-8 sm:space-y-12 lg:space-y-16 mb-16 sm:mb-20 lg:mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onHoverStart={() => setHoveredProject(project._id)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden group">
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      animate={
                        hoveredProject === project._id
                          ? { opacity: [0.05, 0.15, 0.05] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                      {/* Project Image */}
                      <div className={`relative aspect-video lg:aspect-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={`Web application project: ${project.title}`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Folder className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400/30" />
                            </div>
                          )}
                        </div>

                        {/* Overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 sm:p-8"
                          initial={{ opacity: 0 }}
                        >
                          <div className="flex gap-3 sm:gap-4">
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 text-slate-300 hover:text-blue-400 transition-all duration-300 shadow-lg"
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                              </motion.a>
                            )}
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                              </motion.a>
                            )}
                          </div>
                        </motion.div>

                        {/* Featured badge */}
                        <div className="absolute top-4 right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm">
                          <Star className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Featured
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <motion.div
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <span className="text-blue-400 font-mono text-xs sm:text-sm mb-2 sm:mb-3 block">
                            Featured Project
                          </span>
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                            {project.technologies?.map((tech: string) => (
                              <motion.span
                                key={tech}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-700/50 text-slate-300 text-xs sm:text-sm font-medium border border-slate-600/50 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-wrap gap-3 sm:gap-4">
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500 transition-all duration-300 text-sm sm:text-base font-medium"
                                whileHover={{ scale: 1.05, x: 2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                                View Code
                              </motion.a>
                            )}
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 text-sm sm:text-base font-medium"
                                whileHover={{ scale: 1.05, x: 2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                                Live Demo
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Projects Grid */}
        <AnimatePresence mode="wait">
          {((filter === 'all' && otherProjects.length > 0) || filter === 'featured') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filter === 'all' && otherProjects.length > 0 && (
                <motion.div
                  className="text-center mb-8 sm:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    Other Noteworthy Projects
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base">
                    More projects worth exploring
                  </p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {(filter === 'all' ? otherProjects : featuredProjects).map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full flex flex-col border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                      {/* Top icons */}
                      <div className="flex items-start justify-between mb-4 sm:mb-5">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Folder className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        </motion.div>
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-blue-400 transition-colors"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Github className="w-5 h-5" />
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-blue-400 transition-colors"
                              whileHover={{ scale: 1.2, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-5 flex-grow leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-mono">
                        {project.technologies?.map((tech: string) => (
                          <span key={tech} className="hover:text-blue-400 transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}