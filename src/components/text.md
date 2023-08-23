import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights, setFlights } from "../redux/flightSlice";
function FlightSearchForm() {
  const [searchData, setSearchData] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureCity:"",
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
      
      setSearchResult(flight)
    }
  }, [setFlights, dispatch]);

  console.log("searchResult", searchResult);

  const handleDepartureAirportChange = (e) => {
    const filteredResults = flight.filter(
      (flight) =>
        flight.departureAirport
          .toString()
          .toLocaleLowerCase("TR")
          .includes(e.target.value.toString().toLocaleLowerCase("TR")) ||
        flight.departureAirport
          .toString()
          .toLocaleLowerCase("TR")
          .includes(e.target.value.toString().toLocaleLowerCase("TR"))
    );
    setSearchData((prevData) => ({
      ...prevData,
      departureAirport: e.target.value,
    }));
    setSearchResult(filteredResults);
  };
  
  const handleArrivalAirportChange = (e) => {
    const filteredResults = flight.filter(
      (flight) =>
        flight.arrivalAirport
          .toString()
          .toLocaleLowerCase("TR")
          .includes(e.target.value.toString().toLocaleLowerCase("TR")) ||
        flight.arrivalAirport
          .toString()
          .toLocaleLowerCase("TR")
          .includes(e.target.value.toString().toLocaleLowerCase("TR"))
    );
    setSearchData((prevData) => ({
      ...prevData,
      arrivalAirport: e.target.value,
    }));
    setSearchResult(filteredResults);
  };

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
        <select
          name="departureAirport"
          value={searchData.departureAirport}
          onChange={handleDepartureAirportChange}
        >
          <option value="">Kalkış Havaalanı Seçin</option>
          {flight.code.map((item) => (
            <option key={item.id} value={item.departureAirport}>
              {item.departureCity} - {item.departureAirport}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Varış Havaalanı</label>
        <select
          name="departureAirport"
          value={searchData.departureAirport}
          onChange={handleDepartureAirportChange}
        >
          <option value="">Kalkış Havaalanı Seçin</option>
          {flight.map((item) => (
            <option key={item.id} value={item.departureAirport}>
              {item.departureCity} - {item.departureAirport}
            </option>
          ))}
        </select>
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
          <>
            {/* <ul>
              {flight.map((item)=>
              
                <li key={item.id}>
                  <p>Kalkış: {item.departureCity}</p>
                  <p>Varış: {item.arrivalCity}</p>
                </li>
              )}
              
            </ul>
           */}
          </>

          {flightStatus === "succeded" && (
            <>
              {searchResult.map((flight) => (
                <div key={flight.id} className="flight-result">
                  <p>Kalkış: {flight.departureCity}</p>
                  <p>Varış: {flight.arrivalCity}</p>
                  {/* Diğer bilgiler */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightSearchForm;
