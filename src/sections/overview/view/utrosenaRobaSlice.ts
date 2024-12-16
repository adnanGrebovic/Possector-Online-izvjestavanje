import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { UniverzalniItems } from "src/models/univerzalni";

interface UtrosenaRobaState{
    utrosenaRoba: UniverzalniItems|null;
    loading: boolean;
}

const initialState: UtrosenaRobaState={
    utrosenaRoba: null,
    loading: false
}

interface FetchRacuniParams {
    from: string;
    to: string;
}

export const fetchUtrosenaRobaAsync= createAsyncThunk<UniverzalniItems, FetchRacuniParams>(
    'utrosenaRoba/fetchUtrosenaRobaAsync',
    async({from, to}, thunkAPI)=>{
        try {
            const data: UniverzalniItems= await Agent.agent.goods_spent(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const utrosenaRobaSlice= createSlice({
    name:'utrosenaRoba',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUtrosenaRobaAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchUtrosenaRobaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.utrosenaRoba = action.payload;

            })
            .addCase(fetchUtrosenaRobaAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default utrosenaRobaSlice.reducer;