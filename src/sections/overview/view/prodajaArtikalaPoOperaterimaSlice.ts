import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface ProdajaArtikalaPoOperaterimaState{
    prodajaArtikalaPoOperaterima: UniverzalniItems|null;
    loading: boolean;
}

const initialState: ProdajaArtikalaPoOperaterimaState={
    prodajaArtikalaPoOperaterima: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchProdajaArtikalaPoOperaterimaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'prodajaArtikalaPoOperaterima/fetchProdajaArtikalaPoOperaterimaAsync',
    async({from, to}, thunkAPI)=>{
        try {
            const data: UniverzalniItems= await Agent.agent.waiters_articles_sales(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const prodajaArtikalaPoOperaterimaSlice= createSlice({
    name:'prodajaArtikalaPoOperaterima',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProdajaArtikalaPoOperaterimaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchProdajaArtikalaPoOperaterimaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.prodajaArtikalaPoOperaterima = action.payload;

            })
            .addCase(fetchProdajaArtikalaPoOperaterimaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default prodajaArtikalaPoOperaterimaSlice.reducer;