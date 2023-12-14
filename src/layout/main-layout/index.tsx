import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';

type LayoutType = {
	isAuth: boolean;
};

export const MainLayout: React.FC<LayoutType> = ({ isAuth }) => {
	return (
		<div className={clsx(styles.layout, { [styles.auth]: isAuth })}>
			<div className={clsx('container-lg', 'space')}>
				<Outlet />
			</div>
		</div>
	);
};
