import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';
import { UIGrid } from '@/components';
import { Sidebar } from '@/widgets';
import { Snowfall } from 'react-snowfall';

type LayoutType = {
	isAuth: boolean;
};

export const MainLayout: React.FC<LayoutType> = ({ isAuth }) => {
	return (
		<div className={clsx(styles.layout, { [styles.auth]: isAuth })}>
			<div className={clsx(styles.fullHeight, 'container-xl', 'space')}>
				<Snowfall
					color="#7c7c7c"
					style={{
						position: 'fixed',
						width: '100vw',
						height: '100vh',
					}}
				/>
				{!isAuth ? (
					<UIGrid columns={2} centerBig="auto" gridGap={8} alignItem="stretch" fullHeight={true}>
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
