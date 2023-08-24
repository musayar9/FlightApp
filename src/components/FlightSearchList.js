import React from "react";
import { MdOutlineAirlines } from "react-icons/md";
function FlightSearchList({ flightStatus, searchResult }) {
  const fortmatDate = (time) => {
    const newDate = time.split("-");
    console.log("newDate", newDate[2]);

    const newDateValue = newDate.reverse().join("/");

    return newDateValue;
  };
  return (
    <div>
      <ul className="p-4 m-4">
        {flightStatus === "succeded" && searchResult.length > 0 ? (
          <>
            {searchResult.map((flight) => (
              <li
                key={flight.id}
                className="flex  items-center justify-center border border-gray-300 rounded-lg p-4 m-2"
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center ">
                    <MdOutlineAirlines size={24} className="text-blue-600" />
                    <h2 className="text-bold ">{flight.airline}</h2>
                  </div>

                  <p>
                    Departure {flight.departureCity} - (
                    {flight.departureAirportCode})
                  </p>
                  <p>
                    Arrival: {flight.arrivalCity}-({flight.arrivalAirportCode})
                  </p>
                </div>

                <p>DepartureHoure: {flight.departureHour}</p>
                <p>Varış: {flight.arrivalHour}</p>
                <p>
                  Pricee:{" "}
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(flight.price)}
                </p>
                <p>kALKIŞ ZAMANO: {fortmatDate(flight.departureTime)}</p>
                <p>Varış ZAMANI: {fortmatDate(flight.arrivalTime)}</p>
                {/* <p>Pirce: {flight.price}</p> */}
                {/* Diğer bilgiler */}
              </li>
            ))}
          </>
        ) : (
          <p>Uçuş Bulunamadı</p>
        )}
      </ul>
    </div>
  );
}

export default FlightSearchList;
