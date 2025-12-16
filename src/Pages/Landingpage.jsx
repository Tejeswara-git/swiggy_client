import React from "react";
import Navbar from "../Components/Navbar";
import Itemsdiplay from "../Components/Itemsdiplay";
import Vendorsdisplay from "../Components/Vendorsdisplay";
import Firmsdisplay from "../Components/Firmsdisplay";

const Landingpage = () => {
  return (
    <div>
      <Navbar />
      <Itemsdiplay />
      <Vendorsdisplay />
      <Firmsdisplay />
    </div>
  );
};

export default Landingpage;
