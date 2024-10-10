import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface UtrosenaRobaState{
    utrosenaRoba: UniverzalniItems|null;
    status: string;
}

const initialState: UtrosenaRobaState={
    utrosenaRoba: null,
    status: "idle"
}

export const fetchUtrosenaRobaAsync= createAsyncThunk<UniverzalniItems>(
    'utrosenaRoba/fetchUtrosenaRobaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.waiters_articles_sales(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const utrosenaRobaSlice= createSlice({
    name:'utrosenaRoba',
    initialState,
    reducers:{
        setUtrosenaRoba:(state, action)=>{
            state.utrosenaRoba= action.payload;
        }
    }
})

export const{setUtrosenaRoba}= utrosenaRobaSlice.actions;