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
  // Position is tracked as an index into an "extended" array that has a
  // clone of the last slide glued to the front and a clone of the first
  // slide glued to the end. That's what lets last→first (and first→last)
  // keep sliding in the same direction instead of snapping backwards
  // through every image — the lightbox uses the exact same mechanism below,
  // so both carousels wrap identically.
  const [galleryPos, setGalleryPos] = useState(1);
  const [galleryTransition, setGalleryTransition] = useState(true);
  const galleryAnimating = useRef(false);
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

  // ── Lightbox state (same seamless-wrap technique as the gallery) ──
  const [lightbox, setLightbox] = useState({ open: false, visible: false });
  const [lbPos, setLbPos] = useState(1);
  const [lbTransition, setLbTransition] = useState(true);
  const lbAnimating = useRef(false);

  useEffect(() => {
    if (!project) navigate("/projects");
  }, [project]);

  if (!project) return null;

  const { gallery } = project;
  const total = gallery.length;
  const hasMultiple = total > 1;

  // Extended arrays: [clone-of-last, ...real slides, clone-of-first]
  const extendedGallery = hasMultiple ? [gallery[total - 1], ...gallery, gallery[0]] : gallery;
  const trackLen = extendedGallery.length;

  const currentIndex = hasMultiple ? ((galleryPos - 1) % total + total) % total : 0;
  const lbIndex = hasMultiple ? ((lbPos - 1) % total + total) % total : 0;
  const displayGalleryPos = hasMultiple ? galleryPos : 0;
  const displayLbPos = hasMultiple ? lbPos : 0;

  // ── Auto-slide ──
  const startAutoCycle = useCallback(() => {
    stopAutoCycle();
    if (!hasMultiple) return;
    autoSlideRef.current = setInterval(() => {
      if (galleryAnimating.current) return;
      galleryAnimating.current = true;
      setGalleryTransition(true);
      setGalleryPos(p => p + 1);
    }, 3000);
  }, [total]);

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

  const resumeAutoCycleUnlessHovering = () => {
    if (!isCursorOverGallery()) startAutoCycle();
  };

  // Jump straight to a slide (dots) — still animates, just isn't a wrap move.
  const goTo = (idx) => {
    if (galleryAnimating.current) return;
    galleryAnimating.current = true;
    setGalleryTransition(true);
    setGalleryPos(((idx % total) + total) % total + 1);
  };

  const advanceGallery = (dir) => {
    if (galleryAnimating.current) return;
    galleryAnimating.current = true;
    setGalleryTransition(true);
    setGalleryPos(p => p + dir);
  };

  const nextSlide = () => { stopAutoCycle(); advanceGallery(1); resumeAutoCycleUnlessHovering(); };
  const prevSlide = () => { stopAutoCycle(); advanceGallery(-1); resumeAutoCycleUnlessHovering(); };

  // Once the track finishes animating onto a cloned slide, snap instantly
  // (transition disabled for one frame) to the matching real slide on the
  // other end. Visually indistinguishable, but it's what makes the wrap
  // look continuous instead of reversing through the whole gallery.
  const handleGalleryTransitionEnd = () => {
    if (!hasMultiple) { galleryAnimating.current = false; return; }
    if (galleryPos === 0) {
      setGalleryTransition(false);
      setGalleryPos(total);
    } else if (galleryPos === trackLen - 1) {
      setGalleryTransition(false);
      setGalleryPos(1);
    } else {
      galleryAnimating.current = false;
    }
  };

  useEffect(() => {
    if (!galleryTransition) {
      const raf = requestAnimationFrame(() => {
        setGalleryTransition(true);
        galleryAnimating.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [galleryTransition]);

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
    if (dist < -50) advanceGallery(1);
    else if (dist > 50) advanceGallery(-1);
    resumeAutoCycleUnlessHovering();
  };

  // ── Lightbox ──
  const openLightbox = (idx) => {
    stopAutoCycle();
    lbAnimating.current = false;
    setLbTransition(false);
    setLbPos(((idx % total) + total) % total + 1);
    setLightbox({ open: true, visible: false });
    setTimeout(() => setLightbox(l => ({ ...l, visible: true })), 10);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(l => ({ ...l, visible: false }));
    setTimeout(() => {
      setLightbox({ open: false, visible: false });
      document.body.style.overflow = "";
      resumeAutoCycleUnlessHovering();
    }, 250);
  };

  const advanceLightbox = (dir) => {
    if (lbAnimating.current) return;
    lbAnimating.current = true;
    setLbTransition(true);
    setLbPos(p => p + dir);
  };

  const lbNext = (e) => { e.stopPropagation(); advanceLightbox(1); };
  const lbPrev = (e) => { e.stopPropagation(); advanceLightbox(-1); };

  const handleLbTransitionEnd = () => {
    if (!hasMultiple) { lbAnimating.current = false; return; }
    if (lbPos === 0) {
      setLbTransition(false);
      setLbPos(total);
    } else if (lbPos === trackLen - 1) {
      setLbTransition(false);
      setLbPos(1);
    } else {
      lbAnimating.current = false;
    }
  };

  useEffect(() => {
    if (!lbTransition) {
      const raf = requestAnimationFrame(() => {
        setLbTransition(true);
        lbAnimating.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [lbTransition]);

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
    if (dist < -50) advanceLightbox(1);
    else if (dist > 50) advanceLightbox(-1);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") advanceLightbox(1);
      if (e.key === "ArrowLeft") advanceLightbox(-1);
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
            style={{
              transform: `translateX(-${displayGalleryPos * 100}%)`,
              transition: galleryTransition ? undefined : "none",
            }}
            onTransitionEnd={handleGalleryTransitionEnd}
          >
            {extendedGallery.map((img, i) => {
              const realIdx = hasMultiple ? (i - 1 + total) % total : i;
              return (
                <div key={i} className="gallery-carousel-item">
                  <img
                    src={img.src}
                    alt={img.alt}
                    draggable="false"
                    onTouchStart={() => { tapPrevented.current = false; }}
                    onTouchMove={() => { tapPrevented.current = true; }}
                    onClick={() => {
                      if (tapPrevented.current) return;
                      goTo(realIdx);
                      openLightbox(realIdx);
                    }}
                  />
                </div>
              );
            })}
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

          <div
            className="lb-viewport"
            style={{ transform: lightbox.visible ? "scale(1)" : "scale(0.95)" }}
          >
            <div
              className="lb-slider-track"
              style={{
                transform: `translateX(-${displayLbPos * 100}%)`,
                transition: lbTransition ? undefined : "none",
              }}
              onTransitionEnd={handleLbTransitionEnd}
            >
              {extendedGallery.map((img, i) => (
                <div key={i} className="lb-slide">
                  <img
                    src={img.src}
                    alt={img.alt}
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="lb-next" onClick={lbNext}>&gt;</button>

          <div className="lb-dots">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`lb-dot${i === lbIndex ? " is-active" : ""}`}
                aria-label={`Go to image ${i + 1}`}
                onClick={e => {
                  e.stopPropagation();
                  if (lbAnimating.current) return;
                  lbAnimating.current = true;
                  setLbTransition(true);
                  setLbPos(((i % total) + total) % total + 1);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}