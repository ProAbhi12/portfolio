import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "shakyaabhisekh466@gmail.com";

export default function Cta() {
  const root = useRef(null);
  const toast = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!copied || !toast.current) return;
    const t = toast.current;
    gsap.timeline()
      .fromTo(t, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" })
      .to(t, { opacity: 0, y: -8, duration: 0.4, ease: "power2.in", delay: 1.8 })
      .eventCallback("onComplete", () => setCopied(false));
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = "mailto:" + EMAIL;
    }
  };

  return (
    <section ref={root} aria-labelledby="cta-h">
      <div className="cta-band">
        <div className="cta-card" data-reveal>
          <h2 className="cta-h" id="cta-h">Tell me what your business is still keeping by hand.</h2>
          <p className="cta-mail" data-reveal>{EMAIL}</p>
          <div className="cta-actions" data-reveal>
            <button type="button" className={"btn" + (copied ? " copied" : "")} onClick={copy}>
              {copied ? (
                <>Copied <svg className="check" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12.5 10 18 20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg></>
              ) : "Copy email"}
            </button>
            <a className="btn btn-quiet" href={"mailto:" + EMAIL + "?subject=Project%20enquiry%20for%20Abhisekh"}>Write to me</a>
          </div>
          <p className="cta-note" data-reveal>Full-time or consulting, Kathmandu Valley or remote.</p>
        </div>
        <div className={"toast" + (copied ? " on" : "")} ref={toast} role="status" aria-live="polite">
          Email copied to clipboard
        </div>
      </div>
    </section>
  );
}
