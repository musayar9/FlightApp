import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights, setFlights } from "../redux/flightSlice";
function FlightSearchForm() {
  const [searchData, setSearchData] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureCity: "",
    arrivalCity:"",
    departureDate: "",
    arrivalDate: "",
    oneWay: false,
  });

  const dispatch = useDispatch();
  const { flight, flightStatus, error } = useSelector((state) => state.flights);
  const [searchResult, setSearchResult] = useState();
  useEffect(() => {
    if (flightStatus === "idle") {
      dispatch(fetchFlights());

      setSearchResult(flight);
    }
  }, [setFlights, dispatch]);

  console.log("searchResult", searchResult);

  // const handleDepartureAirportChange = (e) => {
  //   const filteredResults = flight.filter(
  //     (flight) =>
  //       flight.departureCity
  //         .toString()
  //         .toLocaleLowerCase("TR")
  //         .includes(e.target.value.toString().toLocaleLowerCase("TR")) ||
  //       flight.departureCity
  //         .toString()
  //         .toLocaleLowerCase("TR")
  //         .includes(e.target.value.toString().toLocaleLowerCase("TR"))
  //   );
  //   setSearchData((prevData) => ({
  //     ...prevData,
  //     departureAirport: e.target.value,
  //   }));
  //   setSearchResult(filteredResults);
  // };

  // const handleArrivalAirportChange = (e) => {
  //   const filteredResults = flight.filter(
  //     (flight) =>
  //       flight.arrivalCity
  //         .toString()
  //         .toLocaleLowerCase("TR")
  //         .includes(e.target.value.toString().toLocaleLowerCase("TR")) ||
  //       flight.arrivalCity
  //         .toString()
  //         .toLocaleLowerCase("TR")
  //         .includes(e.target.value.toString().toLocaleLowerCase("TR"))
  //   );
  //   setSearchData((prevData) => ({
  //     ...prevData,
  //     arrivalAirport: e.target.value,
  //   }));
  //   setSearchResult(filteredResults);
  // };
  useEffect(() => {
    // Uygun uçuşları filtreleme
    const filteredFlights = flight.filter((flight) => {
      const departureMatch =
        flight.departureAirport
          .toLocaleLowerCase("TR").includes(
            searchData.departureAirport.toLocaleLowerCase("TR")
          ) ||
            flight.departureCity
             .toLocaleLowerCase("TR").includes(
               searchData.departureAirport.toLocaleLowerCase("TR")
             );

      const arrivalMatch =
        flight.arrivalAirport
          .toLocaleLowerCase("TR").includes(
            searchData.arrivalAirport.toLocaleLowerCase("TR")
          ) || flight.arrivalCity
              .toLocaleLowerCase("TR").includes(
                searchData.arrivalAirport.toLocaleLowerCase("TR")
              );

      return departureMatch && arrivalMatch;
    });

    setSearchResult(filteredFlights);
  }, [searchData, flight]);
  console.log("flightts", flight);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOneWayChange = (e) => {
    setSearchData((prevData) => ({
      ...prevData,
      oneWay: e.target.checked,
      arrivalDate: e.target.checked ? "" : prevData.arrivalDate,
    }));
  };
  const handleSearch = () => {
    setSearchResult(searchResult);
  };

  //searchResult sorted by price

  // const sortPrice = searchResult.slice().sort((a,b)=>b.price-a.price)
  // console.log("sortPrice", sortPrice);

  return (
    <div className="flight-search-form">
      <h2>Uçuş Arama</h2>
      <div className="form-group">
        <label>Kalkış Havaalanı</label>
        <input
          type="text"
          name="departureAirport"
          value={searchData.departureAirport}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Varış Havaalanı</label>
        <input
          type="text"
          name="arrivalAirport"
          value={searchData.arrivalAirport}
           onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Kalkış Tarihi</label>
        <input
          type="date"
          name="departureDate"
          value={searchData.departureDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Varış Tarihi</label>
        <input
          type="date"
          name="arrivalDate"
          value={searchData.arrivalDate}
          onChange={handleChange}
          disabled={searchData.oneWay}
        />
      </div>
      <div className="form-group">
        <label>Tek Yönlü Uçuş</label>
        <input
          type="checkbox"
          name="oneWay"
          checked={searchData.oneWay}
          onChange={handleOneWayChange}
        />
      </div>
      <div className="form-group">
        <button onClick={handleSearch}>Uçuşları Ara</button>
      </div>

      <div>
        <div className="search-results">
          <></>

          {flightStatus === "succeded" &&
            searchResult.length > 0 ? (
                <>
                  {searchResult
                    .sort((a, b) => b.price - a.price)
                    .map((flight) => (
                      <div key={flight.id} className="flight-result">
                        <p>Kalkılan havalimanı: {flight.departureAirport}</p>
                        <p>inilen havalimanı: {flight.arrivalAirport}</p>
                        <p>Kalkış: {flight.departureCity}</p>
                        <p>Varış: {flight.arrivalCity}</p>
                        {/* <p>Pirce: {flight.price}</p> */}
                        {/* Diğer bilgiler */}
                      </div>
                    ))}
                </>
              ): <p>Uçuş Bulunamadı</p>
              }
        </div>
      </div>
    </div>
  );
}

export default FlightSearchForm;
