import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ event }) {
  const formattedFromDate = format(
    new Date(event.from_date),
    "EEE MMM d yyyy • h:mm:ss a"
  );

  return (
    <div className="event-card-main">
      <div
        className="event-card-relative-div"
      >
        <img src={event?.image} alt={event.title} className="event-image" />
        <div
          className="event-card-absolute-div"
        >
          {event.type} Event
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <p className="formatted-date">{formattedFromDate} IST</p>
        <h3 className="event-title">{event.title}</h3>
        <Link to={`/event/${event._id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
