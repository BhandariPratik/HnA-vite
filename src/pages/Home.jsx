import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DotField from "../components/DotField";
import { useReveal } from "../hooks/useReveal";
import { HERO_SLIDES, TICKER_WORDS, SOCIAL_LINKS } from "../data/siteData";
import "./Home.css";

export default function Home() {
  const [active, setActive] = useState(0);
  const ref = useReveal();

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a+1) % HERO_SLIDES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const words = [...TICKER_WORDS, ...TICKER_WORDS];

  return (
    <>
      <Navbar transparent />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            {HERO_SLIDES.map((src, i) => (
              <img key={src} className={`hero-slide${i===active?" is-active":""}`} src={src} alt="" />
            ))}
          </div>
          <DotField dotRadius={2} dotSpacing={14} bulgeStrength={67} />
          <div className="hero-content">
            <img src="/L1.png" className="hero-brand-graphic" alt="Studio logo" />
            <p className="eyebrow" style={{color:"#fff"}}>Design studio - est. 2023</p>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {words.map((w,i) => <span key={i}>{w}</span>)}
          </div>
        </div>

        {/* CONTACT */}
        <section id="contact" className="contact-section" ref={ref}>
          <div>
            <p className="eyebrow reveal">Start the conversation</p>
            <h2 className="section-title reveal">To break a boundary, to build a narrative, to order a chaos.</h2>
          </div>
          <div className="contact-links-grid reveal">
            <div className="contact-link-item">
              <span className="label">Phone</span>
              <a href="tel:+917567363999" className="value">+91 75673 63999</a>
            </div>
            <div className="contact-link-item">
              <span className="label">Email</span>
              <a href="mailto:hasmitandarchitects@gmail.com" className="value">hasmitandarchitects@gmail.com</a>
            </div>
            <div className="contact-link-item">
              <span className="label">Location</span>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="value">Get Studio Directions →</a>
            </div>
            <div className="contact-link-item">
              <span className="label">Social</span>
              <div className="social-icons-bubble-bar">
                {SOCIAL_LINKS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon-round-link" aria-label={s.label}>
                    <i className={s.faIcon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
