import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/navbar/Navbar.tsx";
import Home from "./pages/Home.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <section>
      <Navbar />
      <Home />
    </section>
  </StrictMode>,
);
