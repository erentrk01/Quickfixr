import { combineReducers } from "@reduxjs/toolkit";

import eventReducer from "./domain/usecases/event/eventSlice";
import authReducer from "./domain/usecases/authenticate/login/login.usecase";
import commentReducer from "./domain/usecases/comment/commentSlice";
import pollReducer from "./domain/usecases/poll/pollSlice";
const rootReducer = combineReducers({ event: eventReducer,auth:authReducer,comments:commentReducer,poll:pollReducer});
export default rootReducer;