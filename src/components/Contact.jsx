import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {

  return (

    <section id="contact" className="py-28 px-6 bg-black text-white">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Let's Build Your Dream Space
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            We would love to hear about your project. Get in touch with us to
            discuss your vision and bring it to life with HASMiT & ARCHiTECTS.
          </p>

        </div>

        {/* Grid Layout */}

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Google Map */}

          <div className="w-full h-[420px] rounded-xl overflow-hidden border border-white/10">

            <iframe
              src="https://maps.google.com/maps?q=HASMiT%20and%20ARCHiTECTS&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            ></iframe>

          </div>

          {/* Contact Form */}

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">

            {/* Contact Details */}

            <div className="mb-6 space-y-3">

              <p className="flex items-center gap-3 text-gray-300">
                <FaPhoneAlt className="text-white" />
                7567363999
              </p>

              <p className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-white" />
                hasmitandarchitects@gmail.com
              </p>

            </div>

            {/* Form */}

            <form className="flex flex-col gap-5">

              <input
                placeholder="Your Name"
                className="p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-white"
              />

              <input
                placeholder="Email Address"
                className="p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-white"
              />

              <textarea
                placeholder="Tell us about your project"
                rows="4"
                className="p-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-white"
              />

              <button
                className="bg-white text-black py-3 rounded-md hover:scale-105 transition font-medium"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>

  );

};

export default Contact;