import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/navbar/Navbar.tsx";
// import Content from "./pages/content/Content";
import Home from "./pages/Home";
import Actor from "./pages/actors/ActorDetails.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <section>
      <Navbar />
      <Home />
      {/* <Content isMovie={true} id={503} /> */}
      {/* <Actor id={503} /> */}
    </section>
  // </StrictMode>,
);
