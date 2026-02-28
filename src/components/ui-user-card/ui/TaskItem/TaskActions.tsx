import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { IUserType } from '@/common';
import { UIIcon } from '@/components/ui-icon';
import { useUpdateTaskStatusMutation } from '@/store/api/tasks.api';

type Props = {
	task: IUserType['tasks'][number];
	isOpen: boolean;
	onToggle: (e: React.MouseEvent) => void;
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
};

export const TaskActions: React.FC<Props> = ({
	task,
	isOpen,
	onToggle,
	onClose,
	onEdit,
	onDelete,
}) => {
	const [updateStatus, { isLoading }] = useUpdateTaskStatusMutation();

	const setStatus = useCallback(
		async (e: React.MouseEvent, status: 'DONE' | 'IN_PROGRESS') => {
			e.stopPropagation();
			try {
				await updateStatus({ id: task.id, status }).unwrap();
				onClose();
			} catch (err) {
				console.error(err);
			}
		},
		[task.id, updateStatus, onClose],
	);

	const isDone = task.status === 'DONE';
	const isInProgress = task.status === 'IN_PROGRESS';

	return (
		<div className={styles.right} onPointerDown={(e) => e.stopPropagation()}>
			<div className={clsx(styles.taskActions, { [styles.active]: isOpen })}>
				<button
					className={styles.userTaskToggle}
					onClick={(e) => setStatus(e, 'DONE')}
					disabled={isLoading || isDone}
					type="button"
				>
					<UIIcon name="FiCheck" size={20} color="#208d88" />
				</button>

				<button
					className={styles.userTaskToggle}
					onClick={(e) => setStatus(e, 'IN_PROGRESS')}
					disabled={isLoading || isInProgress}
					type="button"
					title="Move to In progress"
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
					onClick={(e) => {
						e.stopPropagation();
						onClose();
					}}
					type="button"
				>
					<UIIcon name="IoClose" library="io5" size={22} color="#222" />
				</button>
			</div>

			<button className={styles.userTaskToggle} onClick={onToggle} type="button">
				<UIIcon name="FiSettings" library="fi" size={13} />
			</button>
		</div>
	);
};
