import { useParams, useNavigate } from "react-router-dom";

const ProcessDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const data = {

    consultation: {
      title: "Initial Collaboration & Site Visit",
      stage: "Stage 1",
      img: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0",
      points: [
        "We'll meet or virtually meet to discuss your project vision, style preferences, budget and timeline.",
        "An architect/designer will visit your site to understand the space and gather inspiration."
      ]
    },

    design: {
      title: "Concept Design Stage",
      stage: "Stage 2",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      points: [
        "We'll present preliminary design concepts and furniture layouts.",
        "A conceptual design presentation will showcase the overall design approach."
      ]
    },

    drawings: {
      title: "Detailed Drawings",
      stage: "Stage 3",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0",
      points: [
        "Produce comprehensive technical drawings.",
        "Specifications guide construction and ensure accuracy."
      ]
    },

    execution: {
      title: "Construction & Project Execution",
      stage: "Stage 4",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      points: [
        "Periodic site visits ensure smooth progress.",
        "Coordination with contractors and consultants."
      ]
    }

  };

  const process = data[id];

  if (!process) return <div>Process not found</div>;

  return (

    <section className="bg-black text-white min-h-screen py-28 px-6">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/#process")}
          className="mb-10 text-gray-400 hover:text-white"
        >
          ← Back to Process
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h1 className="text-4xl font-semibold mb-4">
              {process.title}
            </h1>

            <p className="text-gray-400 mb-6">
              {process.stage}
            </p>

            <ul className="space-y-4">

              {process.points.map((p, i) => (

                <li key={i} className="flex gap-3 text-gray-300">

                  <span className="text-blue-400">◆</span>

                  {p}

                </li>

              ))}

            </ul>

          </div>

          <div>

            <img
              src={process.img}
              className="rounded-xl shadow-lg"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProcessDetails;