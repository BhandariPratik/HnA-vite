import Navbar from "../components/Navbar";
import "./TextPage.css";

export default function Practice() {
  return (
    <>
      <Navbar />
      <main className="text-page">
        <h1>Practice</h1>
        <p className="intro">
          <span style={{ color: "var(--title-tone)", fontWeight: 500 }}>HASMiT &amp; ARCHiTECTS</span>{" "}
          began with a simple belief: ”Good design shouldn't depend on a pincode.”
        </p>

        <section className="text-step">
          <p>Founded in Umbergaon and connected to Mumbai, we work across cities and regions, drawing on diverse perspectives while remaining grounded in the places we design for.</p>
        </section>

        <section className="text-step">
          <p>We enjoy solving real problems: the awkward corner nobody knows what to do with, the house that needs to evolve with a growing family, the workspace that could work a little harder, the forgotten outdoor space waiting to become everyone's favourite place to gather, or the piece of furniture that quietly transforms how a room is used and experienced.</p>
        </section>

        <section className="text-step">
          <p>Every project begins with understanding people before plans. We listen, question, sketch, rethink, and refine, occasionally spending far too much time debating a detail that nobody else will notice, but we'll know it's there.</p>
        </section>


        <section className="text-step">
          <p>We're less interested in creating something that demands attention and more interested in creating design that earns its place in everyday life: a chair that invites you to stay a little longer, a home that feels larger than it is, a workplace that encourages conversation, or a courtyard that naturally becomes the heart of a project.</p>
        </section>

        <section className="text-step">
          <p>The result is work that feels thoughtful rather than excessive, confident rather than loud, and rooted rather than generic.</p>
        </section>


        <section className="text-step">
          <p>Because good design isn't about being noticed immediately. It's about feeling right for years.</p>
        </section>

        <section className="text-step">
          <p>Great spaces, as well as the objects within them, don't need to shout to be remembered.</p>
        </section>

      </main>
    </>
  );
}
