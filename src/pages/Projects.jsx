import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Projects.css";

const CATS = [
  { label:"Architecture.", to:"/projects/architecture" },
  { label:"Interior.", to:"/projects/interior" },
  { label:"Landscape.", to:"/projects/landscape" },
  { label:"Master Planning.", to:"/projects/master-planning" },
  { label:"Furniture.", to:"/projects/furniture" },
];

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="project-landing">
        <section className="visual-panel" aria-label="Architectural study">
          <img src="/random.jpg" alt="" />
        </section>
        <section className="proj-content">
          <p className="eyebrow" style={{color:"#636b75",fontSize:"smaller",fontWeight:400}}>Explore our work.</p>
          <h1 className="proj-ticker-wrap" aria-label="Constructing spatial intelligence through clarity of form, material, and intent.">
            <span className="proj-ticker-track" aria-hidden="true">
              {[0,1,2,3].map(i=>(
                <span key={i}>Constructing spatial intelligence through clarity of form, material, and intent.</span>
              ))}
            </span>
          </h1>
          <ul className="disciplines">
            {CATS.map(c => (
              <li key={c.to}><Link to={c.to}>{c.label}</Link></li>
            ))}
          </ul>
          <p className="proj-desc">A careful mix of structure, proportion, and a considered eye for getting things just right. Because good design is obvious, but only when it's done well. It's often the quieter choices that shape how a space is experienced. The kind where nothing screams for attention, yet everything quietly makes sense. Measured, refined, and maybe overthought just enough. Because "close enough" has never really been the goal.</p>
        </section>
        <div className="vertical-tag">Good design is as little design as possible.</div>
      </main>
    </>
  );
}
