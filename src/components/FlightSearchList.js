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
      <div className="search-results">
        {flightStatus === "succeded" && searchResult.length > 0 ? (
          <>
            {searchResult.map((flight) => (
              <div key={flight.id} className="flight-result">
                <p>Kalkılan havalimanı: {flight.departureAirport}</p>
                <p>inilen havalimanı: {flight.arrivalAirport}</p>
                <p>Kalkış: {flight.departureCity}</p>
                <p>Varış: {flight.arrivalCity}</p>
                <p>Pricee: {flight.price}</p>
                <p>kALKIŞ ZAMANO: {fortmatDate(flight.departureTime)}</p>
                <p>Varış ZAMANI: {fortmatDate(flight.arrivalTime)}</p>
                {/* <p>Pirce: {flight.price}</p> */}
                {/* Diğer bilgiler */}
              </div>
            ))}
          </>
        ) : (
          <p>Uçuş Bulunamadı</p>
        )}
      </div>
    </div>
  );
}

export default FlightSearchList
