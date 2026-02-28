import React, { useEffect, useMemo, useState, useCallback } from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import clsx from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskContent } from './TaskContent';
import { TaskActions } from './TaskActions';

interface Props {
	task: IUserType['tasks'][number];
	isAdmin: boolean;
	canManage: boolean;
	onEdit: () => void;
	onDelete: () => void;
}

export const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, canManage }) => {
	const [isActionsOpen, setIsActionsOpen] = useState(false);

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: task.id,
		disabled: !canManage,
	});

	const style = useMemo<React.CSSProperties>(
		() => ({
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? 0.7 : 1,
		}),
		[transform, transition, isDragging],
	);

	const closeActions = useCallback(() => setIsActionsOpen(false), []);
	const toggleActions = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
		setIsActionsOpen((v) => !v);
	}, []);

	useEffect(() => {
		setIsActionsOpen(false);
	}, [task.id]);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={clsx(styles.task, {
				[styles.done]: task.status === 'DONE',
				[styles.progress]: task.status === 'IN_PROGRESS',
			})}
			onClick={closeActions}
			{...attributes}
		>
			<TaskContent task={task} canManage={canManage} listeners={listeners} />

			{canManage && (
				<TaskActions
					task={task}
					isOpen={isActionsOpen}
					onToggle={toggleActions}
					onClose={closeActions}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			)}
		</div>
	);
};
