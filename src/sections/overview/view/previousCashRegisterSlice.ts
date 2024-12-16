import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { CashRegister } from "src/models/CashRegister";

interface PreviousCashRegisterState {
    previousCashRegister: CashRegister[] | null;
    prevLoading: boolean;
}

const initialState: PreviousCashRegisterState = {
    previousCashRegister: null,
    prevLoading: false,
}


interface FetchRacuniParams {
    from: Date | string;
    to: Date | string;
}

export const fetchPreviousCashRegisterAsync = createAsyncThunk<CashRegister[], FetchRacuniParams>(
    'previousCashRegister/fetchPreviousCashRegisterAsync',
    async ({ from, to }, thunkAPI) => {
        try {
            
            const data: CashRegister[] = await Agent.agent.previous_cash_register(from, to);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const previousCashRegisterSlice = createSlice({
    name: 'previousCashRegister',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPreviousCashRegisterAsync.pending, (state) => {
                if (!state.prevLoading) {
                    state.prevLoading = true;
                }
            })
            .addCase(fetchPreviousCashRegisterAsync.fulfilled, (state, action) => {
                state.prevLoading = false;
                state.previousCashRegister = action.payload;

            })
            .addCase(fetchPreviousCashRegisterAsync.rejected, (state, _action) => {
                state.prevLoading = false;

            });
    }
})

export default previousCashRegisterSlice.reducer;