import React, { useEffect } from 'react';
import { RootState, useAppDispatch } from './store/store';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { PrivateRoute } from './features';
import { useGetAuthUserQuery } from './store/api/auth.api';
import { setAuth } from './store/slices/auth/slice';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const user = useSelector((state: RootState) => state.auth.user);
	const { isLoading: authLoading, data: authData } = useGetAuthUserQuery();

	useEffect(() => {
		if (!authLoading && authData) dispatch(setAuth({ ...authData }));
	}, [dispatch, authLoading, authData]);

	if (authLoading) return <h1>Loading...</h1>;

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<MainLayout />}>
				<Route element={<PrivateRoute />}>
					<Route path="" element={<Home />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	);
};

export default App;
