import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import { authSlice } from "../features/api/users/AuthSlice";

import SerchSlice from "../features/Slice/SerchSlice";
import  CartSlice  from "../features/Slice/CartSlice";
import QuantityResultSlice from "../features/Slice/QuantityResultSlice";
import NavigationSlice from "../features/Slice/NavigationSlice";






const store = configureStore({
  reducer: {
    // إضافة المخفضات (reducers) الخاصة بـ RTK Query
    [apiSlice.reducerPath]: apiSlice.reducer,

    [authSlice.reducerPath]: authSlice.reducer,

    serch: SerchSlice,
    cart: CartSlice,
    QuantityResult: QuantityResultSlice,
    Pagination:NavigationSlice
  },
  // إعداد middleware الخاص بـ RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,authSlice.middleware),
});

// console.log(store.getState(),'store');
// const unsubscribe = store.subscribe(()=>console.log('update store',store.getState()));
// // console.log(useSelector(state=>state.userDetails),'store');

// unsubscribe()

export default store;
