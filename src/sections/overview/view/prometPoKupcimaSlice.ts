import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface PrometPoKupcimaState{
    prometPoKupcima: UniverzalniItems|null;
    status: string;
}

const initialState: PrometPoKupcimaState={
    prometPoKupcima: null,
    status:"idle"
}

export const fetchPrometPoKupcimaAsync= createAsyncThunk<UniverzalniItems>(
    'prometPoKupcima/fetchPrometPoKupcimaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.goods_stock(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const prometPoKupcimaSlice= createSlice({
    name: 'prometPoKupcima',
    initialState,
    reducers:{
        setPrometPoKupcima:(state, action)=>{
            state.prometPoKupcima= action.payload;
        }
    }
})

export const{setPrometPoKupcima}= prometPoKupcimaSlice.actions;