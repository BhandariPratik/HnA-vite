// import React from "react";
// import { useNavigate } from "react-router-dom";

// // ✅ Single image per project — CSS handles B&W vs color
// // Replace image paths with your actual filenames stored in /public folder
// const projects = [
//   {
//     id: 1,
//     name: "Ciana 2601",
//     category: "Architectural Design",
//     image: "/project1_colour.jpeg",
//   },
//   {
//     id: 2,
//     name: "Ekta Residence",
//     category: "Architectural Design",
//     image: "/project1_colour.jpeg",
//   },
//   {
//     id: 3,
//     name: "Aarvi",
//     category: "Architectural Design",
//     image: "/project1_colour.jpeg",
//   },
//   {
//     id: 4,
//     name: "Classic Villa",
//     category: "Architectural Design",
//     image: "/project1_colour.jpeg",
//   },
//   {
//     id: 5,
//     name: "Meridian",
//     category: "Architectural Design",
//     image: "/project1_colour.jpeg",
//   },
//   {
//     id: 6,
//     name: "Elysian Beauty",
//     category: "Architectural Design",
//     image: "/project1_colour.jpeg",
//   },
// ];

// const ProjectCard = ({ project }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="group relative cursor-pointer overflow-hidden"
//       onClick={() => navigate(`/project/${project.id}`)}
//       style={{ borderRadius: "2px" }}
//     >
//       {/* Image Container */}
//       <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
//         {/*
//           Single image with CSS grayscale filter.
//           - Default: grayscale(100%) = black & white
//           - Hover: grayscale(0%) = full color
//           Tailwind doesn't animate filters smoothly, so we use inline style + onMouse events.
//         */}
//         <img
//           src={project.image}
//           alt={project.name}
//           className="w-full h-full object-cover"
//           style={{
//             filter: "grayscale(100%)",
//             transition: "filter 0.7s ease-in-out",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
//           onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
//           loading="lazy"
//         />

//         {/* Subtle dark overlay on hover */}
//         <div
//           className="absolute inset-0 pointer-events-none transition-all duration-500 ease-in-out"
//           style={{ background: "rgba(0,0,0,0)" }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.08)")}
//           onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
//         />

//         {/* Arrow indicator — appears on card hover via group-hover */}
//         <div
//           className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none"
//           style={{ backgroundColor: "#d1682c", borderRadius: "50%" }}
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="white"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="7" y1="17" x2="17" y2="7" />
//             <polyline points="7 7 17 7 17 17" />
//           </svg>
//         </div>
//       </div>

//       {/* Project Name Label */}
//       <div className="pt-3 pb-1">
//         <p
//           className="font-semibold tracking-wide uppercase text-center"
//           style={{
//             color: "#d1682c",
//             fontFamily: "'Cormorant Garamond', Georgia, serif",
//             fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
//             letterSpacing: "0.08em",
//           }}
//         >
//           {project.name}
//         </p>
//       </div>
//     </div>
//   );
// };

// const Project = () => {
//   return (
//     <section className="w-full min-h-screen mt-10 bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14">
//       {/* Section Header */}
//       {/* <div className="my-8 sm:mb-10">
//         <p
//           className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1"
//           style={{ color: "#d1682c", fontFamily: "Georgia, serif" }}
//         >
//           Architectural Design
//         </p>
//         <div className="w-10 h-px mt-2" style={{ backgroundColor: "#d1682c" }} />
//       </div> */}

//       {/* Responsive 3-column grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
//         {projects.map((project) => (
//           <ProjectCard key={project.id} project={project} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Project;

import { project_JSON } from "../projectdata";
import React from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="pt-3 pb-1">
        <p
          className="font-semibold tracking-wide uppercase text-center"
          style={{
            color: "#d1682c",
            // fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
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
  return (
    <section className="w-full min-h-screen my-5 bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14">

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
        {project_JSON.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Project;

