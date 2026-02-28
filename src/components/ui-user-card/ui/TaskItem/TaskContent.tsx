import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';

type Props = {
	task: IUserType['tasks'][number];
	canManage: boolean;
	listeners: any;
};

export const TaskContent: React.FC<Props> = ({ task, canManage, listeners }) => {
	return (
		<div className={styles.left} {...listeners} style={{ cursor: canManage ? 'grab' : 'default' }}>
			<div className={styles.taskTitle}>
				<span>{task.title}</span>
			</div>
			<div className={styles.taskText} dangerouslySetInnerHTML={{ __html: task.description }} />
		</div>
	);
};
