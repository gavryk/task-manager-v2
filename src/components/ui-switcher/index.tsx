import React, { InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { UILabel } from '..';

interface SwitcherProps {
	type?: Extract<React.HTMLInputTypeAttribute, 'checkbox' | 'radio'>;
	required?: InputHTMLAttributes<HTMLInputElement>['required'];
	onSwitchChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	name: string;
	id?: string;
	checked?: boolean;
	value?: string;
	error?: boolean;
	label?: string;
}

export const UISwitcher = React.forwardRef<HTMLInputElement, SwitcherProps>(
	(
		{ type = 'checkbox', id, required, onSwitchChange, name, checked, value, onBlur, error, label },
		ref,
	) => {
		const sid = useId();

		return (
			<div className={clsx(styles.switcher)}>
				<span>{label}</span>
				<UILabel
					htmlFor={id || sid}
					className={clsx(styles.root, { [styles.active]: checked, [styles.error]: error })}
				>
					<input
						onChange={onSwitchChange}
						type={type}
						ref={ref}
						id={id || sid}
						onBlur={onBlur}
						name={name}
						required={required}
						checked={checked}
						value={value}
					/>
					<span className={styles.switchToggle}></span>
				</UILabel>
			</div>
		);
	},
);
