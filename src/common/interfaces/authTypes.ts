export interface IRegisterTypes {
	name: string;
	email: string;
	avatarPath: string;
	role: string;
	tasks: any;
	password: string;
}

export interface ILoginTypes {
	email: string;
	password: string;
}

export interface IAuthTypes extends Omit<IRegisterTypes, 'password'> {
	_id: string;
}
export interface IAuthSliceTypes {
	user: null | IAuthTypes;
}
