import React from 'react';
import styles from './styles.module.scss';
import { IUserType } from '@/common';
import { UIIcon } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskItem } from './ui/TaskItem/TaskItem';

interface UserCardTypes {
	user: IUserType;
	removeTaskFunc: (id: string) => void;
	onAddTask: () => void;
	onEditTask: (task: IUserType['tasks'][number]) => void;
}

export const UIUserCard: React.FC<UserCardTypes> = ({
	user,
	removeTaskFunc,
	onAddTask,
	onEditTask,
}) => {
	const me = useSelector((state: RootState) => state.auth.user);
	const isAdmin = me?.role === 'ADMIN';
	const isOwner = me?.id === user.id;
	const canManage = isAdmin || isOwner;

	console.log(user);
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
