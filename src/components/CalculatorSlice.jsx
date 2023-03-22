import { createSlice } from "@reduxjs/toolkit";
import React from "react";
const initialState = "";

export const CalculatorSlice = createSlice({
    name: "Calculator",
    initialState,
    reducers: {
        AddToCalculator: (state, action) => {
            if (state == "" && action.payload.startsWith("0")) {
                if (state.split(0, 1) == "") {
                    return state
                } else {
                    return state + action.payload;
                }
            } else { return state + action.payload; }
        },
        DeleteLast: (state, action) => {
            return state.slice(0, -1);
        },
        DeleteAll: (state, action) => {
            return initialState;
        }
    }
})

export default CalculatorSlice.reducer;
export const {
    AddToCalculator,
    DeleteLast,
    DeleteAll
} = CalculatorSlice.actions;