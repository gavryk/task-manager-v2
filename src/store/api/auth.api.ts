import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (user) => ({
				body: user,
				url: '/auth/login',
				method: 'POST',
				credentials: 'include',
			}),
			invalidatesTags: () => ['Auth'],
		}),
	}),
});

export const { useLoginUserMutation } = authApi;
