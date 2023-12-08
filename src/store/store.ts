import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { api } from './api/api';
import auth from './slices/auth/slice';

export const store = configureStore({
	reducer: {
		auth,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
