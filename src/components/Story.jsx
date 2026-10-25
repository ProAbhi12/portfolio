import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ic = {
  years: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v16H4zM4 9h16M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
  ),
  systems: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>
  ),
  training: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 2.5 8.5 12 13l9.5-4.5zM6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5M21.5 9v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h18v12H3zM9 8V5h6v3M3 13h18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
  ),
};

const STATS = [
  { icon: Ic.years, n: 7, unit: "yrs", l: "keeping purchase, sales, stock and VAT records at Kushal International" },
  { icon: Ic.systems, n: 4, unit: "", l: "working systems shipped, from business suite to game platform" },
  { icon: Ic.training, n: 8, unit: "mo", l: "full-stack training with Lalitpur Metropolitan City, CNF and Aster" },
  { icon: Ic.work, n: 2026, unit: "", l: "joined Aster Innovations as Full-Stack Developer", plain: true },
];

const TIMELINE = [
  { when: "2018 to 2025", what: "Business Operation Assistant", where: "Kushal International Trading Concern, Nhu Bahal" },
  { when: "2025", what: "BCA, Tribhuvan University, and a Laravel internship", where: "Kathmandu National College and Ram Janaki Software" },
  { when: "2025 to 2026", what: "Full Stack Development training, selected", where: "Lalitpur Metropolitan City, CNF and Aster Innovations" },
  { when: "July 2026, present", what: "Full-Stack Developer", where: "Aster Innovations (Pvt.) Ltd., Pulchowk" },
];

export default function Story() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray(".stat").forEach((el, i) => {
        const target = Number(el.dataset.n);
        const numEl = el.querySelector(".n .v");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: "power2.out", snap: { v: 1 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => { if (numEl) numEl.textContent = obj.v.toLocaleString("en-IN"); },
          delay: i * 0.08,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="story" ref={root}>
      <div className="shell">
        <div className="story-grid">
          <div className="story-copy">
            <h2 className="sec-h" data-reveal>Seven years of ledgers, then the code.</h2>
            <p data-reveal>
              For seven years I ran the books of a scientific-instruments trading concern in Nhu Bahal:
              purchases, sales, stock and quarterly VAT, on ledger books, Excel and in Tigg. I know
              what a business writes down all day, because I wrote it down.
            </p>
            <p data-reveal>
              In 2025 I finished a BCA at Tribhuvan University and a Laravel internship at Ram Janaki
              Software, then was selected into the eight-month Full Stack Development training run by
              Lalitpur Metropolitan City, Changunarayan Foundation and Aster Innovations. I finished it
              in June 2026 and joined Aster as a developer.
            </p>
            <div className="stats">
              {STATS.map((s, i) => (
                <div className="stat" key={i} data-n={s.n} data-reveal>
                  <span className="stat-ic" aria-hidden="true">{s.icon}</span>
                  <p className="n">{s.plain ? <span className="v">{s.n}</span> : <span className="v">0</span>}{s.unit && <span className="unit">{s.unit}</span>}</p>
                  <p className="l">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="timeline" aria-label="The record">
            {TIMELINE.map((t, i) => (
              <div className="t-row" key={i} data-reveal>
                <p className="t-when">{t.when}</p>
                <p className="t-what">{t.what}<span className="where">{t.where}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
