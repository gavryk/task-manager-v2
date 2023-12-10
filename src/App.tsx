import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { PrivateRoute } from './features';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const App: React.FC = () => {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<MainLayout isAuth={isAuthPage} />}>
				<Route element={<PrivateRoute />}>
					<Route path="" element={<Home />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
		</Routes>
	);
};

export default App;
