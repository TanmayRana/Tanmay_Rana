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

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
}

export interface Resume {
  _id?: string;
  resumeUrl: string;
  createdAt?: string;
  updatedAt?: string;
}
