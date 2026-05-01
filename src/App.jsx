import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetail";
import Home from "./pages/Home";
import ProcessDetails from "./components/ProcessDetails";
import ContactPage from "./pages/contact-us";
import Layout from "./pages/layout";
import Project from "./pages/project";
import ProjectDetail from "./pages/projectDetails";
import ProjectType from "./pages/projectType";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/process/:id" element={<ProcessDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/allproject" element={<ProjectType />} />
          <Route path="/project" element={<Project />} />
          <Route path="/projects/:projectType" element={<Project />} />
          <Route path="/projectDetails/:id" element={<ProjectDetail />} />
          {/* <Route path="/allproject" element={<ProjectType />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
