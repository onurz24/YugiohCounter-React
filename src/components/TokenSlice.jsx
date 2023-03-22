import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Token1: 0,
    Token2: 0,
    Token3: 0,
    Token4: 0
}

const TokenSlice = createSlice({
    name: "Tokens",
    initialState,
    reducers: {
        increment: (state, action) => {
            switch (action.payload) {
                case "TOKEN1":
                    state.Token1++;
                    return state;
                    break;
                case "TOKEN2":
                    state.Token2++;
                    return state;
                    break;
                case "TOKEN3":
                    state.Token3++;
                    return state;
                    break;
                case "TOKEN4":
                    state.Token4++;
                    return state;
                    break;
            }
        },
        decrement: (state, action) => {
            switch (action.payload) {
                case "TOKEN1":
                    state.Token1--;
                    return state;
                    break;
                case "TOKEN2":
                    state.Token2--;
                    return state;
                    break;
                case "TOKEN3":
                    state.Token3--;
                    return state;
                    break;
                case "TOKEN4":
                    state.Token4--;
                    return state;
                    break;
            }
        },
        ClearToken: state => {
            state = initialState;
            return state;
        }
    }
});


export const { increment, decrement, ClearToken } = TokenSlice.actions;
export default TokenSlice.reducer;

