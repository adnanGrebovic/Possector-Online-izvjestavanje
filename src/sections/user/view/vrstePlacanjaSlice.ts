import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface VrstePlacanjaState{
    vrstePlacanja: UniverzalniItems|null;
    status: string;
}

const initialState: VrstePlacanjaState={
    vrstePlacanja: null,
    status:"idle"
}

export const fetchVrsteplacanjaAsync= createAsyncThunk<UniverzalniItems>(
    'vrstePlacanja/fetchVrstePlacanjaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.customers_sales(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const vrstePlacanjaSlice= createSlice({
    name: 'vrstePlacanja',
    initialState,
    reducers:{
        setVrstePlacanja:(state, action)=>{
            state.vrstePlacanja= action.payload;
        }
    }
})

export const{setVrstePlacanja}= vrstePlacanjaSlice.actions;