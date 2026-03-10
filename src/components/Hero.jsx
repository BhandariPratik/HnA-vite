const Hero = () => {

    return (

        <section
            className="h-screen flex items-center justify-center text-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1487958449943-2429e8be8625)",
            }}
        >

            <div className="bg-black/60 p-10 rounded-xl">

                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">

                    Designing Spaces
                    That Define The Future

                </h1>

                <p className="text-gray-300 max-w-xl mx-auto mb-6">

                    Modern architecture studio creating innovative spaces,
                    luxury homes, and iconic buildings.

                </p>

                <button className="bg-white text-black px-6 py-3 rounded hover:scale-105 transition">

                    View Projects

                </button>

            </div>

        </section>

    );
};

export default Hero;