import Navbar from "../components/Navbar";
import { TEAM } from "../data/siteData";
import "./People.css";

export default function People() {
  return (
    <>
      <Navbar />
      <main className="people-page">
        <section className="people-hero">
          <h1>The synergy behind the space!</h1>
          <p className="lead">At HASMiT &amp; ARCHiTECTS, we believe great design is a byproduct of diverse perspectives. Our team is a curated blend of visionary architects, technical engineers, and digital artists working across borders.</p>
        </section>

        <section className="founder-profile">
          <div className="founder-image">
            <img src="../../people/people-hasmit.jpg?w=900&q=85&auto=format&fit=crop" alt="Ar. Hasmit Bhandari" />
          </div>
          <div className="founder-copy">
            <h2>Ar. Hasmit Bhandari</h2>
            {/* <p className="role">Founder &amp; Principal Architect</p> */}
            <p className="role">Founder &amp; Principal Architec</p>
            <p>The journey into architecture began with an academic foundation. Buoyed by the encouragement of family and friends, Ar. Hasmit was empowered to pursue his professional ambitions wholeheartedly.</p>
            <p>Following his academic tenure, he gained valuable experience working with several firms within the architecture and design industry. While these roles provided essential insights, Ar. Hasmit maintained a long-term vision of establishing an independent practice to make a distinct mark on the industry.</p>
            <p>To prepare for this chapter, he explored a wide spectrum of cultures and materials through extensive site visits. This broad knowledge base and the perspectives gained became invaluable assets to his practice, informing a design language rooted in material authenticity and conceptual depth.</p>
            <p>Today, Ar. Hasmit leads a multidisciplinary studio where various design disciplines are viewed as a convergence of technical precision and conceptual storytelling.</p>
          </div>
        </section>

        <section className="people-note">
          <p className="eyebrow">Creative &amp; Passionate Brains</p>
        </section>

        <section className="people-board">
          {TEAM.map(m => (
            <article key={m.name} className="person-card">
              <div className="person-image">
                <img src={m.img} alt={`Portrait of ${m.name}`} />
              </div>
              <div className="person-info">
                <h2>{m.name}</h2>
                <p>{m.role}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
