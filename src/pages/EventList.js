import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://bi-assignment1-backend-livid.vercel.app/api/events"
        );
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleFilter = (searchQuery, eventType) => {
    let filtered = [...events];
    if (eventType && eventType !== "Both") {
      filtered = filtered.filter((event) => event.type === eventType);
    }
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      filtered = filtered.filter(
        (event) =>
          searchRegex.test(event.title) ||
          event.tags.some((tag) => searchRegex.test(tag))
      );
    }
    setFilteredEvents(filtered);
  };

  return (
    <div>
      <div className="main">
        <div className="second-main">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VBv83Q96B2_Stq4l6YFF_Ni2wVKkoYWGIg&s"
                alt="Meetup Logo"
                className="img-class"
              />
            </Link>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
              }}
            ></span>
          </div>
          <SearchFilter onFilter={handleFilter} />
        </div>
        <hr style={{ margin: "20px 0" }} />
        <div className="top-div">
          <div>
            <h1 className="meetup-events-text">Meetup Events</h1>
          </div>
          <div className="select-event-div">
            <select
              onChange={(e) => handleFilter("", e.target.value)}
              defaultValue=""
              className="event-select"
            >
              {" "}
              <option value="">Select Event Type</option>
              <option value="Both">Both</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
