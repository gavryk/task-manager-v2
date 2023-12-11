import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UIButton, UIInput, UISwitcher, UITypography } from '../../components';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { IRegisterTypes } from '@/common';
import { useRegisterUserMutation } from '@/store/api/auth.api';

export const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();
	const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
	const [isSwitched, setIsSwitched] = useState(false);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterTypes>();

	const onSubmit = async (data: IRegisterTypes) => {
		await registerUser(data)
			.unwrap()
			.then(() => {
				reset({
					name: '',
					avatarPath: '',
					role: '',
					password: '',
					email: '',
				});
				setErrorSubmit(null);
				navigate('/login');
			})
			.catch((err) => {
				setErrorSubmit(err.data.message || err.data[0].msg);
			});
	};

	return (
		<div className={styles.registerForm}>
			<UITypography variant="h3" fontWeight="bold" bottomSpace="sm" textAlign="center">
				Register
			</UITypography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<UIInput
					type="text"
					id="userNameField"
					placeholder="Name"
					{...register('name', { required: 'Please enter your first name.' })}
					error={errors.name && errors.name.message}
				/>
				<UIInput
					type="text"
					id="userEmailField"
					placeholder="Email"
					{...register('email', { required: 'Please enter your email.' })}
					error={errors.email && errors.email.message}
				/>
				<UISwitcher
					type="checkbox"
					id="userRoleField"
					onSwitchChange={() => setIsSwitched(!isSwitched)}
					label={!isSwitched ? 'Admin' : 'User'}
					checked={isSwitched}
					{...register('role', { required: 'Please enter your role.' })}
				/>
				{isSwitched && (
					<UIInput
						type="text"
						id="userAdminKeyField"
						placeholder="Admin Key"
						{...register('adminKey', { required: 'Please enter your email.' })}
						error={errors.adminKey && errors.adminKey.message}
					/>
				)}
				<UIInput
					type="password"
					id="passwordField"
					placeholder="Password"
					{...register('password', { required: 'Please enter your password.' })}
					error={errors.password && errors.password.message}
				/>
				<UIButton fluid type="submit">
					Register
				</UIButton>
				{errorSubmit && <span className={styles.errorDB}>{errorSubmit as React.ReactNode}</span>}
				<span className={styles.notice}>
					Already have an account? <Link to="/login">Login here.</Link>
				</span>
			</form>
		</div>
	);
};
