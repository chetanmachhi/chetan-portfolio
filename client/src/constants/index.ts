import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaLinux,
  FaTerminal,
  FaMobileAlt,
  FaInfinity,
  FaJava,
} from "react-icons/fa";

import {
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiSpringboot,
  SiFlask,
  SiExpress,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiC,
  SiJira,
  SiZoho,
} from "react-icons/si";

export const PERSONAL_INFO = {
  name: "Chetan Machhi",
  role: "Full Stack Developer",
  email: "chetanmachhi6@gmail.com",
  phone: "+91 9726622865",
  linkedin: "https://www.linkedin.com/in/chetan-machhi-25-03-2001-/",
  github: "https://github.com/chetanmachhi",
  about:
    "Full Stack Developer experienced in scalable web and mobile applications using React, React Native, Node.js, Express, and MongoDB. I have strong expertise in backend automation, API development, system monitoring, and production support. Currently pursuing my MCA at Sigma University.",
};

export const SKILLS = [
  { name: "React", icon: FaReact, color: "text-blue-400" },
  { name: "React Native", icon: FaMobileAlt, color: "text-blue-500" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-green-600" },
  { name: "Flask", icon: SiFlask, color: "text-white" },
  { name: "SQL", icon: FaDatabase, color: "text-orange-400" },
  { name: "Redux", icon: SiRedux, color: "text-purple-500" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend & Mobile",
    icon: FaReact,
    skills: [
      { name: "React.js", icon: FaReact, color: "text-blue-400" },
      { name: "React Native", icon: FaMobileAlt, color: "text-blue-500" },
      { name: "Redux Toolkit", icon: SiRedux, color: "text-purple-500" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
    ],
  },
  {
    title: "Backend & Database",
    icon: FaNodeJs,
    skills: [
      { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
      { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
      { name: "Flask", icon: SiFlask, color: "text-white" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "REST APIs", icon: FaNodeJs, color: "text-blue-300" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
      { name: "SQL", icon: FaDatabase, color: "text-orange-400" },
    ],
  },
  {
    title: "Programming Languages",
    icon: FaPython,
    skills: [
      { name: "Python", icon: FaPython, color: "text-yellow-300" },
      { name: "Java", icon: FaJava, color: "text-red-500" },
      { name: "C", icon: SiC, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: FaGitAlt,
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      { name: "CI/CD", icon: FaInfinity, color: "text-blue-400" },
      { name: "Linux", icon: FaLinux, color: "text-yellow-500" },
      { name: "Shell Scripting", icon: FaTerminal, color: "text-green-500" },
      { name: "Jira", icon: SiJira, color: "text-blue-500" },
      { name: "Zoho", icon: SiZoho, color: "text-yellow-600" },
    ],
  },
];

export const EXPERIENCE = [
  {
    company: "Frelite Energy",
    role: "Full Stack Developer",
    period: "Jun 2025 - Present",
    description:
      "Developing scalable web and mobile apps using React, React Native, TS, and Redux. Designed REST APIs with Express/MongoDB and optimized UI for desktop and Android.",
  },
  {
    company: "Phonon.io",
    role: "Application Support Engineer",
    period: "Oct 2024 - Jun 2025",
    description:
      "Developed Python (Flask) automations and executed SQL/NoSQL queries. Reduced incident resolution time by 20% and automated recurring backend processes.",
  },
];

export const PROJECTS = [
  {
    title: "Real-Time Email Dispatch",
    tech: ["Spring Boot", "React", "Bulk API"],
    description:
      "Full-stack app to send emails in real-time or bulk via CSV, replicating core business functionality.",
  },
  {
    title: "Phonon.io Website",
    tech: ["React", "Spring Boot", "REST API"],
    description:
      "Built a fully responsive, high-performance website from Figma designs prioritizing mobile-first design.",
  },
  {
    title: "Delivery Monitoring Bot",
    tech: ["Python", "MongoDB", "Gmail API"],
    description:
      "Automated system for SMS/Email delivery verification, reducing QA effort by 95% with auto-retry logic.",
  },
  {
    title: "Flow Activity Monitor",
    tech: ["Python Flask", "MySQL", "MongoDB"],
    description:
      "Automation tool to track messaging flows, sending severity alerts and disabling inactive flows.",
  },
  {
    title: "Price Prediction Engine",
    tech: ["Python", "Data Science", "API"],
    description:
      "Asset price prediction using data from multiple APIs and user-selected strategies (CS50 Final Project).",
  },
];
