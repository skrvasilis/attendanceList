import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Students from "./Students";
import "./App.scss";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Navigation />

      <Students />
      <Footer/>
    </div>
  );
}

export default App;
