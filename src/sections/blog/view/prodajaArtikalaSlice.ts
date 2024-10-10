import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface ProdajaArtikalaState{
    prodajaArtikala: UniverzalniItems|null;
    status: string;
}

const initialState: ProdajaArtikalaState={
    prodajaArtikala: null,
    status: "idle"
}

export const fetchProdajaArtikalaAsync= createAsyncThunk<UniverzalniItems>(
 'prodajaArtikala/fetchProdajaArtikalaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.taxes_total(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const prodajaArtikalaSlice= createSlice({
    name: 'prodajaArtikala',
    initialState,
    reducers:{
        setProdajaArtikala:(state, action)=>{
            state.prodajaArtikala= action.payload;
        }
    }
})

export const{setProdajaArtikala}= prodajaArtikalaSlice.actions;