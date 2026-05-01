

import { project_JSON } from "../projectdata";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Two images per project:
// bwImage  → your actual artistic B&W sketch (shown by default)
// colorImage → the rendered color version (shown on hover)


const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => navigate(`/projectDetails/${project.id}`)}
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>

        {/* COLOR image — sits on top, hidden by default, fades in on hover */}
        <img
          src={project.colorImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
          loading="lazy"
        />

        {/* B&W image — always visible underneath */}
        <img
          src={project.bwImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />

        {/* Arrow CTA — appears on hover */}
        <div
          className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-in-out pointer-events-none"
          style={{ backgroundColor: "#d1682c", borderRadius: "50%" }}
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Project Name */}
      <div className="pt-2">
        <p
          className="font-semibold tracking-wide uppercase text-center"
          style={{
            color: "#d1682c",
            fontSize: "clamp(0.80rem, 1vw, 1rem)",
            letterSpacing: "0.08em",
          }}
        >
          {project.name}
        </p>
      </div>
    </div>
  );
};

const Project = () => {
  const { projectType } = useParams();
  const filteredProjects = projectType
    ? project_JSON.filter((project) => project.projectTypeSlug === projectType)
    : project_JSON;
  const activeTypeLabel = filteredProjects[0]?.projectType || projectType?.replace(/-/g, " ");

  return (
    <section className="w-full my-4 bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 pb-4 sm:pb-6">
      {projectType && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d1682c]/60">
              Project Type
            </p>
            <h1 className="mt-1 text-2xl font-semibold capitalize tracking-wide text-[#d1682c]">
              {activeTypeLabel}
            </h1>
          </div>
          <Link
            to="/allproject"
            className="inline-flex items-center justify-center border border-[#d1682c]/30 px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#d1682c] transition hover:border-[#d1682c] hover:bg-[#d1682c] hover:text-white"
          >
            All Projects
          </Link>
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-15 gap-y-4 sm:gap-x-15 sm:gap-y-4">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 sm:gap-x-10 sm:gap-y-10"> */}
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d1682c]/70">
            No projects found.
          </p>
          <Link
            to="/allproject"
            className="mt-5 inline-flex items-center justify-center border border-[#d1682c]/30 px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#d1682c] transition hover:border-[#d1682c] hover:bg-[#d1682c] hover:text-white"
          >
            All Projects
          </Link>
        </div>
      )}
    </section>
  );
};

export default Project;
