import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is (near) on screen AND the browser tab is visible.
 * Use it to pause timers/auto-play animations that nobody can see — an off-screen
 * carousel ticking every 2s was making the whole page stutter while scrolling.
 */
export function useActiveInView(ref: RefObject<Element | null>, rootMargin = "100px") {
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => typeof document === "undefined" || !document.hidden);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return inView && tabVisible;
}
