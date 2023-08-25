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
          <li
            key={flight.id}
            className="flex  items-center justify-center border border-gray-300 rounded-lg p-4 m-2"
          >
            <div className="flex flex-col w-80 justify-around  ">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-start justify-start pl-4">
                  <MdOutlineAirlines size={24} className="text-blue-600" />
                  <h2 className="font-bold ">{flight.airline}</h2>
                </div>
                <div>
                  {/* <p> {fortmatDate(flight.departureTime)}</p> */}
                  <p className="flex">
                    <FaPlaneArrival className="text-blue-700" />
                    <span className="font-semibold underline">
                      {fortmatDate(flight.arrivalTime)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-2 flex items-center justify-between">
                <div>
                  <p className="flex items-start  ">
                    <FaPlaneDeparture size={24} className="text-blue-600" />
                    <span>
                      ( {flight.departureAirportCode}) - {flight.departureCity}
                    </span>{" "}
                    : <span>{flight.departureHour}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <FaPlaneArrival size={24} className="text-blue-600" />
                    <span>
                      ({flight.arrivalAirportCode}) - {flight.arrivalCity}
                    </span>
                    : <span> {flight.arrivalHour}</span>
                  </p>
                </div>
                <div className="mt-5">
                  <p>
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(flight.price)}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className='flex items-center space-x-2 justify-start w-96 p-2 m-4 bg-red-500 text-gray-50  rounded-lg'>
            <BsExclamationCircleFill/>
          <p>flight was demented</p>
        </div>
      )}
    </>
  );
}

export default FlightList
