import { useEffect } from 'react';
import { useLoginUserMutation } from './store/api/auth.api';

const App: React.FC = () => {
	return (
		<>
			<h1>Hello {userData ? userData.user.name : 'unknown'}</h1>
			<button onClick={logIn}>LogIn</button>
		</>
	);
};

export default App;
