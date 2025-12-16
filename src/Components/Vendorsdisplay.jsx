import React, { useEffect, useState } from "react";
import { API_PATH } from "../data";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";

const Vendorsdisplay = () => {
  const [vendors, setVendors] = useState([]); // Holds the list of vendors
  const [loading, setLoading] = useState(true); // To show a loading indicator
  const [error, setError] = useState(null); // To hold any fetch errors
  const [scrollPosition, setScrollPosition] = useState(0); // To track scroll position

  const handlescrollLeft = (direction) => {
    const gallery = document.querySelector(".vendor-section");
    if (direction === "right") {
      gallery.scroll({
        left: gallery.scrollLeft + 500,
        behavior: "smooth",
      });
    } else {
      gallery.scroll({
        left: gallery.scrollLeft - 500,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const vendorHandler = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_PATH}/vendor/getallvendors`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log("API Response Data:", data);

        setVendors(data.vendors || data || []);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to fetch vendors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    vendorHandler();
  }, []);

  if (loading) {
    return (
      <div className="loading-section">
        Loading vendors...
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="vendor-title">
        <h2>Top Firms in Hyderabad</h2>
      </div>
      <div className="scroll-btn">
        <button onClick={() => handlescrollLeft("left")}>
          <FaArrowLeft />
        </button>
        <button onClick={() => handlescrollLeft("right")}>
          <FaArrowRight />
        </button>
      </div>
      <div
        className="vendor-section"
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {vendors.map((vendor) =>
          vendor.firm?.map((firmItem) => {
            const imageUrl = `${API_PATH}/${firmItem.image.replace(
              /\\/g,
              "/"
            )}`;

            console.log(`Image URL for ${firmItem.FirmName}:`, imageUrl);

            return (
              <Link
                to={`/products/${firmItem._id}/${firmItem.FirmName}`}
                key={firmItem._id}
                className="firm-link"
              >
                <div key={firmItem._id} className="vendor-box">
                  {firmItem.image ? (
                    <img
                      className="vendor-image"
                      src={imageUrl}
                      alt={`${firmItem.FirmName} logo`}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h4>{firmItem.FirmName}</h4>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Vendorsdisplay;
