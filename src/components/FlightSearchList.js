import React from "react";

import Loading from "./Loading";
import FlightList from "./FlightList";
function FlightSearchList({ flightStatus, flight, searchResult, showFlight }) {

  
  return (
    <div>
      {flightStatus === "loading" && <Loading />}
      <ul className="p-4 m-4 flex items-center flex-row flex-wrap justify-center ">
        {flightStatus === "succeded" && (
          <>
            {showFlight ? (
             <FlightList item={searchResult}/>
            ) : <FlightList item={flight}/>}
          </>
        )}
      </ul>
    </div>
  );
}

export default FlightSearchList;
