import { IAuthTypes, IRegisterTypes } from '@/common';
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
		resetPassord: builder.mutation({
			query: (email) => ({
				body: email,
				url: '/auth/forgot-password',
				method: 'POST',
				credentials: 'include',
			}),
		}),
		registerUser: builder.mutation<void, IRegisterTypes>({
			query: (user) => ({
				body: user,
				url: `/auth/register`,
				method: 'POST',
			}),
			invalidatesTags: () => ['Users'],
		}),
	}),
});

export const {
	useLoginUserMutation,
	useGetAuthUserQuery,
	useRegisterUserMutation,
	useResetPassordMutation,
} = authApi;
