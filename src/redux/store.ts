import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REGISTER, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "@/features/authentication/authSlice";
import tempReducer from "./tempSlice";
import toastifyReducer from "./toastifySlice"
import dashboardReducer from "@/features/dashboard/dashboard.slice"
import walletReducer from "@/features/wallet/wallet.slice"
import transactionReducer from "@/features/transaction/transaction.slice"
import userReducer from "@/features/user/user.slice"
import eventReducer from "@/features/events/event.slice"
import reportReducer from "@/features/reporting/reporting.slice"
import announcementReducer from "@/features/announcements/announcements.slice"
import teamReducer from "@/features/team/team.slice"
import promotionReducer from "@/features/events/promotion.slice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

const reducers = combineReducers({
    auth: authReducer,
    temp: tempReducer,
    toast: toastifyReducer,
    dashboard: dashboardReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    user: userReducer,
    event: eventReducer,
    report: reportReducer,
    announcement: announcementReducer,
    team: teamReducer,
    promotion: promotionReducer,
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