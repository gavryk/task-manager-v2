import { useLoginUserMutation } from '@/store/api/auth.api';
import { useAppDispatch } from '@/store/store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
	const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

	return <div>Login Form</div>;
};
