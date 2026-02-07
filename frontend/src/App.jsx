import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Creat from "./Pages/Creat";
import NoteDetail from "./Pages/NoteDetail";
import toast from "react-hot-toast";

function App() {
 
  const handleClick = async () => {
    await toast.success("Settings saved successfully!");
  };

  return (
    <div data-theme="cupcake">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Creat />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
}

export default App;
