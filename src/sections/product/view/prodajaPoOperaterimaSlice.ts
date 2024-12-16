import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { Items, UniverzalniItems } from "src/models/univerzalni";

interface ProdajaPoOperaterimaState {
    prodajaPoOperaterima: UniverzalniItems | null;
    loading: boolean;
}

const initialState: ProdajaPoOperaterimaState = {
    prodajaPoOperaterima: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchProdajaPoOperaterimaAsync = createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'prodajaPoOperaterima/fetchProdajaPoOperaterimaAsync',
    async ({from, to}, thunkAPI) => {
        try {
            const data: UniverzalniItems= await Agent.agent.waiters_sales(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const prodajaPoOperaterimaSlice = createSlice({
    name: 'prodajaPoOperaterima',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProdajaPoOperaterimaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchProdajaPoOperaterimaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.prodajaPoOperaterima = action.payload;

            })
            .addCase(fetchProdajaPoOperaterimaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default prodajaPoOperaterimaSlice.reducer;