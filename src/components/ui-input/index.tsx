import { AiOutlineSearch, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import clsx from 'clsx';
import React, { InputHTMLAttributes, useState } from 'react';
import { UILabel } from '../ui-label';
import styles from './styles.module.scss';

interface InputProps {
	label?: string;
	id?: string;
	type: React.HTMLInputTypeAttribute;
	required?: InputHTMLAttributes<HTMLInputElement>['required'];
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	name?: string;
	value?: string | number;
	error?: string | boolean;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onInput?: React.FormEventHandler<HTMLInputElement>;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	checked?: boolean;
	disabled?: boolean;
	bottomSpaceOff?: boolean;
	rounded?: boolean;
	bg?: boolean;
	borderOff?: boolean;
}

export const UIInput = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			id,
			type,
			required,
			onBlur,
			name,
			placeholder,
			value,
			onChange,
			onInput,
			onClick,
			error,
			checked,
			disabled,
			bottomSpaceOff,
			rounded,
			bg,
			borderOff,
		},
		ref,
	) => {
		const [visiblePass, setVisiblePass] = useState(false);

		const handleVisiblePass = () => {
			setVisiblePass(!visiblePass);
		};

		return (
			<div className={clsx(styles.UIInput, styles[type])}>
				{label && type !== 'radio' && type !== 'checkbox' && (
					<UILabel htmlFor={id ? id : ''}>{label}</UILabel>
				)}
				<input
					id={id}
					type={type === 'password' ? (!visiblePass ? 'password' : 'text') : type}
					onBlur={onBlur}
					name={name}
					required={required}
					onChange={onChange}
					onInput={onInput}
					placeholder={placeholder}
					onClick={onClick}
					value={value}
					className={clsx(styles.input, {
						[styles.error]: error,
						[styles.bottomSpaceOff]: bottomSpaceOff,
						[styles.rounded]: rounded,
						[styles.bg]: bg,
						[styles.borderOff]: borderOff,
					})}
					ref={ref}
					checked={checked}
					disabled={disabled}
				/>
				{label && (type === 'radio' || type === 'checkbox') && (
					<UILabel htmlFor={id ? id : ''}>{label}</UILabel>
				)}
				{type === 'search' && <AiOutlineSearch size="20" />}
				{type === 'password' &&
					(visiblePass ? (
						<AiFillEye size="20" cursor="pointer" onClick={handleVisiblePass} />
					) : (
						<AiFillEyeInvisible size="20" cursor="pointer" onClick={handleVisiblePass} />
					))}
				{error && <span className={styles.errorTxt}>{error}</span>}
			</div>
		);
	},
);
