import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    P1: {
        health: 8000,
        name: "Spieler 1"
    },
    P2: {
        health: 8000,
        name: "Spieler 2"
    }
}


export const PlayersSlice = createSlice({
    name: "Players",
    initialState,
    reducers: {
        ByAmount: (state, action) => {
            if (action.payload.howmuch !== "" && action.payload.howmuch !== 0) {
                switch (action.payload.negative) {
                    case false:
                        switch (action.payload.who) {
                            case "P1":
                                state.P1.health += action.payload.howmuch;
                                return state;
                                break;
                            case "P2":
                                state.P2.health += action.payload.howmuch;
                                return state;
                                break;
                        }
                        break;
                    case true:
                        switch (action.payload.who) {
                            case "P1":
                                state.P1.health -= action.payload.howmuch;
                                return state;
                                break;
                            case "P2":
                                state.P2.health -= action.payload.howmuch;
                                return state;
                                break;
                        }
                        break;
                }
            }
        },
        ResetPlayers: state => {
            state = initialState;
            return state;
        }
    }
})

export const { ByAmount, ResetPlayers } = PlayersSlice.actions;
export default PlayersSlice.reducer;