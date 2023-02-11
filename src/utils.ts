import { combineReducers } from "@reduxjs/toolkit";

import eventReducer from "./domain/usecases/event/eventSlice";
import authReducer from "./domain/usecases/authenticate/login/login.usecase";
const rootReducer = combineReducers({ event: eventReducer,auth:authReducer});
export default rootReducer;