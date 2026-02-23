import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskItem } from './ui/TaskItem/TaskItem';
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
	closestCenter,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

interface UserCardTypes {
	user: IUserType;
	removeTaskFunc: (id: string) => void;
	onAddTask: () => void;
	onEditTask: (task: IUserType['tasks'][number]) => void;
	onMoveTask: (params: { taskId: string; toIndex: number }) => Promise<void>;
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
	const [tasks, setTasks] = React.useState(() => [...user.tasks].sort((a, b) => a.order - b.order));

	React.useEffect(() => {
		setTasks([...user.tasks].sort((a, b) => a.order - b.order));
	}, [user.tasks]);

	React.useEffect(() => {
		setTasks([...user.tasks].sort((a, b) => a.order - b.order));
	}, [user.tasks]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 6 },
		}),
	);

	const taskIds = React.useMemo(() => tasks.map((t) => t.id), [tasks]);

	const handleDragEnd = async (event: DragEndEvent) => {
		if (!canManage) return;

		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return;

		const oldIndex = taskIds.indexOf(String(active.id));
		const newIndex = taskIds.indexOf(String(over.id));
		if (oldIndex < 0 || newIndex < 0) return;

		const prev = tasks;
		const next = arrayMove(tasks, oldIndex, newIndex);
		setTasks(next); // optimistic

		try {
			await onMoveTask({ taskId: String(active.id), toIndex: newIndex });
		} catch (e) {
			setTasks(prev); // rollback
			console.error(e);
		}
	};

	return (
		<div className={styles.root}>
			<div className={styles.userCardTop}>
				<div className={styles.name}>
					<span>{user.name}</span>
				</div>
			</div>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
				{me?.role === 'ADMIN' && (
					<button className={styles.userTaskToggle} onClick={onAddTask}>
						<UIIcon name={'FaPlus'} library="fa" size={16} />
					</button>
				)}
			</div>
		</div>
	);
};
