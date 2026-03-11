import { useState } from "react";

const Navbar = () => {

    const [open, setOpen] = useState(false);

    return (

        <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">

            <div className="w-full flex justify-between items-center px-3 md:px-10 py-4">

                {/* Logo */}
                <h1 className="text-lg md:text-2xl font-semibold tracking-[3px] text-white">
                    H&A STUDIO
                </h1>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8 text-lg font-bold text-white">

                    <a href="#process" className="hover:text-gray-300 transition">
                        Process
                    </a>

                    <a href="#projects" className="hover:text-gray-300 transition">
                        Projects
                    </a>

                    <a href="#team" className="hover:text-gray-300 transition">
                        Team
                    </a>

                    <a href="#about" className="hover:text-gray-300 transition">
                        Practice
                    </a>

                    <a href="#contact" className="hover:text-gray-300 transition">
                        Contact
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white text-2xl"
                >
                    ☰
                </button>

            </div>

            {/* Mobile Menu */}
            {open && (

                <div className="md:hidden bg-black/95 backdrop-blur-md flex flex-col gap-6 px-6 py-6 text-white text-sm">
                    <a href="#process">Process</a>
                     <a href="#projects">Projects</a>
                    <a href="#team">Team</a>
                    <a href="#about">Practice</a>
                    <a href="#contact">Contact</a>
                </div>

            )}

        </header>

    );
};

export default Navbar;