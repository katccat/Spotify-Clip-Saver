import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
