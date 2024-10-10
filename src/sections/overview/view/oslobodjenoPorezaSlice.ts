import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface OslobodjenoPorezaState{
    oslobodjenoPoreza: UniverzalniItems|null;
    status: string;
}

const initialState: OslobodjenoPorezaState={
    oslobodjenoPoreza: null,
    status:"idle"
}

export const fetchOslobodjenoPorezaAsync= createAsyncThunk<UniverzalniItems>(
    'oslobodjenoPoreza/fetchOslobodjenoPorezaAsync',
    async(_, thunkAPI)=>{
       try {
        return await Agent.reports.invoices(new Date(), new Date());
       } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
       } 
    }
)

export const oslobodjenoPorezaSlice= createSlice({
    name: 'oslobodjenoPoreza',
    initialState,
    reducers:{
        setOslobodjenoPoreza:(state, action)=>{
            state.oslobodjenoPoreza= action.payload;
        }
    }
})

export const{setOslobodjenoPoreza}= oslobodjenoPorezaSlice.actions;