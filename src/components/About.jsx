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

                    <p className="text-gray-400 leading-relaxed mb-6">

                        H&A Studio is a forward-thinking architecture firm
                        focused on modern design, sustainability,
                        and functional spaces that inspire people.

                    </p>

                    <p className="text-gray-400">

                        Our team combines creativity with technical expertise
                        to create timeless architecture.

                    </p>

                </div>

            </div>

        </section>

    );
};

export default About;