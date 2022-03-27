import { useState } from "react";
import { getSunriseSunsetInfo } from "sunrise-sunset-api";
import LocationForm from "./components/LocationForm/LocationForm";
import "./styles.css";

const LOCATIONSLIMIT = 5;

export default function App() {
  const newLocation = { latitude: "", longitude: "" };
  const [locations, setLocations] = useState([newLocation]);
  const handleNext = async () => {
    // const response = await getSunriseSunsetInfo({
    //   latitude: 36.72016,
    //   longitude: -44.42034,
    //   formatted: false
    // });
    // console.log(response);
    if (locations.length === LOCATIONSLIMIT) {
      Promise.all(locations.map((location) => getSunriseSunsetInfo(location)))
        .then((values) => console.log(values))
        .catch((err) => alert(err));
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
      />
    ));

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {locationForms()}
      <br />
      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
