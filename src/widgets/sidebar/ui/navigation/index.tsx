import { INavigateItem } from '@/common';
import React from 'react';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { UIIcon } from '@/components';
import clsx from 'clsx';

interface NavigateTypes {
	links: INavigateItem[];
	minimal: boolean;
}

export const Navigation: React.FC<NavigateTypes> = ({ links, minimal }) => {
	return (
		<div className={styles.root}>
			{links.map((item: INavigateItem) => (
				<div className={styles.navItem} key={item.title}>
					<NavLink
						to={item.link}
						className={({ isActive }) =>
							clsx({ [styles.active]: isActive, [styles.minimal]: minimal })
						}
					>
						<UIIcon name={item.icon} size={24} />
						{!minimal && <span>{item.title}</span>}
					</NavLink>
				</div>
			))}
		</div>
	);
};
