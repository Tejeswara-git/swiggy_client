import React, { useState } from "react";
import { Itemdata } from "../Items";

const Itemsdiplay = () => {
  const [items, setItems] = useState(Itemdata);
  return (
    <div className="item-section">
      {items.map((item, index) => (
        <div key={index} className="item-gallery">
          <img src={item.item_img} width={200} height={200} alt="image item" />
        </div>
      ))}
    </div>
  );
};

export default Itemsdiplay;
