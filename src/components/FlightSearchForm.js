import React, { useEffect, useState } from "react";
import { compareAsc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/flightSlice";
import FlightSearchList from "./FlightSearchList";
import FlightFilter from "./FlightFilter";
function FlightSearchForm() {
  const [searchData, setSearchData] = useState({
    departureAirportCode: "",
    arrivalAirportCode: "",
    departureAirport: "",
    arrivalAirport: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    arrivalDate: "",
    oneWay: false,
  });

  const [isDepartureFilter, setIsDepartureFilter] = useState(true);
  const [isArrivalFilter, setIsArrivalFilter] = useState(true);
  const [showFlight, setShowFlight] = useState(false)
  const dispatch = useDispatch();
  const { flight, flightStatus } = useSelector((state) => state.flights);
  const [searchResult, setSearchResult] = useState();
  const [showError, setShowError] = useState({
    departureAirport: false,
    arrivalAirport: false,
    departureDate: false,
  });
  useEffect(() => {
    if (flightStatus === "idle") {
      dispatch(fetchFlights());

      setSearchResult(flight);
    }
  }, [setSearchResult, dispatch, flightStatus, flight]);

  useEffect(() => {
    // Uygun uçuşları filtreleme
    const filteredFlights = flight.filter((flight) => {
      const departureMatch =
        flight.departureAirportCode
          .toLocaleLowerCase("TR")
          .includes(searchData.departureAirport.toLocaleLowerCase("TR")) ||
        flight.departureCity
          .toLocaleLowerCase("TR")
          .includes(searchData.departureAirport.toLocaleLowerCase("TR"));

      const arrivalMatch =
        flight.arrivalAirportCode
          .toLocaleLowerCase("TR")
          .includes(searchData.arrivalAirport.toLocaleLowerCase("TR")) ||
        flight.arrivalCity
          .toLocaleLowerCase("TR")
          .includes(searchData.arrivalAirport.toLocaleLowerCase("TR"));

      return departureMatch && arrivalMatch;
    });

    setSearchResult(filteredFlights);
  }, [searchData, flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "departureAirport") setIsDepartureFilter(true);
    if (name === "arrivalAirport") setIsArrivalFilter(true);
  };

  const handleOneWayChange = (e) => {
    setSearchData((prevData) => ({
      ...prevData,
      oneWay: e.target.checked,
      arrivalDate: e.target.checked ? "" : prevData.arrivalDate,
    }));
  };
  const handleSearch = () => {
   
    if (
      searchData.departureAirport === "" ||
      searchData.arrivalAirport === "" ||
      searchData.departureDate === ""
    ) {
      setShowError({
        departureAirport: searchData.departureAirport === "",
        arrivalAirport: searchData.arrivalAirport === "",
        departureDate: searchData.departureDate === "",
      });
      return;
    } else {
      setShowError({
        departureAirport: false,
        arrivalAirport: false,
        departureDate: false,
      });
    }

    const dateFilter = searchResult.filter((flight) => {
      const searchDateFilter = new Date(searchData.departureDate);
      const searchResultDate = new Date(flight.departureTime);

      const searchArrivalDate = new Date(searchData.arrivalDate);
      const searchResultArrivalDate = new Date(flight.arrivalTime);

      const departureFilterDate =
        compareAsc(searchResultDate, searchDateFilter) === 0;

      const arrivalFilterDate =
        compareAsc(searchResultArrivalDate, searchArrivalDate) === 0;
      if (!searchData.oneWay) {
        return departureFilterDate && arrivalFilterDate;
      } else {
        return arrivalFilterDate;
      }
    });
    setSearchResult(dateFilter);
    setShowFlight(true)
  };

  const handleAirportClick = (airportCode) => {
    setSearchData((prevData) => ({
      ...prevData,
      departureAirport: airportCode,
  
      
    }));
    setIsDepartureFilter(false);
   
  };
  
    const handleArrivalAirport = (airportCode) => {
      setSearchData((prevData) => ({
        ...prevData,
        arrivalAirport: airportCode,
      }));
    
      setIsArrivalFilter(false);
    };

  const getUniqueAirports = () => {
    const uniqueAirportsMap = new Map();

    flight.forEach((item) => {
      if (!uniqueAirportsMap.has(item.departureAirportCode)) {
        uniqueAirportsMap.set(item.departureAirportCode, {
          departureAirportCode: item.departureAirportCode,
          departureAirport: item.departureAirport,
        });
      }
    });

    return Array.from(uniqueAirportsMap.values());
  };

  const getUniqueArrival = () => {
    const uniqueAirportsMap = new Map();

    flight.forEach((item) => {
      if (!uniqueAirportsMap.has(item.arrivalAirportCode)) {
        uniqueAirportsMap.set(item.arrivalAirportCode, {
          arrivalAirportCode: item.arrivalAirportCode,
          arrivalAirport: item.arrivalAirport,
        });
      }
    });

    return Array.from(uniqueAirportsMap.values());
  };
  return (
    <div className="mx-auto flex flex-col items-center content-center mt-10 ">
      <div className="border border-gray-300 w-[800px] p-10">
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="departureAirport"
              id="departureAirport"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={searchData.departureAirport}
              onChange={handleChange}
            />

            {searchData.departureAirport && (
              <>
                {isDepartureFilter && (
                  <div className="airport-list">
                    {getUniqueAirports()
                      .filter((item) =>
                        item.departureAirportCode
                          .toLocaleLowerCase("TR")
                          .includes(
                            searchData.departureAirportCode.toLocaleLowerCase(
                              "TR"
                            )
                          )
                      )
                      .map((filteredItem) => (
                        <p
                          className="cursor-pointer"
                          key={filteredItem.id}
                          onClick={() =>
                            handleAirportClick(
                              filteredItem.departureAirportCode
                            )
                          }
                        >
                          {filteredItem.departureAirportCode} -
                          {filteredItem.departureAirport}
                        </p>
                      ))}
                  </div>
                )}
              </>
            )}
            <label
              htmlFor="departureAirport"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Departure Airport
            </label>
            {showError.departureAirport && (
              <p className="error-message">Kalkış havaalanı boş bırakılamaz.</p>
            )}
          </div>
          <div class="relative z-20 w-full mb-6 group">
            <input
              type="text"
              name="arrivalAirport"
              id="arrivalAirport"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={searchData.arrivalAirport}
              onChange={handleChange}
            />

            {searchData.arrivalAirport && (
              <>
                {isArrivalFilter && (
                  <div className="w-full border border-gray-300 p-2 font-bold h-24  overflow-x-auto rounded text-gray-50 bg-gray-400  absolute">
                    {getUniqueArrival()
                      .filter((item) =>
                        item.arrivalAirportCode
                          .toLocaleLowerCase("TR")
                          .includes(
                            searchData.arrivalAirportCode.toLocaleLowerCase(
                              "TR"
                            )
                          )
                      )
                      .map((filteredItem) => (
                        <p
                          className="cursor-pointer"
                          key={filteredItem.id}
                          onClick={() =>
                            handleArrivalAirport(
                              filteredItem.arrivalAirportCode
                            )
                          }
                        >
                          {filteredItem.arrivalAirportCode} -
                          {filteredItem.arrivalAirport}
                        </p>
                      ))}
                  </div>
                )}
              </>
            )}
            <label
              htmlForfor="arrivalAirport"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ArrivalAirport
            </label>
            {showError.arrivalAirport && (
              <p className="error-message">Kalkış havaalanı boş bırakılamaz.</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="departureDate"
              id="depratureDate"
              value={searchData.departureDate}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="depreatureDate"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Deprature Date
            </label>
          </div>
          <div class="relative w-full mb-6 group">
            <input
              type="date"
              name="arrivalDate"
              id="arrivalDate"
              className="flex py-2.5 z-10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer 
              disabled:text-gray-300"
              value={searchData.arrivalDate}
              onChange={handleChange}
              disabled={searchData.oneWay}
            />
            <label
              for="arrivalDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ArrivalDate
            </label>
          </div>
        </div>

        <div class="flex items-center pl-4  rounded ">
          <input
            name="oneWay"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            id="oneWay"
            type="checkbox"
            checked={searchData.oneWay}
            onChange={handleOneWayChange}
          />
          <label
            htmlFor="oneWay"
            class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            One Way Flight
          </label>
        </div>

        <button
          onClick={handleSearch}
          class="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span class="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Search Flight
          </span>
        </button>
      </div>

      {/* <FlightFilter
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      /> */}

      <FlightSearchList
        flightStatus={flightStatus}
        searchResult={searchResult}
      />
    </div>
  );
}

export default FlightSearchForm;
