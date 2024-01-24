import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./loginAndRegister/status.reducer";
import userReducer from "./PersonalDataFromUser/userInfo.reducer";

const rootReducer = combineReducers({
  islogged: loggedReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>;
