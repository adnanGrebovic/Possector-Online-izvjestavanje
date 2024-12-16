import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface PoreziState {
    porezi: UniverzalniItems | null;
    loading: boolean;
}

const initialState: PoreziState = {
    porezi: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchPoreziAsync = createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'porezi/fetchporeziAsync',
    async ({from, to}, thunkAPI) => {
        try {
            const data: UniverzalniItems= await Agent.agent.taxes_total(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const poreziSlice = createSlice({
    name: 'porezi',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoreziAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchPoreziAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.porezi = action.payload;

            })
            .addCase(fetchPoreziAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default poreziSlice.reducer;