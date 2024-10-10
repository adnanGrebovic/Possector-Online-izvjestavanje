import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface StanjeRobeState{
    stanjeRobe: UniverzalniItems|null;
    status: string;
}

const initialState: StanjeRobeState={
    stanjeRobe: null,
    status:"idle"
}

export const fetchStanjeRobeAsync= createAsyncThunk<UniverzalniItems>(
    'stanjeRobe/fetchStanjeRobeAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.tax_free(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const stanjeRobeSlice= createSlice({
    name:'stanjeRobe',
    initialState,
    reducers:{
        setStanjeRobe:(state, action)=>{
            state.stanjeRobe= action.payload;
        }
    }
})

export const{setStanjeRobe}= stanjeRobeSlice.actions;