import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
	return (
		<div className={clsx(styles.layout)}>
			<div className={clsx('container', 'space')}>
				<Outlet />
			</div>
		</div>
	);
};
