import React, { useState } from "react";
import "./LocationForm.css";

const LocationForm = ({ id, onChange, location }) => {
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
      <label>Longitude</label>
      <input
        type="text"
        value={longitude}
        onChange={(e) => handleChange(e.target.value, "long")}
      />
      <label>Latitude</label>
      <input
        type="text"
        value={latitude}
        onChange={(e) => handleChange(e.target.value, "lat")}
      />
    </div>
  );
};

export default LocationForm;
