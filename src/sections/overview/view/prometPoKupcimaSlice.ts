import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface PrometPoKupcimaState{
    prometPoKupcima: UniverzalniItems|null;
    loading: boolean;
}

const initialState: PrometPoKupcimaState={
    prometPoKupcima: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchPrometPoKupcimaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'prometPoKupcima/fetchPrometPoKupcimaAsync',
    async({from, to}, thunkAPI)=>{
        try {
            const data: UniverzalniItems= await Agent.agent.customers_sales(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const prometPoKupcimaSlice= createSlice({
    name: 'prometPoKupcima',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrometPoKupcimaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchPrometPoKupcimaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.prometPoKupcima = action.payload;

            })
            .addCase(fetchPrometPoKupcimaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default prometPoKupcimaSlice.reducer;