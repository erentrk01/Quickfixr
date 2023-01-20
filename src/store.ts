import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./domain/usecases/authenticate/login/login.usecase";
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";


export const store=  configureStore({
	  reducer: {
		login:loginSlice.reducer,
	  },
})

export const useAppDispatch:() => typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;