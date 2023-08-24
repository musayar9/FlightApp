import React from 'react'
import {compareAsc } from "date-fns";
function FlightFilter({searchResult, setSearchResult}) {
  const handleSortByDepartureTime = () => {
    const sortedFlights = [...searchResult].sort((a, b) =>
      compareAsc(new Date(a.departureTime), new Date(b.departureTime))
    );
    setSearchResult(sortedFlights);
  };

  const handleSortPrice = () => {
    const sortPrice = [...searchResult].sort((a, b) => b.price - a.price);
    setSearchResult(sortPrice);
  };

  return (
    <div>
      <div className="form-group">
        <button onClick={handleSortByDepartureTime}>
          Kalkış Zamanına Göre Sırala
        </button>
      </div>

      <div className="form-group">
        <button onClick={handleSortPrice}>fiyata göre sırala</button>
      </div>
    </div>
  );
}

export default FlightFilter
