import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer } from "redux-persist";
import storage from "./customStorage";

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["auth", "id"],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, userReducer),
});

export const store = configureStore({
    reducer: {rootReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;