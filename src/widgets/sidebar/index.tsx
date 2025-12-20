import { RootState, useAppDispatch } from '@/store/store';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AuthPanel, Navigation } from './ui';
import { UIBurger, UIIcon } from '@/components';
import { useLogoutMutation } from '@/store/api/auth.api';
import { setLogout } from '@/store/slices/auth/slice';
import { useNavigate } from 'react-router-dom';
import { api } from '@/store/api/api';

export const Sidebar: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const links = useSelector((state: RootState) => state.settings.navigation);
	const [sidebarStatus, setSidebarStatus] = useState<boolean>(false);
	const [logout, { isLoading: loadingLogOut }] = useLogoutMutation();

	const handlerClick = (val: boolean) => {
		setSidebarStatus(val);
	};

	const navigate = useNavigate();

	const logOut = useCallback(async () => {
		if (!window.confirm('Are you sure you want to log out?')) return;

		try {
			await logout().unwrap();
		} catch (e) {
		} finally {
			dispatch(setLogout());
			dispatch(api.util.resetApiState());
			navigate('/login', { replace: true });
		}
	}, [logout, dispatch, navigate]);

	return (
		<div className={styles.root}>
			<div className={styles.burgerIcon}>
				<UIBurger mobileMenuActive={sidebarStatus} handlerClick={handlerClick} />
			</div>
			<div className={styles.main}>
				{sidebarStatus && <AuthPanel user={user} />}
				<Navigation links={links} minimal={!sidebarStatus} />
			</div>
			<div className={styles.logoutButton} onClick={logOut}>
				<UIIcon name="FiLogIn" size={24} />
			</div>
		</div>
	);
};
