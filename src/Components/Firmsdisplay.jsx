import React, { useEffect, useState } from "react";
import { API_PATH } from "../data";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";

const Vendorsdisplay = () => {
  const [vendors, setVendors] = useState([]); // Holds the list of vendors
  const [loading, setLoading] = useState(true); // To show a loading indicator
  const [error, setError] = useState(null); // To hold any fetch errors
  const [regionFilter, setRegionFilter] = useState("All"); //

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

        // Ensure data.vendors is an array, or data itself is an array
        const fetchedVendors = Array.isArray(data.vendors)
          ? data.vendors
          : Array.isArray(data)
          ? data
          : [];
        setVendors(fetchedVendors);
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

  // Flatten the vendors' firm arrays into a single array of firms to display
  const firmsToDisplay = vendors.flatMap((vendor) =>
    Array.isArray(vendor.firm) && vendor.firm.length > 0 ? vendor.firm : []
  );

  if (firmsToDisplay.length === 0) {
    return <div>No firms available to display.</div>;
  }

  // Filter firms based on region
  const filteredFirms =
    regionFilter === "All"
      ? firmsToDisplay
      : firmsToDisplay.filter((firm) => firm.region.includes(regionFilter));

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "30px" }}>
        All Firms in Hyderabad
      </h3>
      <div className="region-filters">
        <button
          className={`region-button ${
            regionFilter === "All" ? "active" : ""
          }`}
          onClick={() => setRegionFilter("All")}
        >
          All
        </button>
        <button
          className={`region-button ${
            regionFilter === "north-indian" ? "active" : ""
          }`}
          onClick={() => setRegionFilter("north-indian")}
        >
          North-Indian
        </button>
        <button
          className={`region-button ${
            regionFilter === "south-indian" ? "active" : ""
          }`}
          onClick={() => setRegionFilter("south-indian")}
        >
          South-Indian
        </button>
        <button
          className={`region-button ${
            regionFilter === "chinese" ? "active" : ""
          }`}
          onClick={() => setRegionFilter("chinese")}
        >
          Chinese
        </button>
        <button
          className={`region-button ${
            regionFilter === "bakery" ? "active" : ""
          }`}
          onClick={() => setRegionFilter("bakery")}
        >
          Bakery
        </button>
      </div>
      <div className="firm-section">
        {filteredFirms.map((firmItem) => {
          // Crucial check: Ensure _id and FirmName exist before creating the link
          if (!firmItem._id || !firmItem.FirmName) {
            console.warn(
              "Skipping firm item due to missing _id or FirmName:",
              firmItem
            );
            return null; // Don't render this firm card if essential data is missing
          }

          const imageUrl = `${API_PATH}/${firmItem.image.replace(/\\/g, "/")}`;

          console.log(`Image URL for ${firmItem.FirmName}:`, imageUrl);
          return (
            <div key={firmItem._id} className="firm-card">
              <Link
                to={`/products/${firmItem._id}/${firmItem.FirmName}`}
                className="firm-link"
              >
                {firmItem.image && imageUrl ? ( // Check both firmItem.image and constructed imageUrl
                  <img
                    className="firm-img"
                    src={imageUrl}
                    alt={`${firmItem.FirmName} logo`}
                    width={200}
                    height={200}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div className="firm-offer">{firmItem.offer}% OFFER</div>
                <div className="firm-details">
                  <div className="firm-name">
                    <h3>{firmItem.FirmName}</h3>
                  </div>
                  <div className="firm-area">
                    <p>Area:{firmItem.area}</p>
                  </div>
                  <div className="firm-region">
                    <p>{firmItem.region?.[0] || "N/A"}</p>{" "}
                    {/* Defensive access for region */}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Vendorsdisplay;
