import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchFlights = createAsyncThunk("flight/fetchFlight", async () => {
  try {
    const response = await axios.get(
      `https://64e8e62899cf45b15fe04d39.mockapi.io/api/v1/flights/flight_info`
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchAirline = createAsyncThunk(
  "flight/fetchAirline",
  async () => {
    try {
      const response = await axios.get(
        `https://64e8e62899cf45b15fe04d39.mockapi.io/api/v1/flights/flight_code`
      );
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    flight: [],
    flightStatus: "idle",
    error: null,
    airline: [],
    airlineStatus: "idle",
  },

  reducers: {},
  extraReducers: (builder) => {
    //pending

    builder.addCase(fetchFlights.pending, (state, action) => {
      state.flightStatus = "loading";
    });

    builder.addCase(fetchFlights.fulfilled, (state, action) => {
      state.flightStatus = "succeded";
      state.flight = action.payload;
    });

    builder.addCase(fetchFlights.rejected, (state, action) => {
      state.flightStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchAirline.pending, (state, action) => {
      state.airlineStatus = "loading";
    });

    builder.addCase(fetchAirline.fulfilled, (state, action) => {
      state.airlineStatus = "succeded";
      state.airline = action.payload;
    });

    builder.addCase(fetchAirline.rejected, (state, action) => {
      state.airlineStatus = "failed";
      state.error = action.error.message;
    });
  },
});

// export const {} = flightSlice.actions;

export default flightSlice.reducer;
