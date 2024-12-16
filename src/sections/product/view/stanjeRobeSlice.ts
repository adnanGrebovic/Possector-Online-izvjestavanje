import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface StanjeRobeState{
    stanjeRobe: UniverzalniItems|null;
    loading: boolean;
}

const initialState: StanjeRobeState={
    stanjeRobe: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchStanjeRobeAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'stanjeRobe/fetchStanjeRobeAsync',
    async({from, to}, thunkAPI)=>{
        try {
            const data: UniverzalniItems= await Agent.agent.storage_report(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const stanjeRobeSlice= createSlice({
    name:'stanjeRobe',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStanjeRobeAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchStanjeRobeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.stanjeRobe = action.payload;

            })
            .addCase(fetchStanjeRobeAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default stanjeRobeSlice.reducer;