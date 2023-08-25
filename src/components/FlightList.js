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
          <tr
            key={flight.id}
            className=""
          >
            <td
              
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {flight.airline}
            </td>
            <td class="px-6 py-4">
              {" "}
              ( {flight.departureAirportCode}) - {flight.departureCity} :{" "}
              {flight.departureHour}
            </td>
            <td class="px-6 py-4">
              {" "}
              ({flight.arrivalAirportCode}) - {flight.arrivalCity}:
              {flight.arrivalHour}
            </td>
            <td class="px-6 py-4">
              {" "}
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(flight.price)}
            </td>
            <td class="px-6 py-4">{fortmatDate(flight.departureTime)}</td>
            <td class="px-6 py-4">{fortmatDate(flight.arrivalTime)}</td>
          </tr>
        ))
      ) : (
        <div className="flex items-center space-x-2 justify-start  w-96 p-2 m-4 bg-red-500 text-gray-50  rounded-lg">
          <BsExclamationCircleFill />
          <p>Flight was demented</p>
        </div>
      )}
    </>
  );
}

export default FlightList
