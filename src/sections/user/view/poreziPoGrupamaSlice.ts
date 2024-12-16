import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface PoreziPoGrupamaState{
    poreziPoGrupama: UniverzalniItems|null;
    loading: boolean;
}

const initialState: PoreziPoGrupamaState={
    poreziPoGrupama: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchPoreziPoGrupamaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'poreziPoGrupama/fetchPoreziPoGrupamaAsync',
    async({from, to}, thunkAPI)=>{
        try {
            const data: UniverzalniItems= await Agent.agent.taxes_tags(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }

)

export const poreziPoGrupamaSlice= createSlice({
    name: 'poreziPoGrupama',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoreziPoGrupamaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchPoreziPoGrupamaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.poreziPoGrupama = action.payload;

            })
            .addCase(fetchPoreziPoGrupamaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default poreziPoGrupamaSlice.reducer; 