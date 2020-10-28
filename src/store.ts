import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './pages/counter/slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
