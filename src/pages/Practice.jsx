import Navbar from "../components/Navbar";
import "./TextPage.css";

export default function Practice() {
  return (
    <>
      <Navbar />
      <main className="text-page">
        <h1>Practice</h1>
        <p className="intro">
          <span style={{color:"var(--title-tone)",fontWeight:500}}>HASMiT &amp; ARCHiTECTS</span>{" "}
          is a forward-thinking multidisciplinary studio based in Umbergaon-Gujarat and Mumbai, operating through a globally connected team that transcends physical borders. The practice delivers innovative and sustainable design solutions that seamlessly blend form and function, meticulously tailored to honor the unique vision of each collaborator. Working across scales and disciplines, the studio specializes in architecture, interior design, and landscape design. Driven by innovation, enduring quality, and a collaborative design process, H&amp;A believes meaningful environments emerge through careful detailing, contextual sensitivity, and a deep understanding of people and place. Each project is shaped through exploration and craftsmanship, resulting in spaces that are timeless, refined, and emotionally connected to their surroundings.
        </p>
        <section className="text-step">
          <p>Design, in our practice, is a rhythmic movement between the abstract and the physical: a collaborative exploration of how we interact with our environment. As a multidisciplinary studio, we approach every project, regardless of scale or typology, as an opportunity to find a meaningful conversation between the site, the material, and the human experience. Our process is an evolving journey of shared authorship, where the final form is a result of patience, iteration, and the joy of making.</p>
        </section>
      </main>
    </>
  );
}
