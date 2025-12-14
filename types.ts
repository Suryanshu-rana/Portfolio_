export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live?: string;
}

export interface Skill {
  name: string;
  icon: string; // FontAwesome class
  level: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}