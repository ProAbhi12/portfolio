import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GROCERY = [
  { name: "Basmati rice 5kg", price: "920", stock: "In stock" },
  { name: "Mustard oil 1L", price: "285", stock: "7 left" },
  { name: "Wai Wai, pack", price: "25", stock: "In stock" },
];

function GroceryGrid() {
  return (
    <div className="frag acc-rose" data-ui>
      <div className="frag-bar">
        <span className="frag-app">Grocery, storefront</span>
        <span className="frag-chip ok">stock synced</span>
      </div>
      <div className="prod-grid">
        {GROCERY.map((p) => (
          <div className="prod" key={p.name}>
            <span className="prod-tile" aria-hidden="true" />
            <p className="prod-name">{p.name}</p>
            <p className="prod-row"><span className="prod-price">Rs {p.price}</span><span className={"prod-stock " + (p.stock === "In stock" ? "ok" : "low")}>{p.stock}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    name: "DigiKarobar", kind: "Multi-tenant business suite, BCA final-year project", year: "2026", acc: "green",
    outcomes: [
      "Built as my eighth-semester final project: multiple companies run purchases, sales, inventory and reports on one install",
      "Low-stock alerts and sales trend analysis built in",
    ],
    stack: ["Laravel", "Blade", "JavaScript", "Bootstrap", "MySQL"],
    frag: (
      <>
        <div className="frag-bar"><span className="frag-app">DigiKarobar, Inventory</span><span className="frag-chip ok">demo data</span></div>
        <div className="frow cols4 fhead"><span>Item</span><span>Qty</span><span>Rate</span><span>Amount</span></div>
        <div className="frow cols4"><span>Multimeter DT-830</span><span>4</span><span>1,150</span><span>4,600</span></div>
        <div className="frow cols4"><span>Glassware set 24pc</span><span className="low">2</span><span>2,900</span><span>5,800</span></div>
        <div className="frow cols4"><span>Microscope slides</span><span>40</span><span>35</span><span>1,400</span></div>
        <div className="frow cols4 ftotal"><span>Total</span><span></span><span></span><span>11,800</span></div>
      </>
    ),
  },
  {
    name: "Income & Expense Tracker", kind: "Income / expense web app", year: "2024", acc: "amber",
    outcomes: [
      "Category-wise daily income and expense with running balances",
      "Downloadable summary reports for any period",
    ],
    stack: ["PHP", "JavaScript", "MySQL"],
    frag: (
      <>
        <div className="frag-bar"><span className="frag-app">Tracker, Today</span><span className="frag-chip ok">9,300 balance</span></div>
        <div className="frow cols4 fhead"><span>Date</span><span>Particulars</span><span>In</span><span>Out</span></div>
        <div className="frow cols4"><span>12 Sep</span><span>Shop sales</span><span>12,500</span><span></span></div>
        <div className="frow cols4"><span>12 Sep</span><span>Vegetables</span><span></span><span>800</span></div>
        <div className="frow cols4"><span>13 Sep</span><span>Electricity, NEA</span><span></span><span>2,400</span></div>
        <div className="frow cols4 ftotal"><span></span><span>Balance</span><span>9,300</span><span></span></div>
      </>
    ),
  },
  {
    name: "Gaming Paradise", kind: "Points-based game platform", year: "2025", acc: "indigo",
    outcomes: [
      "Games, daily bonuses and growing points for every player",
      "Delivered with the internship team as a website and a JavaFX desktop app",
    ],
    stack: ["Laravel", "PHP", "AJAX", "MySQL", "JavaFX"],
    frag: (
      <>
        <div className="frag-bar"><span className="frag-app">Gaming Paradise, Players</span><span className="frag-chip">bonus cycle on</span></div>
        <div className="frow cols3 fhead"><span>Player</span><span>Points</span><span>Bonus</span></div>
        <div className="frow cols3"><span>rakesh_ktm</span><span>4,210</span><span className="ok">claimed</span></div>
        <div className="frow cols3"><span>sunina_l</span><span>3,885</span><span className="ok">claimed</span></div>
        <div className="frow cols3"><span>bikash77</span><span>1,902</span><span>12:04 left</span></div>
      </>
    ),
  },
  {
    name: "Online Grocery Store", kind: "E-commerce with admin", year: "2023", acc: "rose",
    outcomes: [
      "Customers browse and order; admins manage products, categories and stock",
      "Full CRUD operations on every catalogue entity",
    ],
    stack: ["HTML", "CSS", "JavaScript", "AJAX", "PHP"],
    frag: <GroceryGrid />,
  },
];

const ACCENTS = {
  green: "46, 204, 97",
  amber: "232, 168, 44",
  indigo: "129, 140, 248",
  rose: "244, 114, 142",
};

function Card({ p }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.style.setProperty("--acc", ACCENTS[p.acc]);
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [p.acc]);
  return (
    <article className="card" ref={ref} data-reveal>
      <div className="card-glow" aria-hidden="true" />
      <div className="card-top">
        <div className="card-top-left">
          <h3>{p.name} <span className="year">{p.year}</span></h3>
          <p className="kind">{p.kind}</p>
        </div>
        <span className="card-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      <ul className="outcomes">
        {p.outcomes.map((o) => <li key={o}>{o}</li>)}
      </ul>
      {p.frag}
      <ul className="tags" aria-label="Technologies">
        {p.stack.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </article>
  );
}

export default function Work() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="work" ref={root}>
      <div className="shell">
        <h2 className="sec-h" data-reveal>Projects Done</h2>
        <div className="work-grid">
          {PROJECTS.map((p) => <Card key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  );
}
