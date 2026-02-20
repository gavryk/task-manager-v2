export type ITaskTypes = {
	id: string;
	title: string;
	description: string;
	status: 'NEW' | 'IN_PROGRESS' | 'PENDING' | 'DONE';
	userId: string;
	users?: { name: string };
};
