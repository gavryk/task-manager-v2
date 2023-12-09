import clsx from 'clsx';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface GridProps {
	children: React.ReactNode;
	columns: number;
	gridGap: number;
	centerBig?: 'sm' | 'md' | 'lg';
	alignItem?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

export const UIGrid = ({
	children,
	columns,
	gridGap,
	centerBig,
	alignItem = 'stretch',
}: GridProps) => {
	const gridWrapperClasses = useMemo(() => {
		return clsx(styles.gridWrapper, {
			[styles[`gridColumns${columns}`]]: columns,
			[styles[`gridGap${gridGap}`]]: gridGap,
			[styles.centerBigSm]: centerBig === 'sm',
			[styles.centerBigMd]: centerBig === 'md',
			[styles.centerBigLg]: centerBig === 'lg',
			[styles.flxStart]: alignItem === 'flex-start',
			[styles.flxEnd]: alignItem === 'flex-end',
			[styles.flxCenter]: alignItem === 'center',
		});
	}, [columns, gridGap]);

	return <div className={gridWrapperClasses}>{children}</div>;
};
