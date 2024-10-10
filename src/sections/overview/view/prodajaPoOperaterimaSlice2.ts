import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems2 } from "src/models/univerzalni2";

interface ProdajaPoOperaterimaState{
    prodajaPoOperaterima: UniverzalniItems2|null;
    status: string;
}

const initialState: ProdajaPoOperaterimaState={
    prodajaPoOperaterima: null,
    status: "idle"
}

export const fetchProdajaPoOperaterimaAsync= createAsyncThunk<UniverzalniItems2>(
    'prodajaPoOperaterima/fetchProdajaPoOperaterimaAsync',
    async(_, thunkAPI)=>{

        try {
            return await Agent.reports.waiters_sales(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const prodajaPoOperaterimaSlice= createSlice({
    name: 'prodajaPoOperaterima',
    initialState,
    reducers:{
        setProdajaPoOperaterima: (state, action)=>{
            state.prodajaPoOperaterima= action.payload;
        }
    }
})

export const{setProdajaPoOperaterima}= prodajaPoOperaterimaSlice.actions;