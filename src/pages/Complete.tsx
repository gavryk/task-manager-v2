import React, { useState } from 'react';
import { ITaskTypes } from '@/common';
import { UIGrid, UILoader, UIModal, UITaskCard } from '@/components';
import {
	useGetTasksByStatusQuery,
	useUpdateTaskMutation,
	useUpdateTaskStatusMutation,
} from '@/store/api/tasks.api';

export const Complete: React.FC = () => {
	const { data: tasks, isLoading } = useGetTasksByStatusQuery('DONE');

	const [updateStatus] = useUpdateTaskStatusMutation();
	const [updateTask] = useUpdateTaskMutation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITaskTypes | null>(null);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTask(null);
	};

	const handleEdit = (task: ITaskTypes) => {
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const handleUncheck = async (id: string) => {
		try {
			await updateStatus({
				id,
				status: 'NEW',
			}).unwrap();
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmitTask = async (data: { title: string; description: string }) => {
		if (!selectedTask) return;

		try {
			await updateTask({
				id: selectedTask.id,
				data: {
					title: data.title,
					description: data.description,
					status: selectedTask.status, // DONE
				},
			}).unwrap();

			handleCloseModal();
		} catch (e) {
			console.log(e);
		}
	};

	if (isLoading) return <UILoader />;

	return (
		<>
			<UIGrid columns={2} gridGap={5} alignItem="flex-start">
				{tasks?.map((task: ITaskTypes) => (
					<UITaskCard
						key={task.id}
						task={task}
						onEdit={() => handleEdit(task)}
						onUncheck={() => handleUncheck(task.id)}
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
