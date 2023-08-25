import React, { useState } from "react";
import { compareAsc } from "date-fns";
import Loading from "./Loading";
import FlightList from "./FlightList";
function FlightSearchList({ flightStatus, flight, searchResult, showFlight, setSearchResult }) {
      const [open, setOpen] = useState(false);
      const [filterOpen, setFilterOpen] = useState(false)

           
    const handleSortPrice = () => {
     setFilterOpen(!filterOpen)
     
     if(filterOpen){
       let sortPrice = [...searchResult].sort((a, b) => b.price - a.price);
     setSearchResult(sortPrice)
     
     }else{
     let sortFilter = [...searchResult].sort((a, b) => a.price - b.price);
     setSearchResult(sortFilter)
     }
      
    };


    const allFlightSort = flight.slice().sort((a, b) => b.price - a.price)



    const handeClickAllFilter = ()=>{
    
      setOpen(!open)
    }
    

    
    
    
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
                  <button
                    type="button"
                    onClick={showFlight ? handleSortPrice : handeClickAllFilter}
                  >
                    filter
                  </button>
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
                <FlightList item={open ? flight : allFlightSort  }  />
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default FlightSearchList;
