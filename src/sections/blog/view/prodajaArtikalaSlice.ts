import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { Items, UniverzalniItems } from "src/models/univerzalni";

interface ProdajaArtikalaState{
    prodajaArtikala: UniverzalniItems|null;
    loading: boolean;
}

const initialState: ProdajaArtikalaState={
    prodajaArtikala: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchProdajaArtikalaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
 'prodajaArtikala/fetchProdajaArtikalaAsync',
    async({from, to}, thunkAPI)=>{
        try { 
            const data: UniverzalniItems= await Agent.agent.articles_sales(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const prodajaArtikalaSlice= createSlice({
    name: 'prodajaArtikala',
    initialState,
    reducers:{
        
        },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchProdajaArtikalaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchProdajaArtikalaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.prodajaArtikala = action.payload;
                
            })
            .addCase(fetchProdajaArtikalaAsync.rejected, (state, _action) => {
                state.loading = false;
                
            });
    }
})

export default prodajaArtikalaSlice.reducer;