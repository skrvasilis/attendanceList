import React from "react";
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
