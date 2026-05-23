import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Crosshair from "./components/Crosshair";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import People from "./pages/People";
import CategoryPage from "./pages/CategoryPage";
import ProjectDetail from "./pages/ProjectDetail";
import InquiryForm from "./pages/InquiryForm";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const containerRef = useRef(null);
  return (
    <>
      {/* <Crosshair /> */}
      {/* <Crosshair color="var(--title-tone)" targeted={true} /> */}
      <Crosshair containerRef={containerRef} color='#d1682c'
        color="#d1682c"
        targeted={false}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inquiry" element={<InquiryForm />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/process" element={<Process />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:category" element={<CategoryPage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/people" element={<People />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
