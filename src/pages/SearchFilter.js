import React, { useState } from "react";

function SearchFilter({ onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType] = useState("Both");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFilter(query, eventType);
  };

  return (
    <div
      className="search-div d-flex justify-content-center align-items-center"
    >
      <input
        type="text"
        placeholder="Search by title or tag"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchFilter;
