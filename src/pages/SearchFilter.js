import React, { useState } from "react";

function SearchFilter({ onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType] = useState("Both");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFilter(query, eventType);
  };

  // const handleEventTypeChange = (e) => {
  //   const type = e.target.value;
  //   setEventType(type);
  //   onFilter(searchQuery, type);
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Search by title or tag"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          flex: 1,
          maxWidth: "300px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* <select
        value={eventType}
        onChange={handleEventTypeChange}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Select Event Type</option>
        <option value="Both">Both</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select> */}
    </div>
  );
}

export default SearchFilter;
