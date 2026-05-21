import React, { useMemo, useState } from "react";
import "./App.css";
import vehicles from "./vehicles.json";

const formatPrice = (price) => `Rs. ${Number(price).toLocaleString("en-IN")}`;

function VehicleCard({ vehicle }) {
  const [activeImage, setActiveImage] = useState(vehicle.images?.[0]);
  const hasLocationCharges = vehicle.locationCharges && vehicle.locationCharges.length > 0;

  return (
    <article className="vehicleCard">
      <section className="mediaPanel">
        <div className="mediaTop">
          <span>{vehicle.category}</span>
          <small>{vehicle.type}</small>
        </div>

        <div className="mainImageBox">
          <img src={activeImage} alt={vehicle.name} />
        </div>

        <div className="thumbStrip">
          {vehicle.images.map((image, index) => (
            <button
              key={`${vehicle.id}-${image}`}
              type="button"
              className={activeImage === image ? "active" : ""}
              onClick={() => setActiveImage(image)}
              aria-label={`Show ${vehicle.name} image ${index + 1}`}
            >
              <img src={image} alt={`${vehicle.name} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      </section>

      <section className="detailsPanel">
        <div className="titleRow">
          <div>
            <h2>{vehicle.name}</h2>
            <p>{vehicle.shortDescription}</p>
          </div>

          <div className="priceBox">
            <span>Per Day</span>
            <strong>{formatPrice(vehicle.pricePerDay)}</strong>
          </div>
        </div>

        <div className="highlightBar">{vehicle.highlight}</div>

        <div className="specGrid">
          {vehicle.quickSpecs.map((spec) => (
            <div className="specCard" key={spec.label}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </div>
          ))}
        </div>

        <div className="infoGrid">
          <div className="infoCard">
            <h3>Included in per day cost</h3>
            <ul>
              {vehicle.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="infoCard redTint">
            <h3>{vehicle.brandingStatus}</h3>
            <ul>
              {vehicle.addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {hasLocationCharges && (
          <details className="locationDetails">
            <summary>View location-wise charges</summary>
            <div className="locationTableWrap">
              <table>
                <thead>
                  <tr>
                    <th>Charge</th>
                    <th>Chennai</th>
                    <th>ROTN</th>
                    <th>Kerala</th>
                    <th>Other States</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicle.locationCharges.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.chennai}</td>
                      <td>{row.rotn}</td>
                      <td>{row.kerala}</td>
                      <td>{row.otherStates}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}

        {vehicle.packageTotal && (
          <div className="packageBox">
            <span>Package</span>
            <strong>{vehicle.packageTotal}</strong>
          </div>
        )}
      </section>
    </article>
  );
}

export default function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(vehicles.map((vehicle) => vehicle.category)))],
    []
  );

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesCategory = category === "All" || vehicle.category === category;
      const keyword = `${vehicle.name} ${vehicle.type} ${vehicle.category}`.toLowerCase();
      const matchesSearch = keyword.includes(query.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const startingPrice = Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay));

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="brandGroup">
            <div className="brandLogo">A</div>
            <div>
              <strong>Adinn Roadshows</strong>
              <span>Vehicle Rate Card</span>
            </div>
          </div>
          <div className="navPill">JSON Managed</div>
        </nav>

        <div className="heroContent">
          <div>
            <span className="eyebrow">Premium Outdoor Advertising Vehicles</span>
            <h1>Roadshow rate card with images, pricing and specifications.</h1>
            <p>
              Browse Flex branding, LED and hybrid roadshow vehicles with per-day cost,
              km limits, minimum days, add-ons and location-wise charges.
            </p>
          </div>

          <div className="heroStats">
            <div>
              <span>Starting From</span>
              <strong>{formatPrice(startingPrice)}</strong>
              <small>per day</small>
            </div>
            <div>
              <span>Total Vehicles</span>
              <strong>{vehicles.length}</strong>
              <small>variants</small>
            </div>
          </div>
        </div>
      </header>

      <main className="mainWrap">
        <section className="filterCard">
          <div>
            <span className="sectionKicker">Choose Vehicle</span>
            <h2>Available rate cards</h2>
          </div>

          <div className="filterControls">
            <input
              type="search"
              placeholder="Search vehicle..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            <div className="filterTabs">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="vehicleList">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} key={vehicle.id} />
          ))}
        </section>
      </main>
    </div>
  );
}
