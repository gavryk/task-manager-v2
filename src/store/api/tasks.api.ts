import { api } from './api';

export const tasksApi = api.injectEndpoints({
	endpoints: (builder) => ({
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/tasks/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => ['Users'],
		}),
	}),
});

export const { useDeleteTaskMutation } = tasksApi;
