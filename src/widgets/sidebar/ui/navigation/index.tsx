import { INavigateItem } from '@/common';
import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface NavigateTypes {
	links: INavigateItem[];
}

export const Navigation: React.FC<NavigateTypes> = ({ links }) => {
	return (
		<div className={styles.root}>
			{links.map((item: INavigateItem) => (
				<div className={styles.navItem} key={item.title}>
					<Link to={item.link}>{item.title}</Link>
				</div>
			))}
		</div>
	);
};
