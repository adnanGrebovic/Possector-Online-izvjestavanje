import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems2 } from "src/models/univerzalni2";

interface FinancijskoStanjeState{
    financijskoStanje: UniverzalniItems2|null;
    status: string;
}

const initialState: FinancijskoStanjeState={
    financijskoStanje: null,
    status: "idle"
}

export const fetchFinancijskoStanjeAsync= createAsyncThunk<UniverzalniItems2>(
    'financijskoStanje/fetchFinancijskoStanjeAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.invoices(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const financijskoStanjeSlice= createSlice({
    name: 'financijskoStanje',
    initialState,
    reducers:{
        setFinancijskoStanje:(state, action)=>{
            state.financijskoStanje= action.payload;
        }
    }
})

export const{setFinancijskoStanje}= financijskoStanjeSlice.actions;