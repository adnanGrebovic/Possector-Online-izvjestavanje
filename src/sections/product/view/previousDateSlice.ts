import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 interface FormValues {
    previousDateRange: [string | null, string | null];
}

const initialState: FormValues = {
    previousDateRange: [null, null],
}



export const previousDateSlice = createSlice({
    name: 'previousDate',
    initialState,
    reducers: {
        setPreviousDateRange: (state, action: PayloadAction<{ dateRange: [string | null, string | null] }>) => {
            state.previousDateRange= action.payload.dateRange;
        },
    },
});

export const { setPreviousDateRange } = previousDateSlice.actions;
