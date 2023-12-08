import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '@/store/store';
import { IAuthTypes } from '@/common';

export const PrivateRoute: React.FC = () => {
	const [userState, setUserState] = useState<IAuthTypes>({} as IAuthTypes);
	const user = useSelector((state: RootState) => state.auth.user);
	const location = useLocation();

	useEffect(() => {
		setUserState(user as IAuthTypes);
	}, [user]);

	return userState ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
