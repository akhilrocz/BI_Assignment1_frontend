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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {/* Meetup Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VBv83Q96B2_Stq4l6YFF_Ni2wVKkoYWGIg&s"
                alt="Meetup Logo"
                style={{ height: "60px", marginRight: "10px" }}
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

          {/* Search Filter */}
          <SearchFilter onFilter={handleFilter} />
        </div>
        <hr style={{ margin: "20px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0, textAlign: "left" }}>Meetup Events</h1>
          <select
            onChange={(e) => handleFilter("", e.target.value)}
            defaultValue=""
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              maxWidth: "150px",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {" "}
            <option value="">Select Event Type</option>
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
