import { Project, Skill, Experience } from './types';

export const USER_INFO = {
  name: "Suryanshu Rana",
  role: "Android & Web Developer",
  tagline: "Building modern apps with clean code and pixel-perfect design.",
  bio: "I am a passionate developer with expertise in Android Development (Kotlin/Flutter) and Modern Web Technologies (React/Node). I love creating seamless user experiences and efficient backend systems.",
  heroImage: "https://raw.githubusercontent.com/Suryanshu-rana/Portfolio/refs/heads/master/images/IMG_20210519_083705-removebg-preview.png",
  social: {
    github: "https://github.com/Suryanshu-rana",
    linkedin: "https://linkedin.com/in/suryanshu-rana",
    twitter: "https://twitter.com",
    email: "suryanshuinnovates@gmail.com"
  }
};

export const SKILLS: Skill[] = [
  { name: "Android (Kotlin)", icon: "fa-brands fa-android", level: 90 },
  { name: "Flutter", icon: "fa-solid fa-mobile-screen", level: 85 },
  { name: "React.js", icon: "fa-brands fa-react", level: 80 },
  { name: "TypeScript", icon: "fa-brands fa-js", level: 75 },
  { name: "Java", icon: "fa-brands fa-java", level: 85 },
  { name: "Firebase", icon: "fa-solid fa-fire", level: 80 },
  { name: "Git", icon: "fa-brands fa-git-alt", level: 90 },
  { name: "Tailwind CSS", icon: "fa-brands fa-css3", level: 85 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Crypto Tracker App",
    description: "A real-time cryptocurrency tracking application built with Kotlin and Jetpack Compose. Features live price updates, charts, and portfolio management.",
    tags: ["Kotlin", "Jetpack Compose", "Retrofit", "Android"],
    image: "https://picsum.photos/id/1/600/400",
    github: "https://github.com/Suryanshu-rana",
  },
  {
    id: 2,
    title: "E-Commerce Flutter UI",
    description: "A comprehensive e-commerce app template with beautiful animations, cart functionality, and payment gateway integration.",
    tags: ["Flutter", "Dart", "Riverpod", "Mobile"],
    image: "https://picsum.photos/id/20/600/400",
    github: "https://github.com/Suryanshu-rana",
    live: "#"
  },
  {
    id: 3,
    title: "Task Management API",
    description: "A robust backend API for task management using Node.js, Express, and MongoDB. Includes JWT authentication.",
    tags: ["Node.js", "Express", "MongoDB", "Backend"],
    image: "https://picsum.photos/id/180/600/400",
    github: "https://github.com/Suryanshu-rana",
  },
    {
    id: 4,
    title: "Chat App",
    description: "Real-time messaging application using Firebase Firestore and cloud functions.",
    tags: ["Firebase", "Android", "Kotlin"],
    image: "https://picsum.photos/id/160/600/400",
    github: "https://github.com/Suryanshu-rana",
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Android Engineer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: [
      "Leading a team of 4 developers to build flagship mobile products.",
      "Implemented CI/CD pipelines reducing deployment time by 40%.",
      "Refactored legacy Java codebase to Kotlin."
    ]
  },
  {
    id: 2,
    role: "Mobile App Developer",
    company: "Creative Studio",
    period: "2020 - 2022",
    description: [
      "Developed cross-platform apps using Flutter.",
      "Collaborated with UI/UX designers to implement complex animations.",
      "Optimized app performance and reduced APK size."
    ]
  }
];