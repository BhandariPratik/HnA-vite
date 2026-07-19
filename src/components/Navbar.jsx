import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS, SOCIAL_LINKS } from "../data/siteData";
import { useMenu } from "../context/menuContext";

export default function Navbar({ transparent = false }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { showHint, isMenuOpen, setIsMenuOpen, setShowHint } = useMenu();


  const nav = useNavigate();
  const location = useLocation();

  const goHome = () => {
    nav("/");
    setIsMenuOpen(false);
  };

  const color = transparent ? "#fff" : "var(--ink)";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 10) {
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

  // Lock the page from scrolling while the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const savedScrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      delete document.body.dataset.scrollY;
      window.scrollTo(0, savedScrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLetsTalk = (e) => {
  e.preventDefault();
  setIsMenuOpen(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (location.pathname === "/") {
    setTimeout(scrollToContact, 80);
  } else {
    nav("/");
    setTimeout(scrollToContact, 100);
  }
};

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowHint(false);
    // setOpen(o => !o)
  };

  return (
    <header
      className={`nav ${ isMenuOpen ? "menu-is-open" : ""} ${showNavbar ? "nav-show" : "nav-hide"
        }`}
      style={{ color, backgroundColor: (location.pathname !== "/") && "#ffffff" }}
      aria-label="Primary navigation"
    >

      {/* {!isMenuOpen ? */}
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




      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={handleMenuClick}
      >
        <span className="hamburger-box">
          {/* <span className="hamburger-dot" /> */}
          <span className={`hamburger-dot ${!showHint ? "pulse-disabled" : ""}`} />
          <span className="hamburger-line hamburger-line--1" />
          <span className="hamburger-line hamburger-line--2" />
        </span>
      </button>

      <div className="nav-links-wrapper">
        <div className="mobile-menu-header"
        >
          <img
            src="/primary-logo-orange.svg"
            alt="Hasmit & Architects"
            className="nav-logo"
            onClick={goHome}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goHome()}
          />
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => {  setIsMenuOpen(false) }}
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
                className={s.label === "Pinterest" ? "social-link pinterest-icon" : ""}
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