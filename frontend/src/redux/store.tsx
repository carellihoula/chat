import { combineReducers, configureStore } from '@reduxjs/toolkit'
import conversationReducer from './conversationActive/conv.reducer'
import loggedReducer from './connectionStatus/status.reducer';


const rootReducer = combineReducers({
    convOpened: conversationReducer,
    islogged: loggedReducer
    
})

export const store = configureStore({
    reducer:rootReducer
})

export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>;