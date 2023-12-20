import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';
import { UIGrid } from '@/components';
import { Sidebar } from '@/widgets';

type LayoutType = {
	isAuth: boolean;
};

export const MainLayout: React.FC<LayoutType> = ({ isAuth }) => {
	return (
		<div className={clsx(styles.layout, { [styles.auth]: isAuth })}>
			<div className={clsx(styles.fullHeight, 'container-xl', 'space')}>
				{!isAuth ? (
					<UIGrid columns={2} centerBig="auto" gridGap={12} alignItem="stretch" fullHeight={true}>
						<Sidebar />
						<Outlet />
					</UIGrid>
				) : (
					<UIGrid columns={1} gridGap={12} alignItem="center" fullHeight={true}>
						<Outlet />
					</UIGrid>
				)}
			</div>
		</div>
	);
};
