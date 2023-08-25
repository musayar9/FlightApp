import React from "react";

import Loading from "./Loading";
import FlightList from "./FlightList";
function FlightSearchList({ flightStatus, flight, searchResult, showFlight, setSearchResult }) {

    const handleSortPrice = () => {
      const sortPrice = [...searchResult].sort((a, b) => b.price - a.price);
      setSearchResult(sortPrice);
    };
  return (
    <>
      {flightStatus === "loading" && <Loading />}
      <div className="relative overflow-x-auto shadow-lg mt-5 mb-5 rounded-md">
        {flightStatus === "succeded" && (
          <table className="w-full text-sm text-left text-gray-500  ">
            <thead className="text-sm text-gray-200 uppercase  bg-gradient-to-br from-green-400 to-blue-600">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Airline
                </th>
                <th scope="col" className="px-6 py-3">
                  Kalkış-Saat
                </th>
                <th scope="col" className="px-6 py-3">
                  Varış-Saat
                </th>
                <th scope="col" className="px-6 py-3 space-x-2">
                  <span>Prcie </span>
                  <button type="button" onClick={handleSortPrice}>filter</button>
                </th>
                <th scope="col" className="px-6 py-3">
                  Kalkı Tarihi
                </th>
                <th scope="col" className="px-6 py-3">
                  Varış Tarihi
                </th>
              </tr>
            </thead>

            <tbody>
              {showFlight ? (
                <FlightList item={searchResult} />
              ) : (
                <FlightList item={flight} />
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default FlightSearchList;
