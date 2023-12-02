import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseCookies } from 'nookies';

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Auth'],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			const token = parseCookies();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});
