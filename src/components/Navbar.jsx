import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS, SOCIAL_LINKS } from "../data/siteData";

export default function Navbar({ transparent = false }) {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const nav = useNavigate();
  const location = useLocation();

  const close = () => setOpen(false);

  const goHome = () => {
    nav("/");
    close();
  };

  const color = transparent ? "#fff" : "var(--ink)";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false); // hide while scrolling down
      } else {
        setShowNavbar(true); // show while scrolling up
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLetsTalk = (e) => {
    e.preventDefault();
    close();

    const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname === "/") {
      scrollToContact();
    } else {
      nav("/");
      setTimeout(scrollToContact, 100);
    }
  };

  return (
    <header
      className={`nav ${open ? "menu-is-open" : ""} ${showNavbar ? "nav-show" : "nav-hide"
        }`}
      style={{ color }}
      aria-label="Primary navigation"
    >
      <span
        className="logo"
        onClick={goHome}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && goHome()}
      >
        {/* HASMiT &amp; ARCHiTECTS */}
        <img
          src="/text-logo-orange.svg"
          alt="Hasmit & Architects"
          className="logo-image"
        />
      </span>


      <img
        src="/primary-logo-orange.svg"
        alt="Hasmit & Architects"
        className="logo-image-mobile"
      />

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="hamburger-box">

          <span className="hamburger-dot" />
          <span className="hamburger-line hamburger-line--1" />
          <span className="hamburger-line hamburger-line--2" />
        </span>

      </button>
      <div className="nav-links-wrapper">
        <div className="mobile-menu-header" />

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={close}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-footer">
          <a className="mobile-cta" href="#contact" onClick={handleLetsTalk}>
            Let's Talk
          </a>

          {/* <div className="mobile-socials">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div> */}
        </div>
      </div>

      <div className="nav-actions">
        <div className="social-menu-wrap">
          <button
            className="social-toggle"
            type="button"
            aria-label="Social media links"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="8" r="3" />
              <path d="M3.8 18.2c.8-3.1 2.9-4.7 5.2-4.7s4.4 1.6 5.2 4.7" />
              <path d="M17.5 5.5v4" />
              <path d="M15.5 7.5h4" />
            </svg>
          </button>

          <div className="social-menu" aria-label="Social media links">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <a className="nav-cta" href="#contact" onClick={handleLetsTalk}>
          Let's Talk
        </a>
      </div>
    </header>
  );
}
