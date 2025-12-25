// import {
//   Project,
//   Skill,
//   Technology,
//   Certification,
//   AboutContent,
//   ContactInfo,
//   PersonalInfo,
// } from "../types";

// export const personalInfo: PersonalInfo = {
//   name: "Alex Johnson",
//   title: "Full Stack Developer",
//   tagline:
//     "Crafting beautiful, functional web experiences with modern technologies. Passionate about clean code, user experience, and bringing ideas to life.",
//   profileImage:
//     "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
// };

// export const projects: Project[] = [
//   {
//     _id: "1",
//     title: "E-commerce Platform",
//     description:
//       "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
//     image:
//       "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600",
//     technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: true,
//   },
//   {
//     id: "2",
//     title: "Task Management App",
//     description:
//       "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//     image:
//       "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
//     technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: true,
//   },
//   {
//     id: "3",
//     title: "Weather & News App",
//     description:
//       "A comprehensive weather and news application with location-based forecasts, news aggregation, and personalized content recommendations.",
//     image:
//       "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
//     technologies: ["React Native", "Redux", "Weather API", "News API"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: true,
//   },
//   {
//     id: "4",
//     title: "Social Media Dashboard",
//     description:
//       "Analytics dashboard for social media management with data visualization, scheduling features, and performance tracking.",
//     image:
//       "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
//     technologies: ["Vue.js", "D3.js", "Express", "MySQL"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: true,
//   },
// ];

// export const skills: Skill[] = [
//   { id: "1", name: "JavaScript", level: 95, category: "frontend" },
//   { id: "2", name: "TypeScript", level: 90, category: "frontend" },
//   { id: "3", name: "React", level: 95, category: "frontend" },
//   { id: "4", name: "Vue.js", level: 85, category: "frontend" },
//   { id: "5", name: "Node.js", level: 90, category: "backend" },
//   { id: "6", name: "Python", level: 80, category: "backend" },
//   { id: "7", name: "PostgreSQL", level: 85, category: "database" },
//   { id: "8", name: "MongoDB", level: 80, category: "database" },
//   { id: "9", name: "Docker", level: 75, category: "devops" },
//   { id: "10", name: "AWS", level: 70, category: "devops" },
// ];

// export const technologies: Technology[] = [
//   { id: "1", name: "React", icon: "⚛️", category: "Frontend" },
//   { id: "2", name: "Vue.js", icon: "💚", category: "Frontend" },
//   { id: "3", name: "Angular", icon: "🅰️", category: "Frontend" },
//   { id: "4", name: "TypeScript", icon: "🔷", category: "Language" },
//   { id: "5", name: "Node.js", icon: "💚", category: "Backend" },
//   { id: "6", name: "Python", icon: "🐍", category: "Backend" },
//   { id: "7", name: "Express", icon: "🚂", category: "Backend" },
//   { id: "8", name: "MongoDB", icon: "🍃", category: "Database" },
//   { id: "9", name: "PostgreSQL", icon: "🐘", category: "Database" },
//   { id: "10", name: "Docker", icon: "🐳", category: "DevOps" },
//   { id: "11", name: "AWS", icon: "☁️", category: "Cloud" },
//   { id: "12", name: "Git", icon: "📦", category: "Tools" },
// ];

// export const certifications: Certification[] = [
//   {
//     id: "1",
//     title: "AWS Certified Developer",
//     issuer: "Amazon Web Services",
//     date: "2023",
//     credentialUrl: "https://aws.amazon.com",
//   },
//   {
//     id: "2",
//     title: "React Developer Certification",
//     issuer: "Meta",
//     date: "2023",
//     credentialUrl: "https://developers.facebook.com",
//   },
//   {
//     id: "3",
//     title: "Full Stack Web Development",
//     issuer: "freeCodeCamp",
//     date: "2022",
//     credentialUrl: "https://freecodecamp.org",
//   },
// ];

// export const aboutContent: AboutContent = {
//   story:
//     "As a passionate full-stack developer with over 5 years of experience building web applications, I've had the privilege of working with startups and established companies to bring their digital visions to life. My journey began with a curiosity for how websites work, which quickly evolved into a deep passion for creating exceptional user experiences.\n\nI specialize in modern JavaScript frameworks, particularly React and Vue.js, and have extensive experience with Node.js for backend development. I'm passionate about writing clean, maintainable code and following best practices that ensure scalability and performance.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I believe in continuous learning and staying up-to-date with the latest industry trends and best practices.",
//   passions: [
//     {
//       id: "1",
//       title: "Clean Code",
//       description:
//         "Writing maintainable, readable code that stands the test of time.",
//       icon: "🎯",
//     },
//     {
//       id: "2",
//       title: "User Experience",
//       description:
//         "Creating intuitive interfaces that users love to interact with.",
//       icon: "💡",
//     },
//     {
//       id: "3",
//       title: "Web Performance",
//       description: "Optimizing applications for speed and efficiency.",
//       icon: "⚡",
//     },
//     {
//       id: "4",
//       title: "Open Source",
//       description:
//         "Contributing to the developer community through open source projects.",
//       icon: "🌟",
//     },
//     {
//       id: "5",
//       title: "Mentoring",
//       description: "Helping other developers grow and reach their potential.",
//       icon: "🎓",
//     },
//     {
//       id: "6",
//       title: "Innovation",
//       description:
//         "Exploring cutting-edge technologies and pushing boundaries.",
//       icon: "🚀",
//     },
//   ],
// };

// export const contactInfo: ContactInfo = {
//   email: "alex.johnson@example.com",
//   phone: "+1 (555) 123-4567",
//   location: "San Francisco, CA",
//   github: "https://github.com/alexjohnson",
//   linkedin: "https://linkedin.com/in/alexjohnson",
//   twitter: "https://twitter.com/alexjohnson",
// };
