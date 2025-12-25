"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, LayoutGrid, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchTechnologies } from "@/lib/storeData/technologieSlice";

export function TechnologiesSection() {
    const dispatch = useAppDispatch();
    const { data: skills = [] } = useAppSelector((state) => state.technologie);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [rotation, setRotation] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTechnologies());
    }, [dispatch]);

    const isUrl = (str: string) => Boolean(str && (str.startsWith("http") || str.startsWith("/")));

    const getLevelValue = (level: string) => {
        switch (level) {
            case "Beginner": return 40;
            case "Intermediate": return 65;
            case "Expert": return 85;
            case "Master": return 100;
            default: return 70;
        }
    };

    // Smooth continuous rotation
    useEffect(() => {
        let animationFrame: number;
        let lastTime = Date.now();

        const animate = () => {
            const currentTime = Date.now();
            const delta = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            setRotation((prev) => (prev + delta * 6) % 360); // 6 degrees per second
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const getRadius = () => {
        if (typeof window === "undefined") return 42;
        const width = window.innerWidth;
        if (width < 640) return 38;
        if (width < 768) return 40;
        if (width < 1024) return 41;
        if (width < 1280) return 42;
        return 43;
    };

    const [radius, setRadius] = useState(getRadius());

    useEffect(() => {
        const handleResize = () => setRadius(getRadius());
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            id="technologies"
            className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
            </div>

            {/* Gradient Orbs */}
            <motion.div
                className="absolute top-20 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]"
                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
                animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 mb-8 sm:mb-12 lg:mb-16">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* <motion.div
                        className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-2xl">⚡</span>
                        <span className="text-teal-400 text-sm sm:text-base font-medium">Technologies & Tools</span>
                    </motion.div> */}

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
                        <span className="text-white">My </span>
                        <span className="bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                            Tech Stack
                        </span>
                    </h2>

                    <motion.p
                        className="text-slate-400 text-sm sm:text-base lg:text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Hover to explore my diverse skill set
                    </motion.p>
                </motion.div>
            </div>

            {/* Desktop/Tablet Circular Layout */}
            <div className="hidden sm:block container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto aspect-square"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    {/* Center Glow */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-teal-500/30 via-purple-500/20 to-blue-500/30 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Orbit Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        {[1, 2, 3].map((ring) => (
                            <motion.div
                                key={ring}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-700/20"
                                style={{
                                    width: `${ring * 30}%`,
                                    height: `${ring * 30}%`,
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30 * ring, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                    </div>

                    {/* Skills - Rotates position, NOT the cards themselves */}
                    {skills.map((skill, index) => {
                        const angle = (index / skills.length) * 2 * Math.PI + (rotation * Math.PI) / 180;
                        const x = 50 + radius * Math.cos(angle);
                        const y = 50 + radius * Math.sin(angle);

                        return (
                            <motion.div
                                key={skill.name}
                                className="absolute"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + index * 0.05,
                                }}
                            >
                                <motion.div
                                    className="relative -translate-x-1/2 -translate-y-1/2"
                                    whileHover={{ scale: 1.15, zIndex: 50 }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Glow Effect */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-2xl`}
                                        style={{ width: "160%", height: "160%", left: "-30%", top: "-30%", zIndex: -1 }}
                                        animate={{
                                            opacity: hoveredIndex === index ? 0.7 : 0,
                                            scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                                        }}
                                        transition={{ duration: 1.5, repeat: hoveredIndex === index ? Infinity : 0 }}
                                    />

                                    <motion.div
                                        className="relative w-20 sm:w-24 md:w-28 lg:w-32 bg-slate-800/70 backdrop-blur-xl rounded-2xl p-3 sm:p-4 lg:p-5 border border-slate-700/50 hover:border-teal-400/60 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-teal-500/20"
                                        whileHover={{
                                            boxShadow: "0 0 50px rgba(20, 184, 166, 0.4)",
                                            backgroundColor: "rgba(30, 41, 59, 0.9)",
                                        }}
                                    >
                                        {/* Icon */}
                                        <motion.div
                                            className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center"
                                            animate={
                                                hoveredIndex === index
                                                    ? { y: [0, -8, 0], rotate: [0, 5, -5, 0] }
                                                    : {}
                                            }
                                            transition={
                                                hoveredIndex === index
                                                    ? { duration: 1.5, repeat: Infinity }
                                                    : {}
                                            }
                                        >
                                            {isUrl(skill.icon) ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <span className="text-3xl sm:text-4xl lg:text-5xl">
                                                    {skill.icon}
                                                </span>
                                            )}
                                        </motion.div>

                                        {/* Name */}
                                        <div className="text-xs sm:text-sm lg:text-base font-bold text-slate-200 group-hover:text-teal-300 transition-colors text-center leading-tight whitespace-nowrap">
                                            {skill.name}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-1 sm:h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${skill.color}`}
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: `${getLevelValue(skill.level)}%` }}
                                                viewport={{ once: true }}
                                                animate={{ width: hoveredIndex === index ? "100%" : `${getLevelValue(skill.level)}%` }}
                                                transition={{ duration: 0.8 }}
                                            />
                                        </div>

                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none`} />
                                    </motion.div>

                                    {/* Ripple Effect */}
                                    {hoveredIndex === index && (
                                        <motion.div
                                            className="absolute inset-0 border-2 border-teal-400/60 rounded-2xl pointer-events-none"
                                            initial={{ scale: 1, opacity: 0.8 }}
                                            animate={{ scale: 1.6, opacity: 0 }}
                                            transition={{ duration: 1.2, repeat: Infinity }}
                                        />
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}

                    {/* Center Content - Stays Fixed */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <motion.div
                            className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-3"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ⚡
                        </motion.div>
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">{skills.length}+</div>
                        <div className="text-sm sm:text-base text-slate-400">Technologies</div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile Grid Layout */}
            <div className="sm:hidden container mx-auto px-4 relative z-10">
                <motion.div
                    className="grid grid-cols-2 gap-3 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {skills.slice(0, 8).map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="relative group"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileTap={{ scale: 0.95 }}
                            onTouchStart={() => setHoveredIndex(index)}
                            onTouchEnd={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl blur-xl`}
                                animate={{ opacity: hoveredIndex === index ? 0.5 : 0 }}
                                transition={{ duration: 0.3 }}
                            />

                            <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 active:border-teal-400/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 min-h-[130px] shadow-lg active:shadow-xl">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    {isUrl(skill.icon) ? (
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="text-3xl">{skill.icon}</div>
                                    )}
                                </div>
                                <div className="text-xs font-bold text-slate-200 group-active:text-teal-300 transition-colors text-center leading-tight">
                                    {skill.name}
                                </div>
                                <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${skill.color}`}
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: `${getLevelValue(skill.level)}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.05 }}
                                    />
                                </div>
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} opacity-0 group-active:opacity-10 transition-opacity duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Show More Button */}
                {skills.length > 8 && (
                    <motion.div
                        className="mt-8 flex justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white font-medium hover:bg-slate-700/80 transition-all active:scale-95 shadow-lg shadow-black/20 overflow-hidden"
                        >
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            <LayoutGrid className="w-5 h-5 text-teal-400" />
                            <span>Show All Tools</span>
                            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </button>
                    </motion.div>
                )}
            </div>

            {/* All Skills Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 sticky top-0 z-10 backdrop-blur-xl">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-teal-400" />
                                        Full Tech Stack
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-1">Explore all the technologies I work with</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body - Grid of Skills */}
                            <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)] custom-scrollbar">
                                <div className="grid grid-cols-2 xs:grid-cols-3 gap-4 pb-4">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="group relative p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-teal-500/40 hover:bg-slate-800/60 transition-all duration-300"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    {isUrl(skill.icon) ? (
                                                        <img
                                                            src={skill.icon}
                                                            alt={skill.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-3xl">{skill.icon}</span>
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 text-center">{skill.name}</span>
                                                <div className="w-full h-1 bg-slate-700/50 rounded-full mt-1">
                                                    <motion.div
                                                        className={`h-full bg-gradient-to-r ${skill.color}`}
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: `${getLevelValue(skill.level)}%` }}
                                                        transition={{ duration: 1, delay: 0.2 + index * 0.03 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Stats Bar */}
            {/* <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 mt-12 sm:mt-16 lg:mt-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {[
                        { label: "Languages", value: "8+", icon: "💻" },
                        { label: "Frameworks", value: "5+", icon: "⚙️" },
                        { label: "Databases", value: "3+", icon: "🗄️" },
                        { label: "Tools", value: "10+", icon: "🛠️" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="bg-slate-800/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/30 text-center hover:border-teal-400/30 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div> */}
        </section>
    );
}