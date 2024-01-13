import { UIGrid, UILoader, UIUserCard } from '@/components';
import { useDeleteTaskMutation } from '@/store/api/tasks.api';
import { useGetUsersQuery } from '@/store/api/users.api';
import React from 'react';

export const Home: React.FC = () => {
	const { data: userData, isLoading: userLoading } = useGetUsersQuery();
	const [deleteTask, { isLoading: removeTaskLoading }] = useDeleteTaskMutation();

	const removeTask = async (id: string) => {
		try {
			await deleteTask(id);
		} catch (error) {
			console.log(error);
		}
	};

	if (userLoading) return <UILoader />;

	return (
		<UIGrid columns={4} gridGap={5}>
			{userData?.map((user) => (
				<UIUserCard user={user} key={user.id} removeTaskFunc={removeTask} />
			))}
		</UIGrid>
	);
};
