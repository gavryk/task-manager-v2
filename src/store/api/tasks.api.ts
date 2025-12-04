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
		updateTask: builder.mutation({
			query: ({ id, data }) => ({
				url: `/tasks/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: () => ['Users'],
		}),
	}),
});

export const { useDeleteTaskMutation, useAddTaskMutation, useUpdateTaskMutation } = tasksApi;
