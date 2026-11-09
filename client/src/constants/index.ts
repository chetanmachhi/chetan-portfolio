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
  SiMysql,
  SiRedis,
  SiAmazonwebservices,
  SiFigma,
  SiDocker,
  SiReactquery,
} from "react-icons/si";

import { FaLayerGroup, FaStream, FaUsersCog } from "react-icons/fa";

export const PERSONAL_INFO = {
  name: "Chetan Machhi",
  role: "Full Stack Developer",
  email: "chetanmachhi6@gmail.com",
  phone: "+91 9726622865",
  linkedin: "https://www.linkedin.com/in/chetan-machhi-25-03-2001-/",
  github: "https://github.com/chetanmachhi",
  about:
    "Full Stack Developer with 2 years of experience building scalable web and mobile applications across food delivery, solar clean-tech, and aviation telecom platforms. Proficient in React.js, React Native, TypeScript, Node.js, Express.js, MongoDB, MySQL, Redis, BullMQ, and AWS. I design REST APIs, real-time backend workflows, queue-based processing, and automated monitoring tools for production systems. Currently pursuing my MCA at Sigma University.",
};

export const SKILLS = [
  { name: "React", icon: FaReact, color: "text-blue-400" },
  { name: "React Native", icon: FaMobileAlt, color: "text-blue-500" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
  { name: "MySQL", icon: SiMysql, color: "text-sky-400" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "AWS", icon: SiAmazonwebservices, color: "text-orange-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Redux", icon: SiRedux, color: "text-purple-500" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-green-600" },
  { name: "Flask", icon: SiFlask, color: "text-white" },
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
      { name: "TanStack Query", icon: SiReactquery, color: "text-rose-400" },
      { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
    ],
  },
  {
    title: "Backend",
    icon: FaNodeJs,
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
      { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
      { name: "Flask", icon: SiFlask, color: "text-white" },
      { name: "REST APIs", icon: FaNodeJs, color: "text-blue-300" },
      { name: "BullMQ", icon: FaLayerGroup, color: "text-red-400" },
      { name: "Message Queues", icon: FaStream, color: "text-amber-400" },
    ],
  },
  {
    title: "Databases",
    icon: FaDatabase,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
      { name: "MySQL", icon: SiMysql, color: "text-sky-400" },
      { name: "Redis", icon: SiRedis, color: "text-red-500" },
      { name: "SQL / NoSQL", icon: FaDatabase, color: "text-orange-400" },
      { name: "Query Optimization", icon: FaDatabase, color: "text-emerald-400" },
      { name: "Indexing", icon: FaDatabase, color: "text-cyan-400" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: FaCloud,
    skills: [
      { name: "AWS", icon: SiAmazonwebservices, color: "text-orange-400" },
      { name: "CI/CD", icon: FaInfinity, color: "text-blue-400" },
      { name: "Docker", icon: SiDocker, color: "text-sky-500" },
      { name: "Linux", icon: FaLinux, color: "text-yellow-500" },
      { name: "Shell Scripting", icon: FaTerminal, color: "text-green-500" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    ],
  },
  {
    title: "Programming Languages",
    icon: FaPython,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "Python", icon: FaPython, color: "text-yellow-300" },
      { name: "Java", icon: FaJava, color: "text-red-500" },
      { name: "C", icon: SiC, color: "text-blue-500" },
    ],
  },
  {
    title: "Tools & Practices",
    icon: FaGitAlt,
    skills: [
      { name: "Jira", icon: SiJira, color: "text-blue-500" },
      { name: "Zoho", icon: SiZoho, color: "text-yellow-600" },
      { name: "Agile", icon: FaUsersCog, color: "text-purple-400" },
      { name: "Figma-to-code", icon: SiFigma, color: "text-pink-400" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    ],
  },
];

export const EXPERIENCES = [
  {
    company: "Easy Caters India",
    role: "Software Engineer",
    period: "May 2026 - Present",
    location: "Vadodara",
    description: [
      "Designing and optimizing scalable REST APIs with Express.js and MySQL for high-volume data processing.",
      "Deploying backend applications on AWS to ensure high availability across environments.",
      "Building responsive React UI components and integrating them with backend logic.",
      "Optimizing complex SQL queries and database indexing to improve performance and reduce latency.",
    ],
    tech: ["Express.js", "MySQL", "AWS", "React"],
    color: "violet",
  },
  {
    company: "Frelit Energy",
    role: "Full Stack Developer",
    period: "Jun 2025 - May 2026",
    location: "Vadodara",
    description: [
      "Developed and maintained scalable web and mobile applications using React.js, React Native, TypeScript, and Tailwind CSS.",
      "Designed, implemented, and maintained RESTful APIs using Express.js and MongoDB for production systems.",
      "Implemented Redux Toolkit state management for predictable data flow across web and mobile platforms.",
      "Built responsive, mobile-first user interfaces optimized for desktop and Android applications.",
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

/** Live links and downloads for the Blinkit project page. */
export const BLINKIT = {
  storePanelUrl: "https://blinkit-store-web.vercel.app/login",
  apiHealthUrl: "https://blinkit-backend-2bv1.onrender.com/health",
  // GitHub Releases: upload Blinkit-Customer.apk / Blinkit-Delivery.apk to the latest release of each repo.
  customerApkUrl: "https://github.com/chetanmachhi/blinkit-customer-app/releases/latest/download/Blinkit-Customer.apk",
  deliveryApkUrl: "https://github.com/chetanmachhi/blinkit-delivery-app/releases/latest/download/Blinkit-Delivery.apk",
  repos: {
    backend: "https://github.com/chetanmachhi/blinkit-backend",
    customerApp: "https://github.com/chetanmachhi/blinkit-customer-app",
    deliveryApp: "https://github.com/chetanmachhi/blinkit-delivery-app",
    storeWeb: "https://github.com/chetanmachhi/blinkit-store-web",
  },
};

export const PROJECTS = [
  {
    title: "Blinkit Clone: Quick Commerce Platform",
    category: "Full Stack + Mobile",
    tech: ["React Native", "React", "Node.js", "Express", "MongoDB", "TypeScript"],
    description:
      "End-to-end 10-minute grocery delivery: customer app, rider app, and store admin panel on one modular backend.",
    highlights: [
      "Two React Native apps (customer + delivery partner) and a React store panel, all live.",
      "Modular-monolith Express backend: customer, store and delivery modules deployable as one or split later.",
      "Atomic stock reservation and race-safe rider assignment using conditional MongoDB updates.",
      "Live order board tuned to 60fps with dozens of orders; Google Maps hand-off for rider navigation.",
    ],
    link: "/projects/blinkit",
  },
  {
    title: "Solar Chat Pro",
    category: "SaaS & AI Automation",
    tech: ["React", "Express", "WhatsApp API", "MongoDB", "AWS"],
    description:
      "A cross-platform SaaS for the solar industry, enabling operations via web and WhatsApp chatbot.",
    highlights: [
      "Automated customer registration and quotation management for solar workflows.",
      "Integrated secure payment processing for seamless industry transactions.",
      "Enabled users to generate, manage, and download PDF quotations via web or WhatsApp.",
      "Implemented a conversational chatbot interface to handle core business logic through simple chat.",
    ],
    link: "https://solarchatpro.com",
  },
  {
    title: "Bento Bits",
    category: "Full Stack Portfolio",
    tech: ["React", "Express", "TypeScript", "Monorepo"],
    description:
      "High-performance monorepo portfolio showcasing projects through a modern Bento-grid.",
    highlights: [
      "Built using a monorepo structure for efficient code sharing.",
      "Features a modern, high-performance Bento-grid UI layout.",
      "Optimized for speed and SEO to showcase professional work.",
    ],
    link: "https://bentobits.in/",
  },
  {
    title: "Real-Time Email Dispatch",
    category: "Full Stack System",
    tech: ["Java Spring Boot", "React", "Bulk CSV", "Real-Time API"],
    description:
      "Full-stack application replicating core business messaging functionality.",
    highlights: [
      "Built a web app to send emails in real-time via API or in bulk using CSV uploads.",
      "Replicated part of Phonon’s core functionality for seamless email delivery.",
      "Implemented backend API integrations with Spring Boot.",
      "Developed a dynamic React frontend ensuring a responsive UI.",
    ],
  },
  {
    title: "Delivery Monitoring Bot",
    category: "Automation & QA",
    tech: ["Python", "MongoDB", "Gmail API", "Automation"],
    description:
      "An automated system to trigger test flows and verify delivery status across channels.",
    highlights: [
      "Triggers test flows (SMS, email, calls) and verifies delivery status using MongoDB queries.",
      "Integrated Gmail API to post real-time updates to a group chat.",
      "Implemented automated retry logic every minute until a final status is received.",
      "Reduced QA effort by 95% and improved delivery verification accuracy.",
    ],
  },
  {
    title: "Flow Activity Monitor",
    category: "System Automation",
    tech: ["Python Flask", "MySQL", "MongoDB", "Alerting"],
    description:
      "An automation tool to track messaging flows and manage inactivity.",
    highlights: [
      "Developed a Python Flask automation tool to track SMS and email flows using MySQL and MongoDB.",
      "Sends severity-based email alerts based on inactivity thresholds (14, 20, and 21 days).",
      "Automatically disables inactive flows to improve operational efficiency.",
      "Eliminated the need for manual monitoring of flow health.",
    ],
  },
  {
    title: "Price Prediction Engine",
    category: "CS50 Final Project (AI/ML)",
    tech: ["Python", "Data Science", "API", "Algorithms"],
    description:
      "Asset price prediction tool using data from multiple APIs and user strategies.",
    highlights: [
      "Created as the final project for CS50X and CS50P.",
      "Predicts asset prices using data retrieved from two external APIs.",
      "Applies concepts in data retrieval, algorithmic processing, and interactive UI design.",
      "Allows users to apply selected strategies for prediction analysis.",
    ],
  },
  {
    title: "Phonon.io Website",
    category: "Corporate Web Dev",
    tech: ["React", "Spring Boot", "REST API", "Figma"],
    description:
      "A high-performance corporate website built from a Figma design, prioritizing mobile-first design.",
    highlights: [
      "Built a fully responsive, high-performance website from a Figma design.",
      "Integrated React frontend with Spring Boot backend using REST APIs.",
      "Prioritized mobile-first design principles to ensure seamless user experience.",
      "Focused on performance optimization to achieve high efficiency and load speeds.",
    ],
    link: "https://phonon.io",
  },
];
