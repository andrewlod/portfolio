import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const resumePath = path.join(process.cwd(), 'content/resume.yaml');

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  client?: string;
  engagement?: string;
  summary?: string;
  highlights: string[];
  technologies: string[];
  projects?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  badge?: string;
  url?: string;
}

export interface ResumeData {
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: Record<string, any>;
}

export function getResumeData(): ResumeData {
  const fileContents = fs.readFileSync(resumePath, 'utf8');
  return yaml.load(fileContents) as ResumeData;
}

