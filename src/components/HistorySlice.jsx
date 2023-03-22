import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Player1: [],
    Player2: [],
    All: []
}

const HistorySlice = createSlice({
    name: "History",
    initialState,
    reducers: {
        AddHistory: (state, action) => {
            switch (action.payload.who) {
                case "P1":
                    state.Player1.push(action.payload.message);
                    state.All.push(action.payload.message);
                    return state;
                    break;
                case "P2":
                    state.Player2.push(action.payload.message);
                    state.All.push(action.payload.message);
                    return state;
                    break;
                case "All":
                    state.All.push(action.payload.message);
                    return state;
                    break;
            }
        },
        ClearHistory: (state, action) => {
            state = initialState;
            return state;
        }
    }
});

export const { AddHistory, ClearHistory } = HistorySlice.actions;
export default HistorySlice.reducer;
