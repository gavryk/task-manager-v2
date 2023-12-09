import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type LoaderType = {
	position?: 'absolute' | 'relative';
};

export const UILoader: React.FC<LoaderType> = ({ position = 'absolute' }) => {
	return (
		<div className={clsx(styles.loader, styles[position])}>
			<i className={styles.loaderEl}></i>
			<i className={styles.loaderEl}></i>
		</div>
	);
};
