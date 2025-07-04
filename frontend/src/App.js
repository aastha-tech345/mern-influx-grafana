import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  console.log("aastha", BASE_URL);
  const fetchData = () => {
    axios
      .get(`${BASE_URL}/get-temp`)
      .then((res) => {
        console.log("API Response -->", res.data);
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/log-temp`, { location, value: parseFloat(value) })
      .then(() => {
        setLocation("");
        setValue("");
        fetchData();
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Temperature Logger</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Temperature"
          type="number"
          required
        />
        <button type="submit">Log</button>
      </form>

      <h2>Logged Data:</h2>
      <ul>
        {Array.isArray(data) &&
          data.map((d, idx) => (
            <li key={idx}>
              {d._time} - {d.location} - {d._value}°C
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
