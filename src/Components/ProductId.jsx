import React, { useEffect, useState } from "react";
import { API_PATH } from "../data";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ProductId = () => {
  const { id, firmname } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductById = async () => {
    try {
      const response = await fetch(`${API_PATH}/product/getproduct/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products || []);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="product-section">
        <h2>Restaurant Name: {firmname}</h2>

        {products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="product-card">
              <h2>{item.ProductName}</h2>
              <p>{item.description}</p>
              <p>Price: ${item.Price}</p>
              <div className="image-card">
                <img
                  src={`${API_PATH}/uploads/${item.image}`}
                  alt={item.ProductName}
                  width={200}
                  height={200}
                />
                <button className="product-add">ADD</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductId;
