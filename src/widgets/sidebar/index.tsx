import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AuthPanel, Navigation } from './ui';

export const Sidebar: React.FC = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const links = useSelector((state: RootState) => state.settings.navigation);
	return (
		<div className={styles.root}>
			<AuthPanel user={user} />
			<Navigation links={links} />
		</div>
	);
};
