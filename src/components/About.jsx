const About = () => {

    return (

        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">

            <div className="grid md:grid-cols-2 gap-12 items-center">

                <img
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                    className="rounded-xl"
                />

                <div>

                    <h2 className="text-4xl font-semibold mb-6">
                        About H&A Studio
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        HASMiT & ARCHiTECTS is a forward thinking multidisciplinary architectural firm based in Umbergaon, Gujarat, operating remotely with a globally connected team across borders. Specializing in architecture, interior design, and landscape design, we deliver innovative, sustainable solutions that seamlessly blend form and function, tailored to our clients' unique visions.
                    </p>


                </div>

            </div>

        </section>

    );
};

export default About;