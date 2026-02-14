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
  FaUniversity,
  FaCloud,
  FaServer,
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
  SiMeta,
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

export const EXPERIENCES = [
  {
    company: "Frelite Energy",
    role: "Full Stack Developer",
    period: "Jun 2025 - Present",
    location: "Vadodara",
    description: [
      "Architecting scalable web and mobile ecosystems using React.js, React Native, and TypeScript.",
      "Designing high-performance RESTful APIs with Express.js and MongoDB for production systems.",
      "Implementing global state management strategies using Redux Toolkit for seamless data flow.",
      "Optimizing UI/UX for desktop and Android platforms with a mobile-first approach.",
    ],
    tech: ["React Native", "TypeScript", "Redux", "MongoDB"],
    color: "blue",
  },
  {
    company: "Phonon.io",
    role: "Application Support Engineer",
    period: "Oct 2024 - Jun 2025",
    location: "Vadodara",
    description: [
      "Engineered Python (Flask) backend automations integrated with React frontends for monitoring.",
      "Executed complex SQL/NoSQL queries for failure analysis, reducing incident resolution time by 20%.",
      "Automated critical backend processes using Linux shell scripting to eliminate manual overhead.",
      "Maintained 99% system uptime for telecom clients across SMS, email, and voice platforms.",
    ],
    tech: ["Python Flask", "Linux", "SQL/NoSQL", "Shell Scripting"],
    color: "emerald",
  },
];

export const CERTIFICATIONS = [
  {
    name: "CS50X: Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2024",
    link: "https://cs50.harvard.edu/certificates/4c26144d-02b5-48d4-bedc-cc8e882415d3",
    icon: FaUniversity,
    color: "from-red-500 to-red-700",
    text_color: "text-red-400",
    description:
      "Intensive introduction to the intellectual enterprises of computer science and the art of programming.",
  },
  {
    name: "CS50P: Programming with Python",
    issuer: "Harvard University",
    year: "2024",
    link: "https://cs50.harvard.edu/certificates/6cf73449-e7cd-4400-9ba2-bcd4b4b1efa0",
    icon: FaUniversity,
    color: "from-red-500 to-red-700",
    text_color: "text-red-400",
    description:
      "Comprehensive dive into Python, covering functions, arguments, return values, variables, and debugging.",
  },
  {
    name: "React Development",
    issuer: "Meta",
    year: "2025",
    link: "https://www.coursera.org/account/accomplishments/verify/W1F3Z4WD7YL7",
    icon: SiMeta,
    color: "from-blue-400 to-cyan-400",
    text_color: "text-cyan-400",
    description:
      "Advanced React concepts including Hooks, Redux, component lifecycle, and building scalable UI.",
  },
  {
    name: "Backend with Node.js & Express",
    issuer: "IBM",
    year: "2025",
    link: "https://www.coursera.org/account/accomplishments/verify/A232VBBFP9J0",
    icon: FaServer,
    color: "from-blue-600 to-indigo-600",
    text_color: "text-blue-400",
    description:
      "Server-side development using Node.js and Express framework, focusing on REST APIs and middleware.",
  },
  {
    name: "Cloud Native, DevOps, Agile & NoSQL",
    issuer: "IBM",
    year: "2025",
    link: "https://www.coursera.org/account/accomplishments/verify/KRZCGE9F067B",
    icon: FaCloud,
    color: "from-blue-600 to-indigo-600",
    text_color: "text-blue-400",
    description:
      "Modern DevOps practices, Agile methodologies, and deploying cloud-native apps with NoSQL databases.",
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
