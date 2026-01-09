import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
	children: React.ReactNode;
	active?: boolean;
	fluid?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	color?: 'orange' | 'black' | 'red' | 'green' | 'purple' | 'bordo' | 'blue' | 'main';
	variants?: 'contained' | 'outlined' | 'text';
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	centered?: boolean;
}

export const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			active,
			color = 'main',
			size = 'md',
			variants = 'contained',
			type = 'button',
			onClick,
			fluid,
			disabled,
			centered,
		},
		ref,
	) => {
		return (
			<button
				disabled={disabled}
				ref={ref}
				type={type}
				onClick={onClick}
				className={clsx(styles.uibutton, styles[variants], styles[size], styles[color], {
					[styles.active]: active,
					[styles.fluid]: fluid,
					[styles.centered]: centered,
				})}
			>
				{children}
			</button>
		);
	},
);
