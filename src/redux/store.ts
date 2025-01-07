import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REGISTER, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "@/features/authentication/authSlice";
import tempReducer from "./tempSlice";
import toastifyReducer from "./toastifySlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

const reducers = combineReducers({
    auth: authReducer,
    temp: tempReducer,
    toast: toastifyReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })

});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;