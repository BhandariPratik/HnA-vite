const steps = [
    { title: "Concept Design", desc: "Understanding client vision" },
    { title: "Planning", desc: "Strategic design development" },
    { title: "Execution", desc: "Building with precision" },
    { title: "Delivery", desc: "Creating impactful spaces" },
];

const Process = () => {

    return (

        <section id="process" className="py-24 bg-black px-6">

            <div className="max-w-7xl mx-auto text-center">

                <h2 className="text-4xl font-semibold mb-12">
                    Our Process
                </h2>

                <div className="grid md:grid-cols-4 gap-8">

                    {steps.map((step, i) => (

                        <div
                            key={i}
                            className="border border-gray-800 p-8 rounded-lg hover:border-white transition"
                        >

                            <h3 className="text-xl mb-3">
                                {step.title}
                            </h3>

                            <p className="text-gray-400">
                                {step.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
};

export default Process;