export type ITaskTypes = {
	id: string;
	title: string;
	description: string;
	status: 'NEW' | 'IN_PROGRESS' | 'PENDING' | 'DONE';
	userId: string;
	order: number;
	users?: { name: string };
};
