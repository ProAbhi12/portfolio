import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const wrap = useRef(null);

  useEffect(() => {
    const bar = document.getElementById("progress");
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - innerHeight,
      onUpdate: (self) => {
        if (bar) gsap.to(bar, { scaleX: self.progress, duration: 0.1, overwrite: true });
      },
    });
    const onScroll = () => {
      wrap.current.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const ctx = gsap.context(() => {
      gsap.from(wrap.current, { y: -70, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.15 });
    });
    return () => { st.kill(); ctx.revert(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="nav-wrap" ref={wrap}>
      <nav className="nav" aria-label="Page">
        <a className="wordmark" href="#top" lang="ne">अभिषेक शाक्य</a>
        <div className="nav-links">
          <a href="#story">Story</a>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
        </div>
        <a className="btn btn-small" href="mailto:shakyaabhisekh466@gmail.com?subject=Project%20enquiry%20for%20Abhisekh">Email me</a>
      </nav>
    </div>
  );
}
