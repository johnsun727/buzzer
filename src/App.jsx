import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Play from "./pages/Play.jsx";
import Host from "./pages/Host.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/play" replace />} />
        <Route path="/play" element={<Play />} />
        <Route path="/host" element={<Host />} />
      </Routes>
    </BrowserRouter>
  );
}
