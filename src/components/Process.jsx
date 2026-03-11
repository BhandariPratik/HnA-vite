import { Link } from "react-router-dom";

const steps = [
    {
        id: "consultation",
        title: "Initial Consultation",
        desc: "Understand client needs, preferences and project goals.",
        img: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "design",
        title: "Design Development",
        desc: "Concept design, moodboards and 3D visualization.",
        img: "https://images.unsplash.com/photo-1600585153490-76fb20a32601"
    },
    {
        id: "drawings",
        title: "Detailed Drawings",
        desc: "Technical drawings and specifications for construction.",
        img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
    },
    {
        id: "execution",
        title: "Project Execution",
        desc: "Construction supervision and project delivery.",
        img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd"
    }
];

const Process = () => {
    return (
        <section id="process" className="py-28 bg-black text-white px-6">

            <div className="max-w-7xl mx-auto text-center">

                <h2 className="text-4xl md:text-5xl font-semibold mb-16">
                    Our Design Process
                </h2>

                <div className="grid md:grid-cols-4 gap-8">

                    {steps.map((step, i) => (

                        <Link
                            to={`/process/${step.id}`}
                            key={i}
                            className="group rounded-xl overflow-hidden border border-white/10 hover:border-white transition"
                        >

                            <img
                                src={step.img}
                                className="h-40 w-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition duration-700"
                            />

                            <div className="p-6">

                                <div className="text-sm text-gray-400 mb-2">
                                    STEP {i + 1}
                                </div>

                                <h3 className="text-lg font-semibold mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    {step.desc}
                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Process;