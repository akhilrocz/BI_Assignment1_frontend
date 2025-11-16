import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ event }) {
  const formattedFromDate = format(
    new Date(event.from_date),
    "EEE MMM d yyyy • h:mm:ss a"
  );

  return (
    <div
      // style={{
      //   border: "1px solid #ddd",
      //   borderRadius: "8px",
      //   overflow: "hidden",
      //   width: "300px",
      //   margin: "15px",
      //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      //   position:"relative"
      // }}
       className="event-card-main"
    >
      <div style={{ height: "200px", overflow: "hidden", position:"relative" }}>
        <img
          src={event?.image}
          alt={event.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          backgroundColor: event.type === "Online" ? "#fff" : "#fff",
          color: "black",
          padding: "6px 12px",
          borderRadius: "10px",
          fontSize: "12px",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {event.type} Event
      </div>

      <div style={{ padding: "20px" }}>
        {" "}
        <p style={{ fontSize: "14px", color: "#555", margin: "0 0 10px 0" }}>
          {formattedFromDate} IST
        </p>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>
          {event.title}
        </h3>
        <Link
          to={`/event/${event._id}`}
          style={{
            textDecoration: "none",
            color: "#007BFF",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
