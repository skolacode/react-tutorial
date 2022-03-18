import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Pages
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
