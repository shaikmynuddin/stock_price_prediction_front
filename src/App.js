import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard'; 
import LandingPage from './components/Landingpage'; 
import PredictionPage from './components/PredictionPage'; 
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const stocks = ['META','GOOG', 'AAPL', 'MSFT', 'GME', 'WIT','AMZN','TSLA','PYPL']; // Define stocks array

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
      document.title = "StockTrack - Dark Mode";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = "StockTrack - Light Mode";
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    showAlert("Logged In successfully", "success");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    showAlert("Logout successful", "success");

  };

  return (
    <>
      <Router>
        <Navbar title="StockTrack" mode={mode} toggleMode={toggleMode} isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout}/>
        <Alert alert={alert} />
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<LandingPage />} /> {/* LandingPage component included within the Home route */}
            <Route exact path="/dashboard" element={<Dashboard />} /> {/* Route to the Dashboard component */}
            <Route path="/prediction" element={<PredictionPage stocks={stocks} />} />
            <Route exact path="/about" element={<About mode={mode}/>} />
            <Route exact path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route exact path="/signup" element={<Signup handleLogin={handleLogin} />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
