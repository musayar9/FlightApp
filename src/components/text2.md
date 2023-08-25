<ul className="p-4 m-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {flightStatus === "loading" && <Loading />}
        {flightStatus === "succeded"  ? (
          <>
            {showFlight
              ? searchResult.length> 0 ?
              searchResult.map((flight) => (
                  <li
                    key={flight.id}
                    className="flex  items-center justify-center border border-gray-300 rounded-lg p-8 m-2"
                  >
                    <div className="flex flex-col w-96 justify-around  ">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex items-start justify-start pl-4">
                          <MdOutlineAirlines
                            size={24}
                            className="text-blue-600"
                          />
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
                            <FaPlaneDeparture
                              size={24}
                              className="text-blue-600"
                            />
                            <span>
                              ( {flight.departureAirportCode}) -{" "}
                              {flight.departureCity}
                            </span>{" "}
                            : <span>{flight.departureHour}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <FaPlaneArrival
                              size={24}
                              className="text-blue-600"
                            />
                            <span>
                              ({flight.arrivalAirportCode}) -{" "}
                              {flight.arrivalCity}
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
                )) : (<p>VERİ bULUNMADI</p>)
              : 
              flight.length>0?
              flight.map((flight) => (
                  <li
                    key={flight.id}
                    className="flex  items-center justify-center border border-gray-300 rounded-lg p-8 m-2"
                  >
                    <div className="flex flex-col w-96 justify-around  ">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex items-start justify-start pl-4">
                          <MdOutlineAirlines
                            size={24}
                            className="text-blue-600"
                          />
                          <h2 className="font-bold ">{flight.airline}</h2>
                        </div>
                        <div>
                          <p className="flex">
                            <FaPlaneDeparture className="text-blue-700" />
                            <span className="font-semibold underline">
                              {fortmatDate(flight.departureTime)}
                            </span>
                          </p>
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
                            <FaPlaneDeparture
                              size={24}
                              className="text-blue-600"
                            />
                            <span>
                              ( {flight.departureAirportCode}) -{" "}
                              {flight.departureCity}
                            </span>{" "}
                            : <span>{flight.departureHour}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <FaPlaneArrival
                              size={24}
                              className="text-blue-600"
                            />
                            <span>
                              ({flight.arrivalAirportCode}) -{" "}
                              {flight.arrivalCity}
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
                )) : <p>veri bulunamaı</p>}
          </>
        ) : (
     <p></p>
        )}
      </ul>