/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { EXPERIENCES, PERSONAL_INFO, PRESALES, PROJECTS, SKILL_CATEGORIES } from "./constants";
import fullStackResume from "./assets/chetan-resume-2026-nov.pdf";
import presalesResume from "./assets/chetan-resume-presales-2026-nov.pdf";

/*
 * Two portfolios in one site.
 *  - Any URL containing "pre" (/presales, /pre-sales, ?presales …) shows the Pre-Sales /
 *    Solution Consultant version: its own headline, about text, experience bullets, skills and
 *    resume PDF.
 *  - Everything else shows the Full Stack version.
 * The choice is remembered for the tab, so moving to another page (e.g. the Blinkit case
 * study) and back keeps the same version.
 */

export type ProfileKind = "fullstack" | "presales";

type SkillItem = { name: string; icon?: React.ElementType; color?: string };
type SkillCategory = { title: string; icon: React.ElementType; skills: SkillItem[] };

export type Profile = {
  kind: ProfileKind;
  /** Where "home" lives for this version: "/" or e.g. "/presales". */
  homePath: string;
  role: string;
  roles: string[];
  tagline: ReactNode;
  about: string;
  focus: string[];
  experiences: typeof EXPERIENCES;
  skillCategories: SkillCategory[];
  projects: typeof PROJECTS;
  resume: { file: string; downloadName: string };
};

const KEY = "portfolio-profile";
const isPre = (s: string) => /pre/i.test(s);

/** Home routes: "/" and any single-segment path containing "pre" (e.g. /presales). */
export const isHomePath = (pathname: string) => pathname === "/" || /^\/[^/]*pre[^/]*\/?$/i.test(pathname);

function detect(pathname: string, search: string): { kind: ProfileKind; homePath: string } {
  if (isPre(pathname) || isPre(search)) {
    const homePath = isHomePath(pathname) && pathname !== "/" ? pathname : `/${search}`;
    try {
      sessionStorage.setItem(KEY, homePath);
    } catch {
      /* storage blocked */
    }
    return { kind: "presales", homePath };
  }
  // Plain home URL = Full Stack. On other pages, keep whatever version the visitor came from.
  if (pathname === "/") {
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      /* storage blocked */
    }
    return { kind: "fullstack", homePath: "/" };
  }
  let saved: string | null = null;
  try {
    saved = sessionStorage.getItem(KEY);
  } catch {
    /* storage blocked */
  }
  return saved ? { kind: "presales", homePath: saved } : { kind: "fullstack", homePath: "/" };
}

const FULL_STACK_TAGLINE = (
  <>
    Crafting seamless digital experiences — I blend <span className="text-blue-300">architectural precision</span> with{" "}
    <span className="text-emerald-300">creative automation</span> to build scalable solutions that live on the web and mobile.
  </>
);

function build(kind: ProfileKind, homePath: string): Profile {
  if (kind === "fullstack") {
    return {
      kind,
      homePath,
      role: PERSONAL_INFO.role,
      roles: ["Full Stack Developer", "Backend Architect", "System Automator"],
      tagline: FULL_STACK_TAGLINE,
      about: PERSONAL_INFO.about,
      focus: ["Web apps", "Mobile apps", "REST APIs", "Real-time systems", "Queues & workers", "Automation", "Cloud"],
      experiences: EXPERIENCES,
      skillCategories: SKILL_CATEGORIES,
      projects: PROJECTS,
      resume: { file: fullStackResume, downloadName: "Chetan_Machhi_Resume.pdf" },
    };
  }
  const featured = PROJECTS.find((p) => p.title === PRESALES.featuredProject);
  return {
    kind,
    homePath,
    role: PRESALES.role,
    roles: PRESALES.roles,
    tagline: PRESALES.tagline,
    about: PRESALES.about,
    focus: PRESALES.focus,
    experiences: EXPERIENCES.map((e) => ({ ...e, description: PRESALES.experience[e.company] ?? e.description })),
    skillCategories: [...PRESALES.skillCategories, ...SKILL_CATEGORIES],
    projects: featured ? [featured, ...PROJECTS.filter((p) => p !== featured)] : PROJECTS,
    resume: { file: presalesResume, downloadName: "Chetan_Machhi_Pre-Sales_Solution_Consultant_Resume.pdf" },
  };
}

const ProfileCtx = createContext<Profile>(build("fullstack", "/"));

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation();
  const { kind, homePath } = useMemo(() => detect(pathname, search), [pathname, search]);
  const profile = useMemo(() => build(kind, homePath), [kind, homePath]);

  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${kind === "presales" ? "Solution Consultant & Pre-Sales Engineer" : "Full Stack Developer"}`;
  }, [kind]);

  return <ProfileCtx.Provider value={profile}>{children}</ProfileCtx.Provider>;
}

export const useProfile = () => useContext(ProfileCtx);
