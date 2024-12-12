import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { name, age };

    try {
      // Backend URL (use the Minikube IP and NodePort for local testing)
      const response = await axios.post(
        `http://192.168.56.1:5000/post`, // Replace with the actual backend URL and port
        data
      );

      if (response.status === 201) {
        setMessage("Data inserted successfully!");
        setId(response.data.id);
      }
    } catch (error) {
      setMessage("Error occurred while submitting data.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Submit Data to Flask Backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <div>{message}</div>}
      {id && <div>Inserted ID: {id}</div>}
    </div>
  );
}

export default App;
