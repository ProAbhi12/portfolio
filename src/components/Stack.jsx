import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  { label: "Frontend", items: ["React", "JavaScript", "Bootstrap", "Tailwind CSS", "AJAX"] },
  { label: "Backend", items: ["Laravel", "PHP", ".NET", "ASP.NET"] },
  { label: "Data", items: ["MySQL", "SQL Server", "SSMS"] },
  { label: "Practice", items: ["REST APIs", "Unit testing", "Integration testing", "Git", "GitLab", "JavaFX"] },
];

export default function Stack() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 26 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="stack" ref={root}>
      <div className="shell">
        <h2 className="sec-h" data-reveal>What I build with</h2>
        <div className="stack-groups">
          {GROUPS.map((g) => (
            <div className="g-row" key={g.label} data-reveal>
              <dt>{g.label}</dt>
              <dd>
                <ul className="pills">
                  {g.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
