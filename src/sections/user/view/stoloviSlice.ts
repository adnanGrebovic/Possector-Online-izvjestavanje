import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { Stolovi } from "src/models/stolovi";

interface StoloviState{
    stolovi: Stolovi| null;
    loading: boolean;
}

const initialState: StoloviState={
    stolovi: null,
    loading: false
}

export const fetchStoloviAsync= createAsyncThunk<Stolovi>(
    'stolovi/fetchStoloviAsync',
    async(_, thunkAPI)=>{
        try {
            return await Agent.agent.invoices(new Date(), new Date());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const stoloviSlice= createSlice({
    name: 'stolovi',
    initialState,
    reducers:{
        setStolovi:(state, action)=>{
            state.stolovi=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoloviAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchStoloviAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.stolovi = action.payload;
                
            })
            .addCase(fetchStoloviAsync.rejected, (state, _action) => {
                state.loading = false;
                
            });
    }
})

export const{setStolovi}= stoloviSlice.actions;
export default stoloviSlice.reducer;