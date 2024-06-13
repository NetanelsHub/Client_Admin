import React from "react";

export default function SearchComponent({ searchTerm, setSearchTerm, priceFilter, setPriceFilter }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="mb-4 ">
      <input
        type="text"
        className="px-3 py-2 w-48 mr-4 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <input
        type="text"
        className="px-3 py-2 w-48 mr-4 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Price filter..."
        value={priceFilter}
        onChange={handlePriceChange}
      />
    </div>
  );
}
