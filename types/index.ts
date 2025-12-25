export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  _id: string;
  name: string;
  level: number;
  // category: "frontend" | "backend" | "database" | "devops";
  category: string;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface SkillCategory {
  _id: string;
  category: string;
  color: string;
  icon?: string;
  skills?: Skill[];
}

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description: string;
  link: string;
  featured: boolean;
}

export interface AboutContent {
  story: string;
  exp_year?: string;
  projects_completed?: string;
  happy_clients?: string;
  passions: Passion[];
}

export interface Passion {
  _id?: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface Contact {
  _id?: string;
  email: string;
  phone: string;
  location: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
  description: string;
  roles: string[];
  expertise: string;
  whatsapp: string;
  greeting: string;
  location: string;
  status: string;
}

export interface SocialMedia {
  _id?: string;
  githunurl: string;
  linkedinurl: string;
  twitterurl: string;
  instagramurl?: string;
  facebookurl?: string;
}

export interface Resume {
  _id?: string;
  resumeUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
