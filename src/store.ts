import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./domain/usecases/authenticate/login/login.usecase";
import eventSlice from "./domain/usecases/event/eventSlice";
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";

import createSagaMiddleware from '@redux-saga/core';
const saga = createSagaMiddleware()

export const store=  configureStore({
	  reducer: {
		auth:authSlice.reducer,
		event:eventSlice.reducer
	  },
	  middleware:[saga]
})

export const useAppDispatch:() => typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;