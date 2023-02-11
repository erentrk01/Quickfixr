import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./utils";



import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store=  configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;

export const useAppDispatch:() => typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;