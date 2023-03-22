import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './features/counter/counterSlice';
import PlayersReducer from './components/PlayersSlice';
import CalculatorReducer from './components/CalculatorSlice';
import TokenReducer from './components/TokenSlice';
import HistoryReducer from './components/HistorySlice';

export const store = configureStore({
  reducer: {
    Players : PlayersReducer,
    Calculator : CalculatorReducer,
    Tokens : TokenReducer,
    History : HistoryReducer
  },
});
