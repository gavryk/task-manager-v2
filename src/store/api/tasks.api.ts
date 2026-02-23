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
			invalidatesTags: () => ['Users', 'Tasks'],
		}),
		updateTaskStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `/tasks/${id}/status`,
				method: 'PATCH',
				body: { status },
			}),
			invalidatesTags: () => ['Users', 'Tasks'],
		}),
		moveTask: builder.mutation({
			query: ({ id, toIndex }) => ({
				url: `/tasks/${id}/move`,
				method: 'PATCH',
				body: { toIndex },
			}),
			invalidatesTags: () => ['Users'],
		}),
		getTasksByStatus: builder.query({
			query: (status) => ({
				url: '/tasks/filter',
				method: 'GET',
				params: { status },
			}),
			providesTags: () => ['Tasks'],
		}),
	}),
});

export const {
	useDeleteTaskMutation,
	useAddTaskMutation,
	useUpdateTaskMutation,
	useUpdateTaskStatusMutation,
	useGetTasksByStatusQuery,
	useMoveTaskMutation,
} = tasksApi;
