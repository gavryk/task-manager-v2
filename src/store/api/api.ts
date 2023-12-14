import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseCookies } from 'nookies';

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Auth', 'Users'],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		prepareHeaders: (headers) => {
			const { access_token } = parseCookies();
			if (access_token) {
				headers.set('Authorization', `Bearer ${access_token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});
