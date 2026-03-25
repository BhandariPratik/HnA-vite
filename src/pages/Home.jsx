import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {

    return (
        <>
            <Navbar />
            <Hero />
            <Process />
            <Projects />
            <Team />
            <About />
            <Contact />
        </>
    );
};

export default Home;