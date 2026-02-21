import { IAuthTypes, IRegisterTypes } from '@/common';
import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAuthUser: builder.query<IAuthTypes, void>({
			query: () => ({
				url: `/users/profile/me`,
				credentials: 'include',
			}),
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
		logout: builder.mutation<void, void>({
			query: () => ({
				url: `/auth/logout`,
				method: 'POST',
			}),
			invalidatesTags: () => ['Auth', 'Users', 'Tasks'],
		}),
		resetPassword: builder.mutation({
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
	useResetPasswordMutation,
	useLogoutMutation,
} = authApi;
