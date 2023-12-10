import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { PrivateRoute } from './features';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

const App: React.FC = () => {
	const location = useLocation();

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
