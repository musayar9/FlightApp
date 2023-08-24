import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios"
export const fetchFlights = createAsyncThunk('flight/fetchFlight', async()=>{
try{
const response = await axios.get(`http://localhost:3001/flights`);
const data = response.data
return data
}catch (err){
    console.log(err);
}


})

const flightSlice = createSlice({
name:'flights',
initialState:{
    flight:[],
    flightStatus:'idle',
    error:null
},


reducers:{
},
extraReducers:(builder)=>{
    
    //pending
    
    builder.addCase(fetchFlights.pending, (state, action)=>{
        state.flightStatus = 'laoding'
    })
    
    builder.addCase(fetchFlights.fulfilled, (state, action)=>{
          state.flightStatus = "succeded";
        state.flight = action.payload
  
    })
    
    builder.addCase(fetchFlights.rejected, (state, action)=>{
        state.flightStatus="failed"
        state.error = action.error.message
    })
}

})

// export const {} = flightSlice.actions;

export default flightSlice.reducer