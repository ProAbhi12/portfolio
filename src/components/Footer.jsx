export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-places">
            <p className="foot-name">Abhisekh Shakya</p>
            <a href="mailto:shakyaabhisekh466@gmail.com">shakyaabhisekh466@gmail.com</a>
            <a href="tel:+9779869562978">+977 98 6956 2978</a>
            <a href="https://www.openstreetmap.org/#map=15/27.6785/85.3187" rel="noopener">Lalitpur, Nepal</a>
          </div>
          <div className="foot-col">
            <h3>CV</h3>
            <a href="/assets/abhisekh-shakya-cv.pdf">Download the PDF</a>
          </div>
          <div className="foot-col">
            <h3>Now</h3>
            <span>Full-Stack Developer at Aster Innovations</span>
            <span>MCA at Patan Multiple College</span>
          </div>
        </div>
        <div className="foot-legal">
          <span>© 2026 Abhisekh Shakya</span>
          <a className="to-top" href="#top">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to top
        </a>
        </div>
      </div>
    </footer>
  );
}
