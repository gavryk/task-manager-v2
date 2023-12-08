import { IAuthTypes } from '@/common';
import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAuthUser: builder.query<IAuthTypes, void>({
			query: () => `/users/profile/me`,
			providesTags: ['Auth'],
		}),
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

export const { useLoginUserMutation, useGetAuthUserQuery } = authApi;
