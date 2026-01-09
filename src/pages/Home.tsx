import { IUserType, ITaskTypes } from '@/common';
import { UIButton, UIGrid, UILoader, UIModal, UIUserCard } from '@/components';
import {
	useDeleteTaskMutation,
	useAddTaskMutation,
	useUpdateTaskMutation,
} from '@/store/api/tasks.api';
import { useGetUsersQuery } from '@/store/api/users.api';
import React, { useState } from 'react';

export const Home: React.FC = () => {
	const { data: userData, isLoading: userLoading } = useGetUsersQuery();
	const [deleteTask, { isLoading: removeTaskLoading }] = useDeleteTaskMutation();
	const [addTask, { isLoading: creatingTask }] = useAddTaskMutation();
	const [updateTask, { isLoading: updatingTask }] = useUpdateTaskMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<IUserType | null>(null);
	const [selectedTask, setSelectedTask] = useState<ITaskTypes | null>(null);

	const removeTask = async (id: string) => {
		try {
			await deleteTask(id);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddTask = (user: IUserType) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const handleEditTask = (user: IUserType, task: IUserType['tasks'][number]) => {
		setSelectedUser(user);
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTask(null);
		setSelectedUser(null);
	};

	const handleSubmitTask = async (data: { title: string; description: string }) => {
		if (!selectedUser) return;

		try {
			if (selectedTask) {
				await updateTask({
					id: selectedTask.id,
					data: {
						title: data.title,
						description: data.description,
						status: selectedTask.status,
					},
				}).unwrap();
			} else {
				await addTask({
					userId: selectedUser.id,
					title: data.title,
					description: data.description,
					status: 'NEW',
				}).unwrap();
			}

			handleCloseModal();
		} catch (error) {
			console.log(error);
		}
	};

	if (userLoading) return <UILoader />;

	return (
		<>
			<UIGrid columns={4} gridGap={5}>
				{userData?.map((user) => (
					<UIUserCard
						user={user}
						key={user.id}
						removeTaskFunc={removeTask}
						onEditTask={(task) => handleEditTask(user, task)}
						onAddTask={() => handleAddTask(user)}
					/>
				))}
			</UIGrid>
			<UIModal
				open={isModalOpen}
				task={selectedTask}
				onClose={handleCloseModal}
				onSubmit={handleSubmitTask}
			/>
		</>
	);
};
