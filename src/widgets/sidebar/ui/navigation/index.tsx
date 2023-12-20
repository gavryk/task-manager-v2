import { INavigateItem } from '@/common';
import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { UIIcon } from '@/components';

interface NavigateTypes {
	links: INavigateItem[];
	minimal: boolean;
}

export const Navigation: React.FC<NavigateTypes> = ({ links, minimal }) => {
	return (
		<div className={styles.root}>
			{links.map((item: INavigateItem) => (
				<div className={styles.navItem} key={item.title}>
					<Link to={item.link}>
						<UIIcon name={item.icon} size={24} />
						{!minimal && item.title}
					</Link>
				</div>
			))}
		</div>
	);
};
