import React, { useState } from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '@/components/ui-icon';
import clsx from 'clsx';
import { useUpdateTaskStatusMutation } from '@/store/api/tasks.api';

interface Props {
	task: IUserType['tasks'][number];
	isAdmin: boolean;
	canManage: boolean;
	onEdit: () => void;
	onDelete: () => void;
}

export const TaskItem: React.FC<Props> = ({ task, isAdmin, onEdit, onDelete, canManage }) => {
	const [isActionsOpen, setIsActionsOpen] = useState(false);
	const [updateStatus, { isLoading }] = useUpdateTaskStatusMutation();

	const handleMarkDone = async () => {
		try {
			await updateStatus({
				id: task.id,
				status: 'DONE',
			}).unwrap();
			setIsActionsOpen(!isActionsOpen);
		} catch (error) {
			console.error(error);
		}
	};

	const handlerOpenActions = (val: boolean) => {
		setIsActionsOpen(val);
	};

	return (
		<div className={clsx(styles.task, { [styles.done]: task.status === 'DONE' })}>
			<div className={styles.left}>
				<div className={styles.taskTitle}>
					<span>{task.title}</span>
				</div>
				<div className={styles.taskText} dangerouslySetInnerHTML={{ __html: task.description }} />
			</div>

			<div className={styles.right}>
				{isAdmin && (
					<div className={clsx(styles.taskActions, { [styles.active]: isActionsOpen })}>
						<button
							className={styles.userTaskToggle}
							onClick={handleMarkDone}
							disabled={isLoading || task.status === 'DONE'}
						>
							<UIIcon name="FiCheck" size={20} color="#208d88" />
						</button>
						<button className={styles.userTaskToggle}>
							<UIIcon name="FiFastForward" size={20} color="#d3c71f" />
						</button>
						<button className={styles.userTaskToggle} onClick={onEdit}>
							<UIIcon name="FaPen" library="fa" size={15} color="#208d88" />
						</button>
						<button className={styles.userTaskToggle} onClick={onDelete}>
							<UIIcon name="FaTrash" library="fa" size={15} color="#af1414" />
						</button>
						<button
							className={clsx(styles.userTaskToggle, styles.closeActions)}
							onClick={() => handlerOpenActions(!isActionsOpen)}
						>
							<UIIcon name="IoClose" library="io5" size={22} color="#222" />
						</button>
					</div>
				)}
				{canManage && (
					<button
						className={styles.userTaskToggle}
						onClick={() => handlerOpenActions(!isActionsOpen)}
					>
						<UIIcon name="FiSettings" library="fi" size={13} />
					</button>
				)}
			</div>
		</div>
	);
};
