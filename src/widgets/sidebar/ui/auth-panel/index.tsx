import { IAuthSliceTypes } from '@/common';
import avatarHolder from '@/assets/img/avatar-holder.jpg';
import React from 'react';
import styles from './styles.module.scss';

export const AuthPanel: React.FC<IAuthSliceTypes> = ({ user }) => {
	return (
		<div className={styles.root}>
			<div className={styles.userAvatar}>
				<img src={user?.avatarPath ? user.avatarPath : avatarHolder} alt={user?.name} />
			</div>
			<div className={styles.userName}>
				<span>{user?.name}</span>
			</div>
			<div className={styles.userRole}>
				<span>{user?.role}</span>
			</div>
		</div>
	);
};
