import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { RacuniItems } from "src/models/racuni";

interface RacuniState{
    racuni: RacuniItems|null;
    status: string;
}

const initialState: RacuniState={
    racuni: null,
    status:"idle"
}

export const fetchRacuniAsync= createAsyncThunk<RacuniItems>(
    'racuni/fetchRacuniAsync',
    async(_,thunkAPI)=>{
        try {
            return await Agent.reports.waiters_sales(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }

)

export const racuniSlice= createSlice({
    name: 'racuni',
    initialState,
    reducers:{
        setRacuni:(state, action)=>{
            state.racuni=action.payload;
        }
    }
})

export const{setRacuni}= racuniSlice.actions;