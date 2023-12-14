import { ITaskTypes } from './tasksTypes';

export type IUserType = {
	id: string;
	email: string;
	name: string;
	avatarPath: string;
	tasks: ITaskTypes[];
};
