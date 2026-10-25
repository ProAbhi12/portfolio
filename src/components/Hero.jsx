import { useEffect, useRef } from "react";
import gsap from "gsap";

const line1 = "Abhisekh";
const line2 = "Shakya";

export default function Hero({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-title .l1 span", { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0.1)
        .fromTo(".hero-title .l2 span", { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0.28)
        .fromTo(".hero-kicker", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
        .fromTo(".hero-sub", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 0.72)
        .fromTo(".hero-actions", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 0.86)
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.3)
        .fromTo(".hero-aside", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.1 }, 1.0);

      // floating aside card tilts gently toward the pointer
      const aside = root.current.querySelector(".hero-aside");
      let rx = null, ry = null;
      if (aside) {
        rx = gsap.quickTo(aside, "rotationX", { duration: 0.8, ease: "power3.out" });
        ry = gsap.quickTo(aside, "rotationY", { duration: 0.8, ease: "power3.out" });
        const tilt = (e) => {
          const r = aside.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
          ry(nx * 7); rx(-ny * 7);
        };
        const untilt = () => { rx(0); ry(0); };
        aside.addEventListener("pointermove", tilt);
        aside.addEventListener("pointerleave", untilt);
      }
      const float = gsap.to(aside, { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      return () => { float.kill(); };
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={root} aria-label="Introduction">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-main">
            <p className="hero-kicker"><span className="dot" aria-hidden="true" /> Available for full-time and consulting roles</p>
            <h1 className="hero-title">
              <span className="row l1" aria-label={line1}>{line1.split("").map((c, i) => <span key={i} aria-hidden="true">{c}</span>)}</span>
              <span className="row l2 accent" aria-label={line2}>{line2.split("").map((c, i) => <span key={i} aria-hidden="true">{c}</span>)}</span>
            </h1>
            <p className="hero-sub" data-reveal>
              Full-stack developer at Aster Innovations, Pulchowk. For seven years I kept a trading
              concern&rsquo;s books by hand. Now I build the software that keeps them.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="btn magnetic" href="#work">See the work</a>
              <a className="btn btn-quiet magnetic" href="/assets/abhisekh-shakya-cv.pdf">Download CV</a>
            </div>
          </div>
          <div className="hero-side">
            <aside className="hero-aside" aria-label="Current position">
              <div className="ha-group">
                <p className="ha-label">Now</p>
                <p className="ha-value">Full-Stack Developer</p>
                <p className="ha-sub">Aster Innovations, Pulchowk</p>
              </div>
              <div className="ha-group">
                <p className="ha-label">Since</p>
                <p className="ha-value">July 2026</p>
                <p className="ha-sub">Retained after the eight-month training</p>
              </div>
              <div className="ha-group">
                <p className="ha-label">Studying</p>
                <p className="ha-value">MCA</p>
                <p className="ha-sub">Patan Multiple College, Tribhuvan University</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <p className="hero-scroll" aria-hidden="true">
        Scroll
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><path d="M7 1v16m0 0 5-5M7 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </p>
    </section>
  );
}
