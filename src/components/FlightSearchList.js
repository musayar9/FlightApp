import React, { useState } from "react";
import { compareAsc, parse } from "date-fns";
import Loading from "./Loading";
import FlightList from "./FlightList";
import { MdOutlineAirlines } from "react-icons/md";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaArrowCircleUp,
  FaArrowCircleDown
} from "react-icons/fa";
import { AiTwotoneFilter, AiOutlineFilter } from "react-icons/ai";
function FlightSearchList({
  flightStatus,
  flight,
  searchResult,
  showFlight,
  setSearchResult,
  showDate,
  setShowDate,
  setShowFlight
}) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterHour, setHourFilter] = useState(false);
  const [returnHour, setReturnHour] = useState(false);

  const [wayLength, setWayLength] = useState(false);

  //Fiyata göre filtreleme
  const handleSortPrice = () => {
    setFilterOpen(!filterOpen);

    if (filterOpen) {
      let sortPrice = [...searchResult].sort((a, b) => b.price - a.price);
      setSearchResult(sortPrice);
    } else {
      let sortFilter = [...searchResult].sort((a, b) => a.price - b.price);
      setSearchResult(sortFilter);
    }
  };

  //Yol uzunluğun göre filtreleme

  const handleWayLength = () => {
    setWayLength(!wayLength);

    const wayStatus = [...searchResult].sort((a, b) => {
      const wayA = parse(a.wayLength, "HH:mm", new Date());
      const wayB = parse(b.wayLength, "HH:mm", new Date());

      return wayLength ? compareAsc(wayA, wayB) : compareAsc(wayB, wayA);
    });

    setSearchResult(wayStatus);
  };

  //Kalkış tarihine göre filtreleme
  const allFlightSort = flight.slice().sort((a, b) => a.price - b.price);

  const handleSortDepartureTime = () => {
    setHourFilter(!filterHour);
    const sortedFlights = [...searchResult].sort((a, b) => {
      const departureTimeA = parse(a.departureHour, "HH:mm", new Date());
      const departureTimeB = parse(b.departureHour, "HH:mm", new Date());

      return filterHour
        ? compareAsc(departureTimeA, departureTimeB)
        : compareAsc(departureTimeB, departureTimeA);
    });

    setSearchResult(sortedFlights);
  };

  //Dönüş saatine göre filtreleme
  const handleSortReturnDepartureHour = () => {
    setReturnHour(!returnHour);
    const sortedFlights = [...searchResult].sort((a, b) => {
      const departureTimeA = parse(a.returnDepartureHour, "HH:mm", new Date());
      const departureTimeB = parse(b.returnDepartureHour, "HH:mm", new Date());

      return returnHour
        ? compareAsc(departureTimeA, departureTimeB)
        : compareAsc(departureTimeB, departureTimeA);
    });

    setSearchResult(sortedFlights);
  };

  const handeClickAllFilter = () => {
    setOpen(!open);
  };

  return (
    <>
      {flightStatus === "loading" && <Loading />}
      <div className="relative overflow-x-auto shadow-lg mt-5 mb-5 rounded-md">
        {flightStatus === "succeded" && (
          <table className="w-full text-sm text-left text-gray-500  ">
            <thead className="text-sm text-gray-200 capitalize  bg-gradient-to-br from-green-400 to-blue-600">
            
              <tr>
                <th scope="col" className="px-4 py-3">
                  <span className="flex">
                    <MdOutlineAirlines size={24} className="p-1" /> Airline
                  </span>
                </th>
                <th scope="col" className="px-4 py-3 space-x-1 flex">
                  <span className="flex">
                    <FaPlaneDeparture size={24} className="pr-2" /> Departure{" "}
                  </span>

                  {showFlight && (
                    <button type="button" onClick={handleSortDepartureTime}>
                      {filterHour ? (
                        <AiOutlineFilter size={18} />
                      ) : (
                        <AiTwotoneFilter size={18} />
                      )}
                    </button>
                  )}
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="flex">
                    <FaPlaneArrival size={26} className="pr-2" /> Arrival{" "}
                  </span>
                </th>
                <th scope="col" className="px-4 py-3">
                  Departure Date
                </th>

                {!showDate && (
                  <>
                    <th scope="col" className="px-4 py-3 space-x-1 flex">
                      <span className="flex">
                        <FaPlaneDeparture size={24} className="pr-2" />
                        Return Dep.
                      </span>

                      {showFlight && (
                        <button
                          type="button"
                          onClick={handleSortReturnDepartureHour}
                        >
                          {returnHour ? (
                            <AiOutlineFilter size={18} />
                          ) : (
                            <AiTwotoneFilter size={18} />
                          )}
                        </button>
                      )}
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="flex">
                        <FaPlaneArrival size={26} className="pr-2" /> Return
                        Arr.
                      </span>
                    </th>

                    <th scope="col" className="px-4 py-3">
                      Return Date
                    </th>
                  </>
                )}
                <th scope="col" className="px-4 py-3">
                  Way Length
                  {showFlight && (
                    <button type="button" onClick={handleWayLength}>
                      {wayLength ? (
                        <AiOutlineFilter size={18} />
                      ) : (
                        <AiTwotoneFilter size={18} />
                      )}
                    </button>
                  )}
                </th>
                <th scope="col" className="px-4 py-3 space-x-2">
                  <span>Price </span>
                  <button
                    type="button"
                    onClick={showFlight ? handleSortPrice : handeClickAllFilter}
                  >
                    {open || filterOpen ? (
                      <FaArrowCircleUp />
                    ) : (
                      <FaArrowCircleDown />
                    )}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {showFlight ? (
                <FlightList
                  item={searchResult}
                  showDate={showDate}
                  setShowFlight={setShowFlight}
                />
              ) : (
                <FlightList
                  item={open ? flight : allFlightSort}
                  showDate={showDate}
                  setShowFlight={setShowFlight}
                />
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default FlightSearchList;
