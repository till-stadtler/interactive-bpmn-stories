import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Stories } from "./components/bpmn-stories/Stories";
import { BPMNStoriesHome } from "./components/bpmn-stories/BPMNStoriesHome";
import { Layout } from "./Layout";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BPMNStoriesHome />} />
          <Route path=":storyId" element={<Stories />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
