import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { MdLocationOn, MdAccessTimeFilled } from "react-icons/md";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://bi-assignment1-backend-livid.vercel.app/api/events/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const formattedFromDate = format(
    new Date(event.from_date),
    "EEE MMM dd yyyy 'at' hh:mm a"
  );
  const formattedToDate = format(
    new Date(event.to_date),
    "EEE MMM dd yyyy 'at' hh:mm a"
  );

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VBv83Q96B2_Stq4l6YFF_Ni2wVKkoYWGIg&s"
              alt="Meetup Logo"
              style={{ height: "60px", marginRight: "10px" }}
            />
          </Link>
        </div>
      </div>
      <hr />
      <header style={{ marginBottom: "20px" }}>
        <h1 className="mb-4 event-title">{event.title}</h1>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Hosted By: <br /> <strong>{event.host}</strong>
        </p>
      </header>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ flex: 2 }}>
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
          />
          <section>
            <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>Details:</h3>
            <p className="fs-6 fs-sm-5 fs-md-4 fs-lg-3 fs-xl-2">{event.description}</p>
          </section>

          <section style={{ marginTop: "20px" }}>
            <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
              Additional Information:
            </h3>
            <p>
              <strong>Dress Code:</strong>{" "}
              {event.additionalInformation.dressCode}
            </p>
            <p>
              <strong>Age Restrictions:</strong>{" "}
              {event.additionalInformation.ageRestrictions}
            </p>
          </section>

          <section style={{ marginTop: "20px" }}>
            <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
              Event Tags:
            </h3>
            <div style={{ display: "flex", gap: "10px"}}>
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    color: "white",
                    backgroundColor: "#ff5a5f",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Date & Time:</strong>
            </p>

            <p>
              <MdAccessTimeFilled
                style={{ marginRight: "5px", color: "#454545" }}
              />
              {formattedFromDate} to <br /> {formattedToDate}
            </p>

            <p>
              <strong>Venue:</strong>
            </p>

            <p>
              <MdLocationOn style={{ marginRight: "5px", color: "#454545" }} />
              {event.venue} {event.address && ", "} {event.address}
            </p>
            <p>
              <strong>Price:</strong>
            </p>
            <p>₹{event.price}</p>
          </div>

          <div>
            <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
              Speakers: ({event.speakers.length})
            </h3>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "nowrap",
                overflowX: "auto",
              }}
            >
              {event.speakers.map((speaker) => (
                <div
                  key={speaker.id}
                  style={{
                    textAlign: "center",
                    width: "140px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <img
                    src={speaker?.profilePic}
                    alt={speaker?.name}
                    className="profilePic-class"
                  />
                  <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {speaker.name}
                  </p>
                  <p style={{ color: "#777", fontSize: "12px" }}>
                    {speaker.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="rsvp-button"
          >
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
