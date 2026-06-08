import { useParams, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { ALL_PROJECTS } from "../data/siteData";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = ALL_PROJECTS.find(p => p.slug === slug);
  const galleryRef = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, idx: 0, visible: false });

  useEffect(() => {
    if (!project) navigate("/projects");
  }, [project]);

  if (!project) return null;

  const { gallery } = project;

  const goTo = idx => {
    const norm = (idx + gallery.length) % gallery.length;
    const g = galleryRef.current;
    if (g) g.scrollTo({ left: g.children[norm].offsetLeft, behavior: "smooth" });
  };

  const openLightbox = idx => {
    setLightbox({ open: true, idx, visible: false });
    setTimeout(() => setLightbox(l => ({ ...l, visible: true })), 10);
  };

  const closeLightbox = () => {
    setLightbox(l => ({ ...l, visible: false }));
    setTimeout(() => setLightbox({ open: false, idx: 0, visible: false }), 250);
  };

  const lbNext = e => { e.stopPropagation(); setLightbox(l => ({ ...l, idx: (l.idx + 1) % gallery.length })); };
  const lbPrev = e => { e.stopPropagation(); setLightbox(l => ({ ...l, idx: (l.idx - 1 + gallery.length) % gallery.length })); };

  useEffect(() => {
    const onKey = e => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightbox(l => ({ ...l, idx: (l.idx + 1) % gallery.length }));
      if (e.key === "ArrowLeft") setLightbox(l => ({ ...l, idx: (l.idx - 1 + gallery.length) % gallery.length }));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox.open, gallery.length]);

  const handleGalleryClick = e => {
    if (Date.now() - pressTime.current > 250) return;
    const img = e.target.closest(".gallery-image img");
    if (!img) return;
    const g = galleryRef.current;
    const bounds = g.getBoundingClientRect();
    const cx = e.clientX - bounds.left;
    const zone = bounds.width * 0.5;
    const left = (bounds.width - zone) / 2;
    const right = left + zone;
    const idx = Array.from(g.querySelectorAll(".gallery-image img")).indexOf(img);
    if (cx >= left && cx <= right) { if (idx !== -1) openLightbox(idx); }
    else if (cx < left) { const cur = getCurrentIdx(); goTo(cur - 1); }
    else { const cur = getCurrentIdx(); goTo(cur + 1); }
  };

  const pressTime = useRef(0);
  const getCurrentIdx = () => {
    const g = galleryRef.current;
    if (!g) return 0;
    const items = Array.from(g.querySelectorAll(".gallery-image"));
    return items.reduce((acc, el, i) => {
      const d = Math.abs(el.offsetLeft - g.scrollLeft);
      return d < acc.d ? { idx: i, d } : acc;
    }, { idx: 0, d: Infinity }).idx;
  };

  const handleShareProject = async (projectName, projectTypology = "Architecture") => {
    console.log("Sharing project:", projectName);
    console.log("navigator.share =", navigator.share);
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

  // const handleShareProject = async (projectName) => {
  //   const url = window.location.href;

  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: `${projectName} | HASMiT & ARCHiTECTS`,
  //         url,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     await navigator.clipboard.writeText(url);
  //     alert("Project link copied to clipboard!");
  //   }
  // };
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

        <section
          className="project-gallery"
          ref={galleryRef}
          aria-label="Project image gallery"
          onMouseDown={() => pressTime.current = Date.now()}
          onMouseUp={handleGalleryClick}
        >
          {gallery.map((img, i) => (
            <figure key={i} className="gallery-image">
              <img src={img.src} alt={img.alt} draggable="false" />
            </figure>
          ))}
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

      {/* LIGHTBOX */}
      {lightbox.open && (
        <div
          className="lightbox"
          style={{ opacity: lightbox.visible ? 1 : 0 }}
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
        </div>
      )}
    </>
  );
}
