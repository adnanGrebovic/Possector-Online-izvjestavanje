import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface PoreziPoGrupamaState{
    poreziPoGrupama: UniverzalniItems|null;
    status: string;
}

const initialState: PoreziPoGrupamaState={
    poreziPoGrupama: null,
    status:"idle"
}

export const fetchPoreziPoGrupamaAsync= createAsyncThunk<UniverzalniItems>(
    'poreziPoGrupama/fetchPoreziPoGrupamaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.payment_types(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }

)

export const poreziPoGrupamaSlice= createSlice({
    name: 'poreziPoGrupama',
    initialState,
    reducers:{
        setPoreziPoGrupama:(state, action)=>{
            state.poreziPoGrupama= action.payload;
        }
    }
})

export const{setPoreziPoGrupama}= poreziPoGrupamaSlice.actions;