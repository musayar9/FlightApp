import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
function FlightList({ item, showDate, setShowDate, setShowFlight }) {
  //tarih formatlama alanı
  const fortmatDate = (time) => {
    const newDate = time.split("-");

    const newDateValue = newDate.reverse().join("/");

    return newDateValue;
  };

  // saat formatlama
  function formatTimeManually(timeStr) {
    const [hours, minutes] = timeStr.split(":");
    const hourUnit = parseInt(hours) > 0 ? "s." : "saat";
    const minuteUnit = parseInt(minutes) > 0 ? "dakika" : "dk";

    return `${hours}${hourUnit} : ${minutes} ${minuteUnit}`;
  }
  return (
    <>
      {item.length > 0 ? (
        item.map((flight) => (
          <tr key={flight.id} className="">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrape">
              {flight.airline}
            </td>
            <td className="px-6 py-4">
              ({flight.departureAirportCode}) - {flight.departureCity} :
              {flight.departureHour}
            </td>
            <td className="px-6 py-4">
              ({flight.arrivalAirportCode}) - {flight.arrivalCity}:
              {flight.arrivalHour}
            </td>
            <td className="px-6 py-4">{fortmatDate(flight.departureTime)}</td>
            {!showDate && (
              <>
                <td className="px-6 py-4">
                  ({flight.arrivalAirportCode}) -{flight.returnDepartureHour}
                </td>
                <td className="px-6 py-4">
                  ({flight.departureAirportCode}) -{flight.returnArrivalHour}
                </td>

                <td className="px-6 py-4">{fortmatDate(flight.arrivalTime)}</td>
              </>
            )}
            {
              <td className="px-6 py-4">
                {formatTimeManually(flight.wayLength)}
              </td>
            }

            <td className="px-6 py-4">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(flight.price)}
            </td>
          </tr>
        ))
      ) : (
        <>
          <tr className="flex items-center justify-center      rounded-lg">
            <td className="px-2 py-4  text-red-500">
              <BsExclamationCircleFill size={26} />
            </td>
            <td className="px-2 py-4 text-red-500 text-lg font-bold">
              The flight was found
            </td>
            <td className="px-2 py-4">
              <button
                className="bg-blue-600 hover:bg-gray-50  text-gray-50 hover:text-blue-500 border hover:border-blue-500 px-2 py-1 rounded-lg duration-500"
                onClick={() => setShowFlight(false)}
              >
                Return Flight List
              </button>
            </td>
          </tr>

          <tr></tr>
        </>
      )}
    </>
  );
}

export default FlightList;
