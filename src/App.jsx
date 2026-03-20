import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetail";
import Home from "./pages/Home";
import ProcessDetails from "./components/ProcessDetails";
import ContactPage from "./pages/contact-us";
import Layout from "./pages/layout";

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
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;