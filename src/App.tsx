import React from 'react';
import { RootState, useAppDispatch } from './store/store';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { PrivateRoute } from './features';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<MainLayout />}>
				<Route element={<PrivateRoute />}>
					<Route path="" element={<h1>Hello</h1>} />
				</Route>
				<Route path="/login" element={<h1>Login</h1>} />
			</Route>
		</Routes>
	);
};

export default App;
