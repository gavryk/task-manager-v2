import { api } from './api';
import { IUserType } from '@/common/interfaces/usersTypes';

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<IUserType[], void>({
			query: () => `/users`,
			providesTags: ['Auth', 'Users'],
		}),
	}),
});

export const { useGetUsersQuery } = userApi;
