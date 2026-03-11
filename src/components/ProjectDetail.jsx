import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../projectdata";

const ProjectDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const project = projects.find((p) => p.id === id);

    if (!project) return <div>Project not found</div>;

    return (

        <section className="py-28 px-6 bg-black text-white min-h-screen">

            <div className="max-w-5xl mx-auto">

                {/* Back Button */}

                <button
                    onClick={() => navigate("/#projects")}
                    className="mb-10 flex items-center gap-2 text-gray-400 hover:text-white transition text-lg"
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-semibold mb-6">
                    {project.name}
                </h1>

                <img
                    src={project.img}
                    className="w-full h-[450px] object-cover rounded-xl mb-10"
                    alt={project.name}
                />

                <div className="grid md:grid-cols-2 gap-8 mb-10">

                    <div>
                        <p className="text-gray-400">Location</p>
                        <p>{project.location}</p>
                    </div>

                    <div>
                        <p className="text-gray-400">Year</p>
                        <p>2024</p>
                    </div>

                </div>

                <p className="text-gray-300 leading-relaxed">
                    This apartment showcases a chic design that creates a space into a warm and inviting sanctuary.
                    By creating a seamless open-concept environment, the original layout was reimagined by connecting the kitchen to the living area.
<br/><br/>
                    The kitchen is a standout feature, with deep teal cabinets adorned with wicker-paneled shutters, adding an intriguing textural element.
<br/><br/>
                    The living space is elevated by an eclectic mix of traditional and modern furniture, abstract art, and lush greenery, creating a cozy yet sophisticated ambiance.
<br/><br/>
                    Natural materials, vibrant accents, strategic lighting, curved lines, and neutral walls blend together to create a unique visual narrative that enhances the space's functionality and aesthetic appeal.

                </p>

            </div>

        </section>

    );
};

export default ProjectDetails;