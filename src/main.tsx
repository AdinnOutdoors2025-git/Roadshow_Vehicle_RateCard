import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App";
import RoadshowQO from "./RoadshowQO";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/roadshowQO" element={<RoadshowQO />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);