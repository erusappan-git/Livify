import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import userSliceReducer from './slices/userSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        user: userSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
