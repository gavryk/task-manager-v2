import { INavigateItem } from '@/common';
import React from 'react';
import styles from './styles.module.scss';
import { Link, NavLink } from 'react-router-dom';
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
					<NavLink to={item.link} className={({ isActive }) => (isActive ? styles.active : '')}>
						<UIIcon name={item.icon} size={24} />
						{!minimal && item.title}
					</NavLink>
				</div>
			))}
		</div>
	);
};
