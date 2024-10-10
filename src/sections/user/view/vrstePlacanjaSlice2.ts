import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems2 } from "src/models/univerzalni2";

interface VrstePlacanjaState{
    vrstePlacanja: UniverzalniItems2|null;
    status: string;
}

const initialState: VrstePlacanjaState={
    vrstePlacanja: null,
    status:"idle"
}

export const fetchVrstePlacanjaAsync= createAsyncThunk<UniverzalniItems2>(
    'vrstePlacanja/fetchVrstePlacanjaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.payment_types(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const vrstePlacanjaSlice= createSlice({
    name:'vrstePlacanja',
    initialState,
    reducers:{
        setVrstePlacanja:(state, action)=>{
            state.vrstePlacanja= action.payload;
        }
    }
})

export const{setVrstePlacanja}= vrstePlacanjaSlice.actions;