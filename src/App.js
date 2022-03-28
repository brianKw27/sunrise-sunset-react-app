import { useState } from "react";
import { getSunriseSunsetInfo } from "sunrise-sunset-api";
import LocationForm from "./components/LocationForm/LocationForm";
import "./styles.css";

const LOCATIONSLIMIT = 5;

export default function App() {
  const newLocation = { latitude: "", longitude: "" };
  const [locations, setLocations] = useState([newLocation]);
  const [sunTimes, setSunTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
    if (locations.length === LOCATIONSLIMIT) {
      setLoading(true);
      Promise.all(locations.map((location) => getSunriseSunsetInfo(location)))
        .then((values) => {
          setLoading(false);
          return setSunTimes(values);
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
        });
    } else {
      setLocations([...locations, newLocation]);
    }
  };

  const handleFieldChange = (id, value) => {
    const _locations = locations;
    _locations[id] = value;
    setLocations([..._locations]);
  };

  const locationForms = () =>
    locations.map((location, index) => (
      <LocationForm
        key={index}
        id={index}
        onChange={handleFieldChange}
        location={locations[index]}
        times={sunTimes[index]}
        loading={loading}
      />
    ));

  return (
    <div className="App">
      {locationForms()}
      <br />
      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
