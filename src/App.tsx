import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { PrivateRoute } from './features';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Reset } from './pages/Reset';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
	const location = useLocation();
	const user = useSelector((state: RootState) => state.auth.user);
	const isAuthPage =
		location.pathname === '/login' ||
		location.pathname === '/register' ||
		location.pathname === '/password-reset';

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<MainLayout isAuth={isAuthPage} />}>
				<Route element={<PrivateRoute />}>
					<Route path="" element={<Home />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/password-reset" element={<Reset />} />
			</Route>
		</Routes>
	);
};

export default App;
