import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ className = "" }) => {

    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    return (

        <header className={`fixed h-fit top-0 left-0 w-full z-50 ${className}`}>

            <div className="relative w-full flex justify-between items-center px-3 md:px-8 lg:px-10 py-4">
                <Link to={"/"}>
                    <h1 className="text-lg md:text-xl font-semibold tracking-[3px] text-[#2f2925]">
                        HASMIT & ARCHITECHS
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-xs font-semibold uppercase tracking-wide text-[#d1682c]">

                    <a href="#process" className="hover:text-[#f0a06d] transition">
                        Process
                    </a>


                    <Link to={'/allproject'} className="hover:text-[#f0a06d] transition">
                        Projects
                    </Link>

                    <a href="#team" className="hover:text-[#f0a06d] transition">
                        Team
                    </a>

                    <a href="#about" className="hover:text-[#f0a06d] transition">
                        Practice
                    </a>
                </nav>

                <div className="hidden lg:block">
                    <Link
                        to="/contact"
                        className="inline-flex min-w-[132px] items-center justify-center border border-[#d7d0c9] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#2f2925] shadow-sm transition hover:border-[#d1682c] hover:text-[#d1682c]"
                    >
                        LET'S TALK
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-[#2f2925] text-2xl"
                >
                    ☰
                </button>
            </div>
            {/* Mobile Menu */}
            {open && (

                <div className="lg:hidden bg-[#f8f3ee] border-t border-[#eadfd7] flex flex-col gap-6 px-6 py-6 text-[#d1682c] text-sm">
                    <a href="#process" onClick={closeMenu} className="hover:text-[#f0a06d] transition">Process</a>
                    <Link to={'/allproject'} onClick={closeMenu} className="hover:text-[#f0a06d] transition">
                        Projects
                    </Link>
                    <a href="#team" onClick={closeMenu} className="hover:text-[#f0a06d] transition">Team</a>
                    <a href="#about" onClick={closeMenu} className="hover:text-[#f0a06d] transition">Practice</a>
                    <Link to="/contact" onClick={closeMenu} className="hover:text-[#f0a06d] transition">
                        Let's Talk
                    </Link>
                </div>

            )}

        </header>

    );
};

export default Navbar;