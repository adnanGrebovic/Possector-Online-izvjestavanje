import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { ArtikliItems } from "src/models/artikli";

interface ArtikliState{
    artikli: ArtikliItems|null;
    status: string;
}

const initialState: ArtikliState={
    artikli: null,
    status:"idle"
}

export const fetchArtikliAsync= createAsyncThunk<ArtikliItems>(
    'artikli/fetchArtikliAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.goods_stock(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const artikliSlice= createSlice({
    name: 'artikli',
    initialState,
    reducers:{
        setArtikli:(state, action)=>{
            state.artikli= action.payload;
        }
    }
})

export const{setArtikli}= artikliSlice.actions;