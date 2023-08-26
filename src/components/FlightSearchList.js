import React, { useState } from "react";
import { compareAsc, parse } from "date-fns";
import Loading from "./Loading";
import FlightList from "./FlightList";
function FlightSearchList({
  flightStatus,
  flight,
  searchResult,
  showFlight,
  setSearchResult,
  showDate,
}) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterHour, setHourFilter] = useState(false);
  const [returnHour, setReturnHour] = useState(false);
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



const allFlightSort = flight.slice().sort((a, b) => a.price - b.price);
  
    const handleSortDepartureTime = () => {
    setHourFilter(!filterHour)
      const sortedFlights = [...searchResult].sort((a, b) => {
    
        const departureTimeA = parse(a.departureHour, "HH:mm", new Date());
        const departureTimeB = parse(b.departureHour, "HH:mm", new Date());

        return (
          filterHour ? compareAsc(departureTimeA, departureTimeB) : compareAsc(departureTimeB, departureTimeA)
        )
      });

      setSearchResult(sortedFlights);
    };
    
 const    handleSortReturnDepartureHour = ()=>{
    setReturnHour(!returnHour)
      const sortedFlights = [...searchResult].sort((a, b) => {
        const departureTimeA = parse(
          a.returnDepartureHour,
          "HH:mm",
          new Date()
        );
        const departureTimeB = parse(
          b.returnDepartureHour,
          "HH:mm",
          new Date()
        );

        return returnHour
          ? compareAsc(departureTimeA, departureTimeB)
          : compareAsc(departureTimeB, departureTimeA);
      });

      setSearchResult(sortedFlights);
    }

  const handeClickAllFilter = () => {
    setOpen(!open);
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
                <th scope="col" className="px-6 py-3 space-x-2">
                  <span>Kalkış-Saat</span>

                  {showFlight && (
                    <button type="button" onClick={handleSortDepartureTime}>
                      filter
                    </button>
                  )}
                </th>
                <th scope="col" className="px-6 py-3">
                  Varış-Saat
                </th>
                <th scope="col" className="px-6 py-3">
                  Kalkı Tarihi
                </th>
                {!showDate && (
                  <>
                    <th scope="col" className="px-6 py-3 space-x-2">
                      <span>Dönüş K Saa</span>

                      {showFlight && (
                        <button
                          type="button"
                          onClick={handleSortReturnDepartureHour}
                        >
                          filter
                        </button>
                      )}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dönüş Varış Saat
                    </th>
                    
                     <th scope="col" className="px-6 py-3">
                    dÖNÜŞ Tarihi
                  </th>
                  </>
                )}
       
                <th scope="col" className="px-6 py-3 space-x-2">
                  <span>Prcie </span>
                  <button
                    type="button"
                    onClick={showFlight ? handleSortPrice : handeClickAllFilter}
                  >
                    filter
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {showFlight ? (
                <FlightList item={searchResult} showDate={showDate} />
              ) : (
                <FlightList
                  item={open ? flight : allFlightSort}
                  showDate={showDate}
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
