import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';

export const UIUserCard: React.FC<{ user: IUserType }> = ({ user }) => {
	return (
		<div className={styles.root}>
			<div className={styles.userCardTop}>
				<div className={styles.name}>
					<span>{user.name}</span>
				</div>
			</div>
			<div className={styles.userTasks}>
				{user.tasks.length > 0 &&
					user.tasks.map((task) => (
						<div className={styles.task}>
							<div className={styles.taskTitle}>
								<span>{task.title}</span>
							</div>
							<div className={styles.taskText}>{task.description}</div>
						</div>
					))}
			</div>
		</div>
	);
};
