import React, { useEffect, useState } from "react";
import { compareAsc, isToday, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirline, fetchFlights } from "../redux/flightSlice";
import FlightSearchList from "./FlightSearchList";
import { BsExclamationCircleFill } from "react-icons/bs";
import Error from "./Error";

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
  const [showFlight, setShowFlight] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const dispatch = useDispatch();
  const { flight, flightStatus, airline, airlineStatus, error } = useSelector(
    (state) => state.flights
  );
  const [searchResult, setSearchResult] = useState();
  const [showError, setShowError] = useState({
    departureAirport: false,
    arrivalAirport: false,
    departureDate: false,
    arrivalDate: false,
  });

  useEffect(() => {
    if (flightStatus === "idle") {
      //Api üzerinden uçuş detaylarını çekme
      dispatch(fetchFlights());

      //api üzerinden çekilen uçuş detaylarını bir arraya aktarma
      setSearchResult(flight);
    }
  }, [setSearchResult, dispatch, flightStatus, flight]);
  useEffect(() => {
    //Havaalanı kodları ve şehir bilgilerine göre apiden veri çekme
    if (airlineStatus === "idle") {
      dispatch(fetchAirline());
    }
  }, [dispatch, airlineStatus, airline]);
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
    setShowFlight(false);
  }, [searchData, flight, setShowFlight, setSearchResult, setShowDate]);

  //Tarihe göre filtreleme ve geçmiş tarih üzerinde işlem yapılamama alanı
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "departureTime" &&
      name === "arrivalTime" &&
      isToday(new Date(value))
    ) {
      setSearchData((prevDate) => ({
        ...prevDate,
        departureDate: "",
        arrivalDate: "",
      }));
      return;
    }
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "departureAirport") setIsDepartureFilter(true);
    if (name === "arrivalAirport") setIsArrivalFilter(true);
  };
  //Tek Yönlü Uçuş Kontrol
  const handleOneWayChange = (e) => {
    setSearchData((prevData) => ({
      ...prevData,
      oneWay: e.target.checked,
      arrivalDate: e.target.checked ? "" : prevData.arrivalDate,
    }));
    setShowDate(!showDate);
  };

  //kalkış inputı alnından havaalanı kodunu vaya şehir adı üzerinde search etme alanı
  const handleAirportClick = (airportCode) => {
    setSearchData((prevData) => ({
      ...prevData,
      departureAirport: airportCode,
    }));
    setIsDepartureFilter(false);
    setShowFlight(false);
  };
  //varış inputı alnından havaalanı kodunu vaya şehir adı üzerinde search etme alanı
  const handleArrivalAirport = (airportCode) => {
    setSearchData((prevData) => ({
      ...prevData,
      arrivalAirport: airportCode,
    }));

    setIsArrivalFilter(false);
    setShowFlight(false);
  };

  /*kalkış havaalanı, dönüş havaalanına, kalkış tarihi, ve dönüş tarihine göre girilen verilerin kontrol alanı
  girilen veriler üzerinden istenilen  karşılanıyorsa filter işlemi gerçekleşecek eğer karşılanmıyosa hata mesajları gösterilecek
*/
  const handleSearch = () => {
    if (
      searchData.departureAirport === "" ||
      searchData.arrivalAirport === "" ||
      searchData.departureDate === "" ||
      searchData.arrivalDate === ""
    ) {
      setShowError({
        departureAirport: searchData.departureAirport === "",
        arrivalAirport: searchData.arrivalAirport === "",
        departureDate: searchData.departureDate === "",
        arrivalDate: searchData.arrivalDate === "",
      });
      if (!searchData.oneWay) {
        return showError;
      }
    } else {
      setShowError({
        departureAirport: false,
        arrivalAirport: false,
        departureDate: false,
        arrivalDate: false,
      });
    }
    const dateFilter = searchResult.filter((flight) => {
      const searchDateFilter = new Date(searchData.departureDate);
      const searchResultDate = new Date(flight.departureTime);
      const departureFilterDate =
        compareAsc(searchResultDate, searchDateFilter) === 0;

      const searchArrivalDate = new Date(searchData.arrivalDate);
      const searchResultArrivalDate = new Date(flight.arrivalTime);

      const arrivalFilterDate =
        compareAsc(searchResultArrivalDate, searchArrivalDate) === 0;
      if (!searchData.oneWay) {
        return arrivalFilterDate && departureFilterDate;
      } else {
        return departureFilterDate;
      }
    });
    setSearchResult(dateFilter);
    setShowFlight(true);
   
  };
  

  if (flightStatus === "failed") {
    return (
      <div>
        <Error message={error} />{" "}
      </div>
    );
  }
  return (
    <div className=" flex flex-col items-center content-center mt-10 ">
      <div className="shadow shadow-slate-400 rounded-lg w-[400px] md:w-[600px] lg:w-[800px] p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="relative z-20 w-full mb-6 group">
            <input
              type="text"
              name="departureAirport"
              id="departureAirport"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={searchData.departureAirport}
              onChange={handleChange}
            />

            {searchData.departureAirport && (
              <>
                {isDepartureFilter && (
                  <div className="w-full border  border-gray-300  font-semibold h-fit rounded-lg bg-gray-50  absolute">
                    {airline
                      .filter((item) => {
                        const filterCode =
                          item.code
                            .toLocaleLowerCase("TR")
                            .includes(
                              searchData.departureAirport.toLocaleLowerCase(
                                "TR"
                              )
                            ) ||
                          item.city
                            .toLocaleLowerCase("TR")
                            .includes(
                              searchData.departureAirport.toLocaleLowerCase(
                                "TR"
                              )
                            );

                        return filterCode;
                      })
                      .map((filteredItem) => (
                        <p
                          className="font-semibold  hover:bg-gray-300 hover:text-gray-50 cursor-pointer w-full p-0.5"
                          key={filteredItem.id}
                          onClick={() => handleAirportClick(filteredItem.code)}
                        >
                          {filteredItem.code} -{filteredItem.airline}
                        </p>
                      ))}
                  </div>
                )}
              </>
            )}
            <label
              htmlFor="departureAirport"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Departure Airport
            </label>
            {showError.departureAirport && (
              <div className="flex items-center justify-start space-x-2 w-full bg-red-500 p-1 m-1 rounded-sm ">
                <BsExclamationCircleFill className="text-gray-50 font-bold " />
                <p className="text-gray-50 text-sm">
                  The departure airport cannot be left blank.
                </p>
              </div>
            )}
          </div>
          <div className="relative z-20 w-full mb-6 group">
            <input
              type="text"
              name="arrivalAirport"
              id="arrivalAirport"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={searchData.arrivalAirport}
              onChange={handleChange}
            />

            {searchData.arrivalAirport && (
              <>
                {isArrivalFilter && (
                  <div className="w-full border  border-gray-300  font-semibold h-fit rounded-lg  bg-gray-50  absolute">
                    {airline
                      .filter((item) => {
                        const arrival =
                          item.code
                            .toLocaleLowerCase("TR")
                            .includes(
                              searchData.arrivalAirport.toLocaleLowerCase("TR")
                            ) ||
                          item.city
                            .toLocaleLowerCase("TR")
                            .includes(
                              searchData.arrivalAirport.toLocaleLowerCase("TR")
                            );

                        return arrival;
                      })
                      .map((filteredItem) => (
                        <p
                          className="font-semibold  hover:bg-gray-300  hover:text-gray-50  cursor-pointer w-full p-0.5"
                          key={filteredItem.id}
                          onClick={() =>
                            handleArrivalAirport(filteredItem.code)
                          }
                        >
                          {filteredItem.code} -{filteredItem.airline}
                        </p>
                      ))}
                  </div>
                )}
              </>
            )}
            <label
              htmlFor="arrivalAirport"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ArrivalAirport
            </label>
            {showError.arrivalAirport && (
              <div className="flex items-center justify-start space-x-2 w-full bg-red-500 p-1 m-1 rounded-sm ">
                <BsExclamationCircleFill className="text-gray-50 font-bold " />
                <p className="text-gray-50 text-sm">
                  The arrival airport cannot be left blank.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="departureDate"
              id="depratureDate"
              value={searchData.departureDate}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              min={isToday(new Date()) ? format(new Date(), "yyyy-MM-dd") : ""}
            />
            <label
              htmlFor="depreatureDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Deprature Date
            </label>

            {showError.departureDate && (
              <div className="flex items-center justify-start space-x-2 w-full bg-red-500 p-1 m-1 rounded-sm ">
                <BsExclamationCircleFill className="text-gray-50 font-bold " />
                <p className="text-gray-50 text-sm">
                  Departure date cannot be left blank
                </p>
              </div>
            )}
          </div>
          <div className="relative w-full mb-6 group">
            <input
              type="date"
              name="arrivalDate"
              id="arrivalDate"
              className="flex py-2.5 z-10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer 
              disabled:text-gray-300"
              value={searchData.arrivalDate}
              min={isToday(new Date()) ? format(new Date(), "yyyy-MM-dd") : ""}
              onChange={handleChange}
              disabled={searchData.oneWay}
            />
            <label
              htmlFor="arrivalDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Return Date
            </label>
            {showError.arrivalDate && (
              <>
                {searchData.oneWay || (
                  <div className="flex items-center justify-start space-x-2 w-full bg-red-500 p-1 m-1 rounded-sm ">
                    <BsExclamationCircleFill className="text-gray-50 font-bold " />
                    <p className="text-gray-50 text-sm">
                      Arrival date cannot be left blank
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center pl-4  rounded ">
          <input
            name="oneWay"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            id="oneWay"
            type="checkbox"
            checked={searchData.oneWay}
            onChange={handleOneWayChange}
          />
          <label
            htmlFor="oneWay"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
          >
            One Way Flight
          </label>
        </div>

        <button
          onClick={handleSearch}
          className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium
          text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600
          hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 "
        >
          <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Search Flight
          </span>
        </button>
      </div>

      <FlightSearchList
        flightStatus={flightStatus}
        showFlight={showFlight}
        searchResult={searchResult}
        flight={flight.slice().sort((a, b) => b.price - a.price)}
        setSearchResult={setSearchResult}
        showDate={showDate}
        setShowFlight={setShowFlight}
      />
    </div>
  );
}

export default FlightSearchForm;
