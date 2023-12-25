import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const UIUserCard: React.FC<{ user: IUserType }> = ({ user }) => {
	const admin = useSelector((state: RootState) => state.auth.user);

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
						<div className={styles.task} key={task.id}>
							<div className={styles.taskTitle}>
								<span>{task.title}</span>
							</div>
							<div className={styles.taskText}>{task.description}</div>
						</div>
					))}
			</div>
			<div className={styles.userCardBottom}>
				{admin?.role === 'ADMIN' && (
					<button className={styles.userCardToggle}>
						<UIIcon name={'FaPlus'} library="fa" size={18} />
					</button>
				)}
			</div>
		</div>
	);
};
