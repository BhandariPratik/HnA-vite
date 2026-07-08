import Navbar from "../components/Navbar";
import { PROCESS_STEPS } from "../data/siteData";
import "./TextPage.css";

export default function Process() {
  return (
    <>
      <Navbar />
      <main className="text-page">
        <h1>The Process</h1>
        <p className="intro">Design, in our practice, is a rhythmic movement between the abstract and the physical: a collaborative exploration of how we interact with our environment. As a multidisciplinary studio, we approach every project, regardless of scale or typology, as an opportunity to find a meaningful conversation between the site, the material, and the human experience. Our process is an evolving journey of shared authorship, where the final form is a result of patience, iteration, and the joy of making.</p>
        {PROCESS_STEPS.map(s => (
          <section className="text-step" key={s.num}>
            <h2>{s.num}. {s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <p className="disclaimer"><strong>Note:</strong> While the methodology outlined above represents our studio's comprehensive design journey, every engagement remains tailored, as specific deliverables and project stages are strictly defined by the individual scope of work and contractual agreements established at the commencement of each project.</p>
      </main>
    </>
  );
}
