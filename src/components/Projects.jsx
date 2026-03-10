const projects = [
    { img: "https://images.unsplash.com/photo-1494526585095-c41746248156" },
    { img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" },
    { img: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353" },
    { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
];

const Projects = () => {

    return (

        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">

            <h2 className="text-4xl text-center mb-16">
                Our Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {projects.map((p, i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-lg group"
                    >

                        <img
                            src={p.img}
                            className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
                        />

                    </div>
                ))}

            </div>

        </section>

    );
};

export default Projects;