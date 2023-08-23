import React, { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights, setFlights } from "../redux/flightSlice";
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
  console.log("search.Dar", searchData.departureDate);

  const fortmatDate = (time) => {
    const newDate = time.split("-");
    console.log("newDate", newDate[2]);
    
    const newDateValue = newDate.reverse().join("/");

    return newDateValue;
  };
  console.log("searchData", searchData);

const handleSortByDepartureTime = () => {
  const sortedFlights = [...searchResult].sort((a, b) =>
    compareAsc(new Date(a.departureTime), new Date(b.departureTime))
  );
  setSearchResult(sortedFlights);
};

const handleSortPirce = () => {
  const sortPrice = [...searchResult].sort((a, b) =>
    (b.price-a.price)
  );
  setSearchResult(sortPrice);
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
      <div className="form-group">
        <button onClick={handleSortByDepartureTime}>
          Kalkış Zamanına Göre Sırala
        </button>
      </div>

      <div className="form-group">
        <button onClick={handleSortPirce}>
          fiyata göre sırala
        </button>
      </div>
      <div>
        <div className="search-results">
          <></>

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
    </div>
  );
}

export default FlightSearchForm;
