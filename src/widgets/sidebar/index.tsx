import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AuthPanel, Navigation } from './ui';
import { UIBurger, UIIcon } from '@/components';

export const Sidebar: React.FC = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const links = useSelector((state: RootState) => state.settings.navigation);
	const [sidebarStatus, setSidebarStatus] = useState<boolean>(false);

	const handlerClick = (val: boolean) => {
		setSidebarStatus(val);
	};

	return (
		<div className={styles.root}>
			<div className={styles.burgerIcon}>
				<UIBurger mobileMenuActive={sidebarStatus} handlerClick={handlerClick} />
			</div>
			<div className={styles.main}>
				{sidebarStatus && <AuthPanel user={user} />}
				<Navigation links={links} minimal={!sidebarStatus} />
			</div>
			<div className={styles.logoutButton}>
				<UIIcon name="FiLogIn" size={24} />
			</div>
		</div>
	);
};
