import React from 'react'
import { useSelector } from "react-redux";
import { MdOutlineAirlines } from "react-icons/md";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
function FlightList({item}) {

// const { error } = useSelector((state) => state.flights);
const fortmatDate = (time) => {
  const newDate = time.split("-");

  const newDateValue = newDate.reverse().join("/");

  return newDateValue;
};
  return (
    <>
      {item.length > 0 ? (
        item.map((flight) => (
          <tr key={flight.id} className="">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrape">
              {flight.airline}
            </td>
            <td className="px-6 py-4">
              {" "}
              ( {flight.departureAirportCode}) - {flight.departureCity} :{" "}
              {flight.departureHour}
            </td>
            <td className="px-6 py-4">
              {" "}
              ({flight.arrivalAirportCode}) - {flight.arrivalCity}:
              {flight.arrivalHour}
            </td>
            <td className="px-6 py-4">
              {" "}
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(flight.price)}
            </td>
            <td className="px-6 py-4">{fortmatDate(flight.departureTime)}</td>
            <td className="px-6 py-4">{fortmatDate(flight.arrivalTime)}</td>
          </tr>
        ))
      ) : (
        <tr className="flex items-center space-x-2  w-full p-2 m-4 bg-red-500 text-gray-50  rounded-lg">
          <td>
            <BsExclamationCircleFill />
          </td>
          <td>Flight was demented</td>
        </tr>
      )}
    </>
  );
}

export default FlightList
