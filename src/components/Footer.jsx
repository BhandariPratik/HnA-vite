import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12 px-6">

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Side */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold tracking-[3px] mb-2">
            HASMiT & ARCHiTECTS
          </h3>

          <p className="text-gray-400 text-sm">
            Follow us on social media for design inspiration and project updates
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">

          <a
            href="https://www.instagram.com/hasmit.and.architects"
            target="_blank"
            rel="noreferrer"
            className="group text-gray-400 hover:text-pink-500 transition"
          >
            <FaInstagram className="text-2xl group-hover:scale-110 transition" />
          </a>

          <a
            href="https://www.facebook.com/hasmit.and.architects"
            target="_blank"
            rel="noreferrer"
            className="group text-gray-400 hover:text-blue-500 transition"
          >
            <FaFacebookF className="text-2xl group-hover:scale-110 transition" />
          </a>

          <a
            href="#"
            className="group text-gray-400 hover:text-red-500 transition"
            aria-disabled
          >
            <FaYoutube className="text-2xl group-hover:scale-110 transition" />
          </a>

          <a
          aria-disabled
            href="#"
            className="group text-gray-400 hover:text-green-500 transition"
          >
            <FaWhatsapp className="text-2xl group-hover:scale-110 transition" />
          </a>

        </div>

      </div>

      {/* Bottom Copyright */}

      <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-500 text-sm">

        © {new Date().getFullYear()} HASMiT & ARCHiTECTS. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;