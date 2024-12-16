import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 interface FormValues {
    dateRange: [string | null, string | null];
}

const initialState: FormValues = {
    dateRange: [null, null],
}



export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDateRange: (state, action: PayloadAction<{ dateRange: [string | null, string | null] }>) => {
            state.dateRange= action.payload.dateRange;
        },
    },
});

export const { setDateRange } = dateSlice.actions;
