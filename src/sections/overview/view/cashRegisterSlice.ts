import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Agent from "src/api/agent";
import { CashRegister } from "src/models/CashRegister";

interface CashRegisterState {
    cashRegister: CashRegister[] | null;
    loading: boolean;
}

const initialState: CashRegisterState = {
    cashRegister: null,
    loading: false,
}


interface FetchRacuniParams {
    from: Date | string;
    to: Date | string;
}

export const fetchCashRegisterAsync = createAsyncThunk<CashRegister[], FetchRacuniParams>(
    'cashRegister/fetchCashRegisterAsync',
    async ({ from, to }, thunkAPI) => {
        try {
            const data: CashRegister[] = await Agent.agent.cash_register(from, to);
            console.log("data", data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const cashRegisterSlice = createSlice({
    name: 'cashRegister',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCashRegisterAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchCashRegisterAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cashRegister = action.payload;

            })
            .addCase(fetchCashRegisterAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default cashRegisterSlice.reducer;