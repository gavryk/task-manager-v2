export interface SettingsSliceTypes {
	navigation: INavigateItem[];
}

export type INavigateItem = {
	link: string;
	title: string;
	icon: any;
};
