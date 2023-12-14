import { UIGrid, UILoader } from '@/components';
import { useGetUsersQuery } from '@/store/api/users.api';
import React from 'react';

export const Home: React.FC = () => {
	const { data: userData, isLoading: userLoading } = useGetUsersQuery();

	if (userLoading) return <UILoader />;

	return (
		<UIGrid columns={5} gridGap={5}>
			{userData?.map((user) => (
				<h3 key={user?.id}>{user.name}</h3>
			))}
		</UIGrid>
	);
};
