import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskItem } from './ui/TaskItem/TaskItem';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useUserTasksDnD } from '@/hooks';

interface UserCardTypes {
	user: IUserType;
	removeTaskFunc: (id: string) => void;
	onAddTask: () => void;
	onEditTask: (task: IUserType['tasks'][number]) => void;
	onMoveTask: (params: { taskId: string; toIndex: number; userId: string }) => Promise<unknown>;
}

export const UIUserCard: React.FC<UserCardTypes> = ({
	user,
	removeTaskFunc,
	onAddTask,
	onEditTask,
	onMoveTask,
}) => {
	const me = useSelector((state: RootState) => state.auth.user);
	const isAdmin = me?.role === 'ADMIN';
	const isOwner = me?.id === user.id;
	const canManage = isAdmin || isOwner;
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

	const { tasks, taskIds, handleDragEnd } = useUserTasksDnD({
		tasksFromProps: user.tasks,
		canManage,
		userId: user.id,
		onMoveTask,
	});

	return (
		<div className={styles.root}>
			<div className={styles.userCardTop}>
				<div className={styles.name}>
					<span>{user.name}</span>
				</div>
			</div>

			<DndContext
				autoScroll={false}
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
					<div className={styles.userTasks}>
						{tasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								isAdmin={isAdmin}
								canManage={canManage}
								onEdit={() => onEditTask(task)}
								onDelete={() => removeTaskFunc(task.id)}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			<div className={styles.userCardBottom}>
				{isAdmin && (
					<button className={styles.userTaskToggle} onClick={onAddTask}>
						<UIIcon name={'FaPlus'} library="fa" size={16} />
					</button>
				)}
			</div>
		</div>
	);
};
