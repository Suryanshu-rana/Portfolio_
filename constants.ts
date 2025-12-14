import { Project, Skill, Experience } from './types';

export const USER_INFO = {
  name: "Suryanshu Rana",
  role: "Senior Android Engineer",
  tagline: "Engineering robust native mobile solutions with IoT, BLE, and Clean Architecture.",
  bio: "I am a Senior Android Engineer specializing in Native Development (Kotlin) and IoT integration. My expertise spans building enterprise-grade applications with Jetpack Compose, managing hardware communication via BLE/MQTT, and implementing scalable application architectures (MVVM/MVI).",
  heroImage: "https://raw.githubusercontent.com/Suryanshu-rana/Portfolio/refs/heads/master/images/IMG_20210519_083705-removebg-preview.png",
  social: {
    github: "https://github.com/Suryanshu-rana",
    linkedin: "https://www.linkedin.com/in/suryanshu-awsome-rana",
    twitter: "https://twitter.com/suryanshu_rana",
    email: "suryanshuinnovates@gmail.com",
    phone: "+91 6396339508"
  }
};

export const SKILLS: Skill[] = [
  { name: "Kotlin & Java", icon: "fa-brands fa-android", level: 95 },
  { name: "Jetpack Compose", icon: "fa-solid fa-code", level: 90 },
  { name: "Clean Arch / MVI", icon: "fa-solid fa-layer-group", level: 90 },
  { name: "IoT (BLE / MQTT)", icon: "fa-solid fa-wifi", level: 85 },
  { name: "Coroutines & Flow", icon: "fa-solid fa-bolt", level: 90 },
  { name: "Dagger Hilt", icon: "fa-solid fa-syringe", level: 85 },
  { name: "CI/CD (GitHub Actions)", icon: "fa-solid fa-gears", level: 80 },
  { name: "NoSQL / Firebase", icon: "fa-solid fa-database", level: 85 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Lutron Lighting Control",
    description: "Enterprise-grade mobile application for controlling complex lighting systems. Features geofencing, scene management, and direct hardware communication via BLE and WiFi.",
    tags: ["Kotlin", "BLE", "IoT", "Jetpack Compose"],
    image: "/Portfolio_/images/project-lutron.png",
    github: "https://github.com/Suryanshu-rana",
  },
  {
    id: 2,
    title: "Vestel Smart Life (VeeZy)",
    description: "A comprehensive smart home ecosystem app for controlling white goods (Washing Machines, Fridges, ACs). Utilizes MQTT for real-time state synchronization and remote management.",
    tags: ["Android", "MQTT", "Smart Home", "Coroutines"],
    image: "/Portfolio_/images/project-vestel.png",
    github: "https://github.com/Suryanshu-rana",
    live: "#"
  },
  {
    id: 3,
    title: "Airlines Crew Management",
    description: "Mission-critical in-flight application for cabin crew. Built using Clean Architecture with MVVM + MVI patterns. leverages NoSQL for offline-first capabilities and integrated with Cloud microservices via GitHub Actions pipelines.",
    tags: ["Kotlin", "NoSQL", "MVI", "GitHub Actions", "Clean Arch"],
    image: "/Portfolio_/images/project-airfi.png",
    github: "https://github.com/Suryanshu-rana",
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Android Engineer",
    company: "VESTEL International",
    period: "2023 - Present",
    description: [
      "Architected scalable mobile solutions using Clean Architecture and MVI pattern.",
      "Led the migration to Jetpack Compose, improving UI development speed by 30%.",
      "Implemented automated CI/CD pipelines using GitHub Actions for seamless delivery."
    ]
  },
  {
    id: 2,
    role: "Senior Associate",
    company: "Nagarro",
    period: "2021 - 2023",
    description: [
      "Developed IoT-centric Android applications interacting with BLE peripherals.",
      "Optimized battery usage for background service data polling via MQTT.",
      "Collaborated with firmware teams to define communication protocols."
    ]
  }
];