// import { useParams, Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { PROJECTS_BY_CATEGORY, CATEGORY_LABELS } from "../data/siteData";
// import "./CategoryPage.css";

// export default function CategoryPage() {
//   const { category } = useParams();
//   const projects = PROJECTS_BY_CATEGORY[category] || [];
//   const label = CATEGORY_LABELS[category] || category;

//   return (
//     <>
//       <Navbar />
//       <main className="category-page">
//         <p className="breadcrumb">
//           <Link to="/projects" className="back-link">Projects</Link>
//           <span className="separator">&gt;</span>
//           {label}
//         </p>

//         {projects.length === 0 ? (
//           <p style={{ color: "var(--ink)", fontSize: "small", marginTop: "2rem" }}>Projects coming soon.</p>
//         ) : (
//           <section className="project-grid" aria-label={`${label} projects`}>
//             {projects.map(p => (
//               <Link key={p.slug} className="project-card" to={`/project/${p.slug}`}>
//                 <figure className="project-image">
//                   {/* <img className="project-image-layer project-image-sketch" src={p.sketchSrc} alt={p.title} /> */}
//                   <img className="project-image-layer" src={p.colorSrc} alt={p.title} />
//                 </figure>
//                 <h2 className="project-title">{p.title}</h2>
//               </Link>
//             ))}
//           </section>

//         )}
//       </main>
//     </>
//   );
// }

import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { PROJECTS_BY_CATEGORY, CATEGORY_LABELS } from "../data/siteData";
import "./CategoryPage.css";

function ProjectCard({ p }) {
  const figureRef = useRef(null);
  const currentIdxRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const container = figureRef.current;
    if (!container) return;

    const images = p.gallery;
    if (!images || images.length < 2) return;

    images.forEach((img, idx) => {
      const el = document.createElement("img");
      el.src = img.src;
      el.alt = img.alt;
      el.className = idx === 0 ? "project-slide slide-center" : "project-slide slide-above";
      container.appendChild(el);
    });

    const slides = container.querySelectorAll(".project-slide");
    let current = 0;
    let timeoutId = null;

    const runCycle = () => {
      const delay = Math.floor(Math.random() * (6500 - 4000 + 1)) + 4000;

      timeoutId = setTimeout(() => {
        const pool = [];
        slides.forEach((_, idx) => {
          if (idx !== current) pool.push(idx);
        });
        const next = pool[Math.floor(Math.random() * pool.length)];

        // Snap next slide above without transition
        slides[next].style.transition = "none";
        slides[next].className = "project-slide slide-above";

        // Force reflow
        void slides[next].offsetHeight;

        // Re-enable transition
        slides[next].style.transition = "";

        // Double rAF: first frame commits the cleared transition,
        // second frame triggers the animated class change
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            slides[current].className = "project-slide slide-below";
            slides[next].className = "project-slide slide-center";
            current = next;
            runCycle();
          });
        });
      }, delay);
    };

    runCycle();

    return () => {
      clearTimeout(timeoutId);
      container.querySelectorAll(".project-slide").forEach(el => el.remove());
    };
  }, [p.gallery]);

  return (
    <Link className="project-card" to={`/project/${p.slug}`}>
      <figure className="project-image" ref={figureRef}>
        {/* Single image: render normally, no JS animation */}
        {(!p.gallery || p.gallery.length <= 1) && (
          <img
            className="project-slide slide-center"
            src={p.gallery?.[0]?.src || p.colorSrc}
            alt={p.gallery?.[0]?.alt || p.title}
          />
        )}
      </figure>
      <h2 className="project-title">{p.title}</h2>
    </Link>
  );
}

export default function CategoryPage() {
  const { category } = useParams();
  const projects = PROJECTS_BY_CATEGORY[category] || [];
  const label = CATEGORY_LABELS[category] || category;

  return (
    <>
      <Navbar />
      <main className="category-page">
        <p className="breadcrumb">
          <Link to="/projects" className="back-link">Projects</Link>
          <span className="separator">&gt;</span>
          {label}
        </p>

        {projects.length === 0 ? (
          <p style={{ color: "var(--ink)", fontSize: "small", marginTop: "2rem" }}>
            Projects coming soon.
          </p>
        ) : (
          <section className="project-grid" aria-label={`${label} projects`}>
            {projects.map(p => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
