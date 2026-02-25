import { api } from './api';
import { userApi } from './users.api';

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
		moveTask: builder.mutation<unknown, { id: string; toIndex: number; userId: string }>({
			query: ({ id, toIndex }) => ({
				url: `/tasks/${id}/move`,
				method: 'PATCH',
				body: { toIndex },
			}),

			async onQueryStarted({ id, toIndex, userId }, { dispatch, queryFulfilled }) {
				const patch = dispatch(
					userApi.util.updateQueryData('getUsers', undefined, (draft) => {
						const user = draft.find((u) => u.id === userId);
						if (!user || !user.tasks?.length) return;
						const fromIndex = user.tasks.findIndex((t) => t.id === id);
						if (fromIndex === -1) return;

						const [moved] = user.tasks.splice(fromIndex, 1);
						user.tasks.splice(toIndex, 0, moved);

						user.tasks.forEach((t, idx) => {
							t.order = idx;
						});
					}),
				);

				try {
					await queryFulfilled;
				} catch {
					patch.undo();
				}
			},
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
