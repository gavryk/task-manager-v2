import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface UserCardTypes {
	user: IUserType;
	removeTaskFunc: (id: string) => void;
	onAddTask: () => void;
}

export const UIUserCard: React.FC<UserCardTypes> = ({ user, removeTaskFunc, onAddTask }) => {
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
							<div className={styles.left}>
								<div className={styles.taskTitle}>
									<span>{task.title}</span>
								</div>
								<div className={styles.taskText}>{task.description}</div>
							</div>
							<div className={styles.right}>
								{admin?.role === 'ADMIN' && (
									<>
										<button className={styles.userTaskToggle}>
											<UIIcon name={'FaPen'} library="fa" size={12} color="#208d88" />
										</button>
										<button
											className={styles.userTaskToggle}
											onClick={() => removeTaskFunc(task.id)}
										>
											<UIIcon name={'FaTrash'} library="fa" size={13} color="#af1414" />
										</button>
									</>
								)}
							</div>
						</div>
					))}
			</div>
			<div className={styles.userCardBottom}>
				{admin?.role === 'ADMIN' && (
					<button className={styles.userTaskToggle} onClick={onAddTask}>
						<UIIcon name={'FaPlus'} library="fa" size={16} />
					</button>
				)}
			</div>
		</div>
	);
};
