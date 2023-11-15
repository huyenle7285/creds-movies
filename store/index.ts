import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as reduxUseDispatch } from 'react-redux';

import movieReducer from './movie';

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export const useDispatch = () => reduxUseDispatch<AppDispatch>();

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
