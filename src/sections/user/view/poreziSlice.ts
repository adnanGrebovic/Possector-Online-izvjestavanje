import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface PoreziState{
    porezi: UniverzalniItems|null;
    status: string;
}

const initialState: PoreziState={
    porezi: null,
    status: "idle"
}

export const fetchPoreziAsync= createAsyncThunk<UniverzalniItems>(
    'porezi/fetchporeziAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.goods_spent(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const poreziSlice= createSlice({
    name: 'porezi',
    initialState,
    reducers:{
        setPorezi:(state, action)=>{
            state.porezi= action.payload;
        }
    }
})

export const {setPorezi}= poreziSlice.actions;