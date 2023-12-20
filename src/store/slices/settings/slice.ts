import { SettingsSliceTypes } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SettingsSliceTypes = {
	navigation: [
		{ link: '#', title: 'All Tasks', icon: 'FiGrid' },
		{ link: '#', title: 'In Progress', icon: 'FiFastForward' },
		{ link: '#', title: 'Complete', icon: 'FiCheck' },
		{ link: '#', title: 'Settings', icon: 'FiSettings' },
	],
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
