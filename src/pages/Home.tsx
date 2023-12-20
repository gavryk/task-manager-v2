import { UIGrid, UILoader, UIUserCard } from '@/components';
import { useGetUsersQuery } from '@/store/api/users.api';
import React from 'react';

export const Home: React.FC = () => {
	const { data: userData, isLoading: userLoading } = useGetUsersQuery();

	if (userLoading) return <UILoader />;

	return (
		<UIGrid columns={4} gridGap={5}>
			{userData?.map((user) => (
				<UIUserCard user={user} key={user.id} />
			))}
		</UIGrid>
	);
};
