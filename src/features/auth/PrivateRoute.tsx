import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/store/store';
import { useGetAuthUserQuery } from '@/store/api/auth.api';
import { setAuth } from '@/store/slices/auth/slice';
import { UILoader } from '@/components';

export const PrivateRoute: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { isLoading: authLoading, data: authData } = useGetAuthUserQuery();

	useEffect(() => {
		if (!authLoading && authData) dispatch(setAuth({ ...authData }));
	}, [dispatch, authLoading, authData]);

	if (authLoading) return <UILoader />;

	return authData ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
