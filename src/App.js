import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Web Page</h1>
        <p>This is a simple React app with a counter and input field.</p>
      </header>
      
      <main>
        <section className="counter-section">
          <h2>Counter</h2>
          <p>Count: {count}</p>
          <button className="btn" onClick={handleIncrement}>Increment</button>
          <button className="btn" onClick={handleDecrement}>Decrement</button>
        </section>

        <section className="name-section">
          <h2>What's Your Name?</h2>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="name-input"
          />
          <p>Hello, {name ? name : 'Stranger'}!</p>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 My Simple React App</p>
      </footer>
    </div>
  );
}

export default App;
