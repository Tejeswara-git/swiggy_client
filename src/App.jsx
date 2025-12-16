import React from "react";
import "./App.css";
import Landingpage from "./Pages/Landingpage";
import Error from "./Components/Error";
import { Route, Routes } from "react-router-dom";
import ProductId from "./Components/ProductId";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/products/:id/:firmname" element={<ProductId />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
