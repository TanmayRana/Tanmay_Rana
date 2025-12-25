"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { ScrollReveal } from "./PageTransition";
// import { ScrollReveal } from "@/components/motion/PageTransition";

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: [
      "Led the development of a customer-facing dashboard that increased user engagement by 40%",
      "Implemented performance optimizations resulting in 50% faster page load times",
      "Mentored junior developers and established coding best practices",
      "Collaborated with design team to create a new component library",
    ],
    current: true,
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Agency",
    location: "New York, NY",
    period: "2020 - 2022",
    description: [
      "Built and maintained multiple client projects using React and Node.js",
      "Developed RESTful APIs and integrated third-party services",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Participated in agile development processes and code reviews",
    ],
    current: false,
  },
  {
    title: "Junior Web Developer",
    company: "StartUp Hub",
    location: "Austin, TX",
    period: "2018 - 2020",
    description: [
      "Developed responsive web applications using modern JavaScript frameworks",
      "Collaborated with UX designers to implement user-friendly interfaces",
      "Maintained and improved existing codebase and documentation",
      "Learned and applied best practices in web development",
    ],
    current: false,
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container-custom relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Where I've worked
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey building digital products and growing as a
              developer.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <ScrollReveal
                key={exp.title}
                delay={index * 0.15}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 mb-12 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 md:-translate-x-1/2 mt-6"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      className="glass-card p-6"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div
                        className={`flex items-start gap-4 mb-4 ${
                          index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div
                          className={`flex-1 ${
                            index % 2 === 0 ? "md:text-right" : ""
                          }`}
                        >
                          <h3 className="text-lg font-semibold text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-primary font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div
                        className={`flex items-center gap-4 mb-4 text-sm text-muted-foreground ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>

                      {/* Description */}
                      <ul
                        className={`space-y-2 text-sm text-muted-foreground ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}
                      >
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 ${
                              index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
