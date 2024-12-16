import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatementSync } from "node:sqlite";
import Agent from "src/api/agent";
import { Racuni } from "src/models/racuni";
import { ResponseRacuna } from "src/models/serverResponse";

interface RacuniState {
    racuni: Racuni[] | null;
    loading: boolean;
    // page: number;
    // pageSize: number;
}

const initialState: RacuniState = {
    racuni: null,
    loading: false,
    // page: 1,
    // pageSize: 50,
}

interface FetchRacuniParams {
    from: string;
    to: string;
    // page: number;
    // pageSize: number;
}



export const fetchRacuniAsync = createAsyncThunk<Racuni[], FetchRacuniParams>(
    'racuni/fetchRacuniAsync',
    async ({ from, to }, thunkAPI) => {
        // const state= thunkAPI.getState() as {racuni: RacuniState};
        // const currentPage= state.racuni.page;
        // const currentPageSize= state.racuni.pageSize;
        // console.log("tttt", currentPageSize);
        // console.log("hello");
        try {
            const data: ResponseRacuna[] = await Agent.agent.invoices(from, to );
            const parsedData: Racuni[] = [];
            data.forEach((item, index) => {
                parsedData.push({
                    id: item.Id,
                    invoice_number: item.InvoiceNumber,
                    waiter_name: item.Waiter.Name,
                    payment_type: item.PaymentType.Name,
                    total: item.Total,
                    DateCreated: item.DateCreated,
                    tableItems: item.Items.map(artical => ({
                        articlename: artical.Article.Name,
                        price: artical.Price
                    })),

                })
            })
            return parsedData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }

)

export const racuniSlice = createSlice({
    name: 'racuni',
    initialState,
    reducers: {
        // setPage: (state, action: PayloadAction<number>)=>{
        //     state.page= action.payload;
        // },
        // setPageSize: (state, action: PayloadAction<number>)=>{
        //     state.pageSize= action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRacuniAsync.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(fetchRacuniAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.racuni = action.payload;

            })
            .addCase(fetchRacuniAsync.rejected, (state, _action) => {
                state.loading = false;

            });
    }
})

export default racuniSlice.reducer;
// export const {setPage, setPageSize}= racuniSlice.actions;