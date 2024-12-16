import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface VrstePlacanjaState{
    vrstePlacanja: UniverzalniItems|null;
    loading: boolean;
}

const initialState: VrstePlacanjaState={
    vrstePlacanja: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchVrsteplacanjaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'vrstePlacanja/fetchVrstePlacanjaAsync',
    async({from, to}, thunkAPI)=>{
        try {
            const data: UniverzalniItems= await Agent.agent.payment_types(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const vrstePlacanjaSlice= createSlice({
    name: 'vrstePlacanja',
    initialState,
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVrsteplacanjaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchVrsteplacanjaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.vrstePlacanja = action.payload;

            })
            .addCase(fetchVrsteplacanjaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default vrstePlacanjaSlice.reducer;