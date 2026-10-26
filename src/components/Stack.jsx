import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* items: string = proficient, [name, "basic"] = working knowledge (per CV) */
const GROUPS = [
  {
    label: "Languages",
    items: ["HTML5", "CSS3", "JavaScript", "PHP", "SQL", "Java", ["TypeScript", "basic"], ["Python", "basic"]],
  },
  {
    label: "Frontend",
    items: ["React", "Bootstrap", "Tailwind CSS", "AJAX", "Responsive interfaces"],
  },
  {
    label: "Backend & APIs",
    items: ["Laravel", "Blade", ["ASP.NET", "basic"], [".NET", "basic"], "REST API development", "API integration"],
  },
  {
    label: "Databases",
    items: ["MySQL", "SQL Server", "SSMS", "Relational design", "CRUD operations", "Joins & query optimization"],
  },
  {
    label: "Testing & Quality",
    items: ["Unit testing", "Integration testing", "Debugging", "Input validation", "Error handling"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitLab", "XAMPP", "Apache", ["JavaFX", "basic"], "Microsoft Excel", "Microsoft Word", "Microsoft Outlook", "Tigg"],
  },
  {
    label: "Professional",
    items: ["Problem solving", "Teamwork", "Time management", "Adaptability", "Technical documentation", "Continuous learning"],
  },
];

function Pill({ item }) {
  const [name, level] = Array.isArray(item) ? item : [item, null];
  return (
    <li className={"pill" + (level === "basic" ? " pill-basic" : "")}>
      {name}
      {level === "basic" && <em> basic</em>}
    </li>
  );
}

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
        <h2 className="sec-h" data-reveal>Skills</h2>
        <p className="sec-sub" data-reveal>Everything I work with, grouped by what it does. Items marked basic are working knowledge I am actively strengthening.</p>
        <div className="skills-grid">
          {GROUPS.map((g) => (
            <div className="skill-card" key={g.label} data-reveal>
              <h3>{g.label}</h3>
              <ul className="pills">
                {g.items.map((item) => <Pill key={Array.isArray(item) ? item[0] : item} item={item} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
