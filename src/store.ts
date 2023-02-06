import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./domain/usecases/authenticate/login/login.usecase";
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";


export const store=  configureStore({
	  reducer: {
		auth:authSlice.reducer
	  }
})

export const useAppDispatch:() => typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;