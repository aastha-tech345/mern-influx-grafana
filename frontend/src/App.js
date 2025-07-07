import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ Correctly set Backend URL based on environment
  const BASE_URL = "http://localhost:5000";
  const WS_URL = BASE_URL.replace(/^http/, "ws"); // Replace only at start

  console.log("Base URL:", BASE_URL);
  console.log("WebSocket URL:", WS_URL);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/get-temp`)
      .then((res) => {
        console.log("API Response -->", res.data);
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Fetch Error:", err));
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
      .catch((err) => console.error("Post Error:", err));
  };

  useEffect(() => {
    fetchData();

    // ✅ Setup WebSocket only once
    const newSocket = new WebSocket(`${WS_URL}/ws`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    newSocket.onmessage = (event) => {
      console.log("WebSocket Message:", event.data);
      fetchData(); // Fetch updated data on message
    };

    newSocket.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    newSocket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    // Cleanup on unmount
    return () => {
      if (
        newSocket.readyState === WebSocket.OPEN ||
        newSocket.readyState === WebSocket.CONNECTING
      ) {
        newSocket.close();
      }
    };
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
        {data?.map((d, idx) => (
          <li key={idx}>
            {d._time} - {d.location} - {d._value}°C
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
