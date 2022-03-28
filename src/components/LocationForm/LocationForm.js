import React, { useState } from "react";
import { convertUTCToLocal } from "../../utils/times";
import "./LocationForm.css";

const LocationForm = ({ id, onChange, location, times, loading }) => {
  // longitude and latitude
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const handleChange = (value, type) => {
    const _value = parseFloat(value);
    if (type === "long") setLongitude(_value);
    else setLatitude(_value);
    onChange(id, { longitude, latitude });
  };

  return (
    <div className="location-wrapper">
      <h2>Location {id + 1}</h2>
      <label>Longitude</label>
      <input
        type="text"
        value={longitude || ""}
        onChange={(e) => handleChange(e.target.value, "long")}
      />
      <label>Latitude</label>
      <input
        type="text"
        value={latitude || ""}
        onChange={(e) => handleChange(e.target.value, "lat")}
      />
      {loading && <p>loading...</p>}
      {times && (
        <p>
          sunrise:{convertUTCToLocal(times?.sunrise)} sunset:
          {convertUTCToLocal(times?.sunset)}
        </p>
      )}
    </div>
  );
};

export default LocationForm;
