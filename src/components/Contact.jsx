const Contact = () => {

    return (

        <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">

            <h2 className="text-4xl mb-10">
                Contact Us
            </h2>

            <form className="flex flex-col gap-5">

                <input
                    placeholder="Your Name"
                    className="p-3 bg-black border border-gray-700"
                />

                <input
                    placeholder="Email"
                    className="p-3 bg-black border border-gray-700"
                />

                <textarea
                    placeholder="Message"
                    rows="4"
                    className="p-3 bg-black border border-gray-700"
                />

                <button className="bg-white text-black py-3 hover:scale-105 transition">

                    Send Message

                </button>

            </form>

        </section>

    );
};

export default Contact;