import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface OslobodjenoPorezaState{
    oslobodjenoPoreza: UniverzalniItems|null;
    loading: boolean;
}

const initialState: OslobodjenoPorezaState={
    oslobodjenoPoreza: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchOslobodjenoPorezaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'oslobodjenoPoreza/fetchOslobodjenoPorezaAsync',
    async({from, to}, thunkAPI)=>{
       try {
        const data: UniverzalniItems= await Agent.agent.tax_free(from, to);
        return data;
       } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
       } 
    }
)

export const oslobodjenoPorezaSlice= createSlice({
    name: 'oslobodjenoPoreza',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOslobodjenoPorezaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchOslobodjenoPorezaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.oslobodjenoPoreza = action.payload;

            })
            .addCase(fetchOslobodjenoPorezaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default oslobodjenoPorezaSlice.reducer;