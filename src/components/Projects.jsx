import { projects } from "../projectdata";
import { Link } from "react-router-dom";

const Projects = () => {

  return (

    <section id="projects" className="py-28 px-6 bg-black text-white">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl text-center mb-16 font-semibold">
          Our Projects
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {projects.map((p) => (

            <Link
              to={`/project/${p.id}`}
              key={p.id}
              className="group relative overflow-hidden rounded-xl"
            >

              <img
                src={p.img}
                className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition">

                <h3 className="text-lg font-semibold">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-300">
                  {p.location}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );
};

export default Projects;