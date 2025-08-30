import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from '../features/items/itemsApi';

export const store = configureStore({
    reducer: {
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(itemsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;