import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

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
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm w-full">

            <p className="text-gray-300 text-sm sm:text-base max-w-sm">
              Have a project in mind? Let’s discuss your requirements and bring your vision to life.
            </p>

            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-amber-500 text-white font-medium text-sm sm:text-base shadow-md transition-all duration-200 hover:bg-amber-600 active:scale-95"
            >
              Fill Inquiry Form
            </Link>

          </div>
        </div>

      </div>

    </section>

  );

};

export default Contact;