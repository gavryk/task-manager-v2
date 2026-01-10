import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface GridProps {
	children: React.ReactNode;
	columns: number;
	gridGap: number;
	centerBig?: 'sm' | 'md' | 'lg' | 'auto';
	alignItem?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
	fullHeight?: boolean;
}

export const UIGrid = ({
	children,
	columns,
	gridGap,
	centerBig,
	alignItem = 'stretch',
	fullHeight,
}: GridProps) => {
	const gridWrapperClasses = useMemo(() => {
		return clsx(styles.gridWrapper, {
			[styles[`gridColumns${columns}`]]: columns,
			[styles[`gridGap${gridGap}`]]: gridGap,
			[styles.centerBigSm]: centerBig === 'sm',
			[styles.centerBigMd]: centerBig === 'md',
			[styles.centerBigLg]: centerBig === 'lg',
			[styles.centerBigAuto]: centerBig === 'auto',
			[styles.flxStart]: alignItem === 'flex-start',
			[styles.flxEnd]: alignItem === 'flex-end',
			[styles.flxCenter]: alignItem === 'center',
			[styles.fullHeight]: fullHeight === true,
		});
	}, [columns, gridGap, centerBig, alignItem, fullHeight]);

	return <div className={gridWrapperClasses}>{children}</div>;
};
