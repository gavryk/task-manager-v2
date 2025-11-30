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
		addTask: builder.mutation({
			query: (body) => ({
				url: '/tasks',
				method: 'POST',
				body,
			}),
			invalidatesTags: () => ['Users'],
		}),
	}),
});

export const { useDeleteTaskMutation, useAddTaskMutation } = tasksApi;
