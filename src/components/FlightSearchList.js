import React from 'react'

function FlightSearchList({flightStatus, searchResult}) {
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
              <li key={flight.id} className="flex items-center justify-center border border-gray-300 rounded-lg p-4 m-2">
              
              <div>
                    <p></p>
                
              </div>
                <p>Kalkılan havalimanı: {flight.departureAirport}</p>
                <p>inilen havalimanı: {flight.arrivalAirport}</p>
                <p>Kalkış: {flight.departureCity}</p>
                <p>Varış: {flight.arrivalCity}</p>
                <p>Pricee: {flight.price}</p>
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

export default FlightSearchList
