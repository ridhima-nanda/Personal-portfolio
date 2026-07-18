export interface SocialLinksData {
  github: string;
  instagram: string;
  linkedin: string;
  email: string;
  phone: string;
  website: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  specialization: string;
  location: string;
  /** Number of years, or "" if not applicable (e.g. a student with no professional experience yet). */
  yearsOfExperience: number | '';
  bio: string;
  avatarSvg: string;
  /** Leave empty to render the resume button as a disabled/placeholder link. */
  resumeUrl: string;
  /** Small pill badge in the hero (e.g. "Open to new opportunities"). Leave empty to hide it. */
  availabilityBadge: string;
  social: SocialLinksData;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Service {
  name: string;
  description: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  link: string;
  image: string;
  highlight: boolean;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  detail?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  experience: ExperienceEntry[];
  services: Service[];
  projects: Project[];
  education: EducationEntry[];
  testimonials: Testimonial[];
}
