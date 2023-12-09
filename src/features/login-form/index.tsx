import { useLoginUserMutation } from '@/store/api/auth.api';
import { useAppDispatch } from '@/store/store';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIButton, UIInput, UILoader, UITypography } from '@/components';
import { useForm } from 'react-hook-form';
import { ILoginTypes } from '@/common';
import { setAuth } from '@/store/slices/auth/slice';

export const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
	const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginTypes>();

	const onSubmit = async (data: ILoginTypes) => {
		await loginUser(data)
			.unwrap()
			.then((data) => {
				reset({ email: '', password: '' });
				dispatch(setAuth(data));
				navigate('/');
			})
			.catch((err) => {
				setErrorSubmit(err.data.msg || err.data[0].msg);
			});
	};

	return (
		<div>
			<div className={styles.loginForm}>
				<UITypography variant="h3" fontWeight="bold" bottomSpace="sm" textAlign="center">
					Login
				</UITypography>
				{!loginLoading ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={clsx(styles.fieldsWrapper, styles.cols1)}>
							<UIInput
								type="email"
								id="emailField"
								placeholder="Email"
								{...register('email', { required: 'Please enter your email.' })}
								error={errors.email && errors.email.message}
							/>
							<UIInput
								type="password"
								id="passwordField"
								placeholder="Password"
								{...register('password', { required: 'Please enter your password.' })}
								error={errors.password && errors.password.message}
							/>
						</div>
						<UIButton fluid type="submit" color="green">
							Login
						</UIButton>
						{errorSubmit && (
							<span className={styles.errorDB}>{errorSubmit as React.ReactNode}</span>
						)}
						<span className={styles.notice}>
							Dont have an account? <Link to="/register">Register.</Link>
						</span>
					</form>
				) : (
					<UILoader />
				)}
			</div>
		</div>
	);
};
