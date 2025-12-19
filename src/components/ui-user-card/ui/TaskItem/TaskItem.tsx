import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '@/components/ui-icon';

interface Props {
	task: IUserType['tasks'][number];
	isAdmin: boolean;
	canManage: boolean;
	onEdit: () => void;
	onDelete: () => void;
}

export const TaskItem: React.FC<Props> = ({ task, isAdmin, onEdit, onDelete, canManage }) => {
	return (
		<div className={styles.task}>
			<div className={styles.left}>
				<div className={styles.taskTitle}>
					<span>{task.title}</span>
				</div>
				<div className={styles.taskText} dangerouslySetInnerHTML={{ __html: task.description }} />
			</div>

			<div className={styles.right}>
				{isAdmin && (
					<>
						<button className={styles.userTaskToggle} onClick={onEdit}>
							<UIIcon name="FaPen" library="fa" size={12} color="#208d88" />
						</button>
						<button className={styles.userTaskToggle} onClick={onDelete}>
							<UIIcon name="FaTrash" library="fa" size={13} color="#af1414" />
						</button>
					</>
				)}
				{canManage && <UIIcon name="FiSettings" library="fi" size={13} />}
			</div>
		</div>
	);
};
