import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems2 } from "src/models/univerzalni2";

interface UtrosenaRobaState{
    utrosenaRoba: UniverzalniItems2|null;
    status: string;
}

const initialState: UtrosenaRobaState={
    utrosenaRoba: null,
    status:"idle"
}

export const fetchUtrosenaRobaAsync= createAsyncThunk<UniverzalniItems2>(
    'utrosenaRoba/fetchUtrosenaRobaAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.reports.goods_spent(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const utrosenaRobaSlice= createSlice({
    name: 'utrosenaRoba',
    initialState,
    reducers:{
        setUtrosenaRoba: (state, action)=>{
            state.utrosenaRoba= action.payload;
        }
    }
})

export const{setUtrosenaRoba}= utrosenaRobaSlice.actions;