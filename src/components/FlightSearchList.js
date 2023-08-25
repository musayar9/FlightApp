import React from "react";

import Loading from "./Loading";
import FlightList from "./FlightList";
function FlightSearchList({ flightStatus, flight, searchResult, showFlight }) {

  
  return (
    <>
      {flightStatus === "loading" && <Loading />}
      <div class="relative overflow-x-auto shadow-md ">
        {flightStatus === "succeded" && (
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
           
              <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Airline
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Kalkış-Saat
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Varış-Saat
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Prcie
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Kalkı Tarihi
                  </th>
                  <th scope="col" class="px-6 py-3">
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
