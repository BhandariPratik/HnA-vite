import { useParams, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { ALL_PROJECTS } from "../data/siteData";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = ALL_PROJECTS.find(p => p.slug === slug);

  // ── Carousel state ──
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const tapPrevented = useRef(false);
  const galleryRef = useRef(null);
  const lastMouse = useRef({ x: -1, y: -1 });
  const lbTouchStartX = useRef(0);
  const lbTouchEndX = useRef(0);
  const lbIsSwiping = useRef(false);

  // ── Lightbox state ──
  const [lightbox, setLightbox] = useState({ open: false, idx: 0, visible: false });

  useEffect(() => {
    if (!project) navigate("/projects");
  }, [project]);

  if (!project) return null;

  const { gallery } = project;
  const total = gallery.length;

  // ── Auto-slide ──
  const startAutoCycle = useCallback(() => {
    stopAutoCycle();
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex(i => (i + 1) % total);
    }, 3000);
  }, [total]);

  // const stopAutoCycle = () => {
  //   if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  // };

  const stopAutoCycle = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoCycle();
    return stopAutoCycle;
  }, [startAutoCycle]);

  // Track real cursor position so we can tell whether it's still over the
  // gallery when the lightbox closes (the overlay closing doesn't fire a
  // fresh mouseenter/mouseleave since the cursor itself never moved).
  useEffect(() => {
    const onMouseMove = (e) => {
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const isCursorOverGallery = () => {
    if (!galleryRef.current) return false;
    const r = galleryRef.current.getBoundingClientRect();
    const { x, y } = lastMouse.current;
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  // Single source of truth for "should autoplay restart right now?" — always
  // re-checks the actual cursor position instead of trusting that a
  // mouseenter/mouseleave fired correctly (it often doesn't when the
  // lightbox overlay appears/disappears on top of a stationary cursor).
  const resumeAutoCycleUnlessHovering = () => {
    if (!isCursorOverGallery()) startAutoCycle();
  };

  const goTo = (idx) => {
    setCurrentIndex((idx + total) % total);
  };

  const nextSlide = () => { stopAutoCycle(); goTo(currentIndex + 1); resumeAutoCycleUnlessHovering(); };
  const prevSlide = () => { stopAutoCycle(); goTo(currentIndex - 1); resumeAutoCycleUnlessHovering(); };

  // ── Touch swipe ──
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    isSwiping.current = true;
    stopAutoCycle();
  };

  const onTouchMove = (e) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const dist = touchEndX.current - touchStartX.current;
    if (dist < -50) goTo(currentIndex + 1);
    else if (dist > 50) goTo(currentIndex - 1);
    resumeAutoCycleUnlessHovering();
  };

  // ── Lightbox ──
  const openLightbox = (idx) => {
    stopAutoCycle();
    setLightbox({ open: true, idx, visible: false });
    setTimeout(() => setLightbox(l => ({ ...l, visible: true })), 10);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(l => ({ ...l, visible: false }));
    setTimeout(() => {
      setLightbox({ open: false, idx: 0, visible: false });
      document.body.style.overflow = "";
      resumeAutoCycleUnlessHovering();
    }, 250);
  };

  const lbNext = (e) => { e.stopPropagation(); setLightbox(l => ({ ...l, idx: (l.idx + 1) % total })); };
  const lbPrev = (e) => { e.stopPropagation(); setLightbox(l => ({ ...l, idx: (l.idx - 1 + total) % total })); };

  // ── Lightbox touch swipe ──
  const onLbTouchStart = (e) => {
    lbTouchStartX.current = e.changedTouches[0].screenX;
    lbIsSwiping.current = true;
  };

  const onLbTouchMove = (e) => {
    if (!lbIsSwiping.current) return;
    lbTouchEndX.current = e.changedTouches[0].screenX;
  };

  const onLbTouchEnd = () => {
    if (!lbIsSwiping.current) return;
    lbIsSwiping.current = false;
    const dist = lbTouchEndX.current - lbTouchStartX.current;
    if (dist < -50) setLightbox(l => ({ ...l, idx: (l.idx + 1) % total }));
    else if (dist > 50) setLightbox(l => ({ ...l, idx: (l.idx - 1 + total) % total }));
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightbox(l => ({ ...l, idx: (l.idx + 1) % total }));
      if (e.key === "ArrowLeft") setLightbox(l => ({ ...l, idx: (l.idx - 1 + total) % total }));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox.open, total]);

  const handleShareProject = async (projectName, projectTypology = "Architecture") => {
    const shareData = {
      title: `${projectName} | HASMiT & ARCHiTECTS`,
      text: `Explore ${projectName} — a ${projectTypology.toLowerCase()} project by HASMiT & ARCHiTECTS.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Project link copied to clipboard!");
      }
    } catch (error) {
      console.log("Share canceled:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="project-detail">
        <p className="breadcrumb">
          <Link to="/projects" className="back-link">Projects</Link>
          <span className="separator">&gt;</span>
          <Link to={`/projects/${project.category}`} className="back-link">
            {project.category === "master-planning" ? "Master Planning" :
              project.category === "furniture" ? "Furniture Design" :
                project.category === "landscape" ? "Landscape Design" :
                  project.category === "interior" ? "Interior Design" : "Architectural Design"}
          </Link>
        </p>

        <section className="detail-hero">
          <div>
            <h1>{project.title}</h1>
            {project.partner && (
              <div>
                <i className="partner">{project?.partner}</i>
              </div>
            )}
            <p className="eyebrow">{project.location}</p>
            <div className="project-share-container">
              <button type="button" className="btn-share-project"
                onClick={() => handleShareProject(project.title, project.typology)}
              >
                <svg viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "12px", height: "12px" }}
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 0 0 0-1.39l7.02-4.11A2.99 2.99 0 1 0 15 5a2.5 2.5 0 0 0 .04.44L8.02 9.56a3 3 0 1 0 0 4.88l7.02 4.12c-.03.14-.04.29-.04.44a3 3 0 1 0 3-2.92z" />
                </svg>
                <span>Share Project</span>
              </button>
            </div>
          </div>
          <p className="detail-lead">{project.lead}</p>
        </section>

        {/* ── CAROUSEL GALLERY ── */}
        <section
          ref={galleryRef}
          className="project-gallery-carousel"
          aria-label="Project image gallery"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={stopAutoCycle}
          onMouseLeave={resumeAutoCycleUnlessHovering}
        >
          {/* Prev / Next arrows */}
          <button
            type="button"
            className="carousel-nav-btn btn-prev"
            aria-label="Previous slide"
            onClick={prevSlide}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-nav-btn btn-next"
            aria-label="Next slide"
            onClick={nextSlide}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Slider track */}
          <div
            className="gallery-slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {gallery.map((img, i) => (
              <div key={i} className="gallery-carousel-item">
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable="false"
                  onTouchStart={() => { tapPrevented.current = false; }}
                  onTouchMove={() => { tapPrevented.current = true; }}
                  onClick={() => {
                    if (tapPrevented.current) return;
                    setCurrentIndex(i);
                    openLightbox(i);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="carousel-dots">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot${i === currentIndex ? " is-active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { stopAutoCycle(); goTo(i); resumeAutoCycleUnlessHovering(); }}
              />
            ))}
          </div>
        </section>

        <section className="detail-grid">
          <div className="facts">
            <p><span>Typology</span>{project.typology}</p>
            <p><span>Area</span>{project.area}</p>
            <p><span>Year</span>{project.year}</p>
          </div>
          <div className="narrative">
            {project.narrative.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX ── */}
      {lightbox.open && (
        <div
          className="lightbox"
          style={{ opacity: lightbox.visible ? 1 : 0 }}
          onTouchStart={onLbTouchStart}
          onTouchMove={onLbTouchMove}
          onTouchEnd={onLbTouchEnd}
          onClick={closeLightbox}
        >
          <button className="lb-close" onClick={e => { e.stopPropagation(); closeLightbox(); }}>&times;</button>
          <button className="lb-prev" onClick={lbPrev}>&lt;</button>
          <img
            className="lb-img"
            src={gallery[lightbox.idx].src}
            alt={gallery[lightbox.idx].alt}
            style={{ transform: lightbox.visible ? "scale(1)" : "scale(0.95)" }}
            onClick={e => e.stopPropagation()}
            draggable="false"
          />
          <button className="lb-next" onClick={lbNext}>&gt;</button>

          <div className="lb-dots">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`lb-dot${i === lightbox.idx ? " is-active" : ""}`}
                aria-label={`Go to image ${i + 1}`}
                onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, idx: i })); }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}