import { useResetPasswordMutation } from '@/store/api/auth.api';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { UIButton, UIInput, UILoader, UITypography } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IResetPassTypes } from '@/common';

export const ResetForm: React.FC = () => {
	const navigate = useNavigate();
	const [errorReq, setErrorReq] = useState<string | null>(null);
	const [resetPassword, { isLoading: resetLoading }] = useResetPasswordMutation();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IResetPassTypes>();

	const onSubmit: SubmitHandler<IResetPassTypes> = async (data) => {
		await resetPassword(data)
			.unwrap()
			.then((data) => {
				reset({ email: '' });
				navigate('/login');
			})
			.catch((err) => setErrorReq(err.data.message));
	};

	return (
		<div className={styles.resetForm}>
			<UITypography variant="h3" fontWeight="bold" bottomSpace="sm" textAlign="center">
				Reset Password
			</UITypography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={clsx(styles.fieldsWrapper, styles.cols1)}>
					<UIInput
						type="email"
						id="emailField"
						placeholder="Email"
						{...register('email', { required: 'Please enter your email.' })}
						error={errors.email && errors.email.message}
					/>
				</div>
				{!resetLoading ? (
					<UIButton fluid type="submit" color="main">
						Send
					</UIButton>
				) : (
					<UILoader />
				)}
				{errorReq && <span className={styles.errorDB}>{errorReq as React.ReactNode}</span>}
				<span className={styles.notice}>
					Dont have an account? <Link to="/register">Register.</Link>
				</span>
			</form>
		</div>
	);
};
