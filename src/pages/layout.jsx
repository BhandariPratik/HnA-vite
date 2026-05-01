import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen bg-white text-stone-900">
            <Navbar className="bg-[#f8f3ee] border-b border-[#eadfd7]" />
            <main className="pt-[30px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
