import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { StoloviItems } from "src/models/stolovi";

interface StoloviState{
    stolovi: StoloviItems| null;
    status: string;
}

const initialState: StoloviState={
    stolovi: null,
    status: "idle"
}

export const fetchStoloviAsync= createAsyncThunk<StoloviItems>(
    'stolovi/fetchStoloviAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.articles_sales(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const stoloviSlice= createSlice({
    name: 'stolovi',
    initialState,
    reducers:{
        setStolovi:(state, action)=>{
            state.stolovi=action.payload;
        }
    }
})

export const{setStolovi}= stoloviSlice.actions;