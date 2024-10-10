import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface ProdajaArtikalaPoOperaterimaState{
    prodajaArtikalaPoOperaterima: UniverzalniItems|null;
    status: string;
}

const initialState: ProdajaArtikalaPoOperaterimaState={
    prodajaArtikalaPoOperaterima: null,
    status:"idle"
}

export const fetchProdajaArtikalaPoOperaterimaAsync= createAsyncThunk<UniverzalniItems>(
    'prodajaArtikalaPoOperaterima/fetchProdajaArtikalaPoOperaterimaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.invoices_num(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const prodajaArtikalaPoOperaterimaSlice= createSlice({
    name:'prodajaArtikalaPoOperaterima',
    initialState,
    reducers:{
        setProdajaArtikalaPoOperaterima:(state, action)=>{
            state.prodajaArtikalaPoOperaterima= action.payload;
        }
    }
})

export const{setProdajaArtikalaPoOperaterima}= prodajaArtikalaPoOperaterimaSlice.actions;