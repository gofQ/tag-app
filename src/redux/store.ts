import { configureStore } from "@reduxjs/toolkit";
import  mainSlice  from "./mainSlicer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { auth } from "./services/auth";
import { userAPI } from "./services/user";
import { billingAPI } from "./services/billing";
import { permissionsAPI } from "./services/permissions";
import { notificationsAPI } from "./services/notifications";
import { balanceAPI } from "./services/balance";
import { funcs } from "./services/funcs";
import { rentalAPI } from "./services/rental";


const store=configureStore({
    reducer:{
        main:mainSlice,
        [auth.reducerPath]:auth.reducer,
        [userAPI.reducerPath]:userAPI.reducer,
        [billingAPI.reducerPath]:billingAPI.reducer,
        [permissionsAPI.reducerPath]:permissionsAPI.reducer,
        [notificationsAPI.reducerPath]:notificationsAPI.reducer,
        [balanceAPI.reducerPath]:balanceAPI.reducer,
        [funcs.reducerPath]:funcs.reducer,
        [rentalAPI.reducerPath]:rentalAPI.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(auth.middleware).concat(userAPI.middleware).concat(billingAPI.middleware).concat(permissionsAPI.middleware).concat(notificationsAPI.middleware).concat(balanceAPI.middleware).concat(funcs.middleware).concat(rentalAPI.middleware),
});


setupListeners(store.dispatch);

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch

export default store;

