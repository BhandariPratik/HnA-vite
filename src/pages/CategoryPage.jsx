import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PROJECTS_BY_CATEGORY, CATEGORY_LABELS } from "../data/siteData";
import "./CategoryPage.css";

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
          <p style={{color:"var(--ink)",fontSize:"small",marginTop:"2rem"}}>Projects coming soon.</p>
        ) : (
          <section className="project-grid" aria-label={`${label} projects`}>
            {projects.map(p => (
              <Link key={p.slug} className="project-card" to={`/project/${p.slug}`}>
                <figure className="project-image">
                  <img className="project-image-layer project-image-sketch" src={p.sketchSrc} alt={p.title} />
                  <img className="project-image-layer project-image-color" src={p.colorSrc} alt={p.title} />
                </figure>
                <h2 className="project-title">{p.title}</h2>
              </Link>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
