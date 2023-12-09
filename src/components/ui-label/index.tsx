import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

interface LabelProps {
	children: ReactNode;
	htmlFor: string;
	className?: string;
}

export const UILabel: React.FC<LabelProps> = ({ htmlFor, className, children }) => {
	return (
		<label className={clsx(styles.root, className)} htmlFor={htmlFor}>
			{children}
		</label>
	);
};
