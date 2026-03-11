import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetail";
import Home from "./pages/Home"
import ProcessDetails from "./components/ProcessDetails";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/project/:id"
          element={<ProjectDetails />}
        />
        <Route path="/process/:id" element={<ProcessDetails />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;