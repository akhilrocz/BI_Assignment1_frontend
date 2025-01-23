import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./pages/EventList";
import "./App.css";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EventList />}></Route>
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
