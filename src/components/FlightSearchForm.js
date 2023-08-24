import React, { useEffect, useState } from "react";
import { compareAsc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/flightSlice";
import FlightSearchList from "./FlightSearchList";
import FlightFilter from "./FlightFilter";
function FlightSearchForm() {
  const [searchData, setSearchData] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    arrivalDate: "",
    oneWay: false,
  });
  
  

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
  }, [setSearchResult,  dispatch, flightStatus, flight ]);




  useEffect(() => {
    // Uygun uçuşları filtreleme
    const filteredFlights = flight.filter((flight) => {
      const departureMatch =
        flight.departureAirport
          .toLocaleLowerCase("TR")
          .includes(searchData.departureAirport.toLocaleLowerCase("TR")) ||
        flight.departureCity
          .toLocaleLowerCase("TR")
          .includes(searchData.departureAirport.toLocaleLowerCase("TR"));

      const arrivalMatch =
        flight.arrivalAirport
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
  
    const dateFilter = searchResult.filter((flight)=>{

    
    const searchDateFilter =  new Date(searchData.departureDate)
    const searchResultDate = new Date(flight.departureTime)
    
    
    const searchArrivalDate = new Date(searchData.arrivalDate)
    const searchResultArrivalDate = new Date(flight.arrivalTime)
    
    const departureFilterDate = compareAsc(
      searchResultDate,  searchDateFilter
    ) === 0
    
     const arrivalFilterDate =
       compareAsc(searchResultArrivalDate, searchArrivalDate) === 0;
    if(!searchData.oneWay){
    return departureFilterDate  &&  arrivalFilterDate   
    }else{
    return  arrivalFilterDate
    }

    })
    setSearchResult(dateFilter);
  };




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
        {showError.departureAirport && (
          <p className="error-message">Kalkış havaalanı boş bırakılamaz.</p>
        )}
      </div>
      <div className="form-group">
        <label>Varış Havaalanı</label>
        <input
          type="text"
          name="arrivalAirport"
          value={searchData.arrivalAirport}
          onChange={handleChange}
        />
        {showError.arrivalAirport && (
          <p className="error-message">Kalkış havaalanı boş bırakılamaz.</p>
        )}
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
   
      <FlightFilter searchResult={searchResult} setSearchResult={setSearchResult}/>
    
      <FlightSearchList flightStatus={flightStatus} searchResult={searchResult}/>
    </div>
  );
}

export default FlightSearchForm;
