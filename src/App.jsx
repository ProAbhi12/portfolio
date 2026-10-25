import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import Work from "./components/Work.jsx";
import Stack from "./components/Stack.jsx";
import Cta from "./components/Cta.jsx";
import Footer from "./components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis = null;
    let cleanupFns = [];

    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanupFns.push(() => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      });
    }

    document.fonts.ready.then(() => {
      setReady(true);
      ScrollTrigger.refresh();
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="progress" id="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Story />
        <Work />
        <Stack />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
