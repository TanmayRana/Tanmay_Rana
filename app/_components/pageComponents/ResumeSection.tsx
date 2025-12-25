"use client";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
// import { ScrollReveal } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./PageTransition";
import { useAppDispatch } from "@/lib/store";
import { useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { getResume } from "@/lib/storeData/resumeSlice";
import { toast } from "sonner";

const resumeHighlights = [
  {
    icon: Briefcase,
    title: "Professional Experience",
    description: "5+ years of experience building modern web applications",
    details: [
      "Senior Frontend Developer",
      "Full Stack Developer",
      "Junior Web Developer",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Strong academic foundation in computer science",
    details: [
      "B.S. Computer Science",
      "Relevant Coursework",
      "Academic Projects",
    ],
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Recognized for outstanding contributions",
    details: [
      "Performance Awards",
      "Open Source Contributions",
      "Published Articles",
    ],
  },
];

export function ResumeSection() {
  // const handleDownload = () => {
  //   // In a real app, this would link to an actual resume PDF
  //   const link = document.createElement("a");
  //   link.href = "/resume.pdf";
  //   link.download = "Resume.pdf";
  //   link.click();
  // };

  const dispatch = useAppDispatch();
  const { resumeUrl, isLoading } = useAppSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getResume()).catch(() => {
      toast.error("Failed to load resume");
    });
  }, [dispatch]);

  // console.log("resumeUrl=", resumeUrl);


  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container-custom relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              Resume
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              My Professional Background
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              A comprehensive overview of my skills, experience, and
              qualifications.
            </p>

            <Button
              onClick={() => {
                if (resumeUrl) {
                  window.open(resumeUrl, '_blank');
                }
              }}
              size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resumeHighlights.map((highlight, index) => (
            <ScrollReveal key={highlight.title} delay={index * 0.1}>
              <motion.div
                className="glass-card p-6 h-full text-center"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {highlight.description}
                </p>
                <ul className="space-y-2">
                  {highlight.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-center justify-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Resume Preview Card */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 max-w-3xl mx-auto">
            <motion.div
              className="glass-card p-8"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-primary/10 shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Full Resume
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Download my complete resume to learn more about my
                    professional journey, technical skills, project highlights,
                    and career accomplishments.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["PDF Format", "Updated 2024", "ATS Friendly"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
