import store from "./configureStore"

import {
    persistStore,
 
} from "redux-persist";

export const persistor = persistStore(store);


