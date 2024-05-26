import { useState } from "react";
import "./App.css";
import { useGeolocation } from "./hooks/usegeolocation";

function App() {
  const [locationCount, setLocationCount] = useState(0);
  const { lat, lng, isLoading, error, getPosition } = useGeolocation();

  function getLocationCount() {
    getPosition();
    setLocationCount((s) => s + 1);
  }

  return (
    <div>
      <button onClick={getLocationCount} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {locationCount} times</p>
    </div>
  );
}

export default App;
