import React, { useEffect, useState } from "react";
import api from "./apiClient";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("loading...");

  useEffect(() => {
    api.hi.$get().then((res) => {
      setGreeting(res.hello);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{greeting}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
