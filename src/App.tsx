import { useEffect } from 'react';
import { useLoginUserMutation } from './store/api/auth.api';

const App: React.FC = () => {
	const [loginUser, { data: userData, isLoading: loginLoading }] = useLoginUserMutation();

	const logIn = async () => {
		await loginUser({
			email: 'gvozdyk23@gmail.com',
			password: '1993099a',
		});
	};

	useEffect(() => {
		if (userData) {
			console.log(userData.user);
		}
	}, [userData]);

	return (
		<>
			<h1>Hello {userData ? userData.user.name : 'unknown'}</h1>
			<button onClick={logIn}>LogIn</button>
		</>
	);
};

export default App;
