import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '@/components/ui-icon';
import clsx from 'clsx';
import { useUpdateTaskStatusMutation } from '@/store/api/tasks.api';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
	task: IUserType['tasks'][number];
	isAdmin: boolean;
	canManage: boolean;
	onEdit: () => void;
	onDelete: () => void;
}

export const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, canManage }) => {
	const [isActionsOpen, setIsActionsOpen] = useState(false);
	const [updateStatus, { isLoading }] = useUpdateTaskStatusMutation();

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: task.id,
		disabled: !canManage,
	});

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.7 : 1,
	};

	const handleMarkDone = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			await updateStatus({
				id: task.id,
				status: 'DONE',
			}).unwrap();
			setIsActionsOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	const toggleActions = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsActionsOpen((v) => !v);
	};

	useEffect(() => {
		setIsActionsOpen(false);
	}, [task.id]);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={clsx(styles.task, { [styles.done]: task.status === 'DONE' })}
			{...attributes}
		>
			<div
				className={styles.left}
				{...listeners}
				style={{ cursor: canManage ? 'grab' : 'default' }}
				onClick={() => setIsActionsOpen(false)}
			>
				<div className={styles.taskTitle}>
					<span>{task.title}</span>
				</div>
				<div className={styles.taskText} dangerouslySetInnerHTML={{ __html: task.description }} />
			</div>

			<div className={styles.right} onPointerDown={(e) => e.stopPropagation()}>
				{canManage && (
					<div className={clsx(styles.taskActions, { [styles.active]: isActionsOpen })}>
						<button
							className={styles.userTaskToggle}
							onClick={handleMarkDone}
							disabled={isLoading || task.status === 'DONE'}
							type="button"
						>
							<UIIcon name="FiCheck" size={20} color="#208d88" />
						</button>
						<button
							className={styles.userTaskToggle}
							onClick={(e) => e.stopPropagation()}
							type="button"
						>
							<UIIcon name="FiFastForward" size={20} color="#d3c71f" />
						</button>
						<button
							className={styles.userTaskToggle}
							onClick={(e) => {
								e.stopPropagation();
								onEdit();
							}}
							type="button"
						>
							<UIIcon name="FaPen" library="fa" size={15} color="#208d88" />
						</button>
						<button
							className={styles.userTaskToggle}
							onClick={(e) => {
								e.stopPropagation();
								onDelete();
							}}
							type="button"
						>
							<UIIcon name="FaTrash" library="fa" size={15} color="#af1414" />
						</button>
						<button
							className={clsx(styles.userTaskToggle, styles.closeActions)}
							onClick={toggleActions}
							type="button"
						>
							<UIIcon name="IoClose" library="io5" size={22} color="#222" />
						</button>
					</div>
				)}
				{canManage && (
					<button className={styles.userTaskToggle} onClick={toggleActions} type="button">
						<UIIcon name="FiSettings" library="fi" size={13} />
					</button>
				)}
			</div>
		</div>
	);
};
