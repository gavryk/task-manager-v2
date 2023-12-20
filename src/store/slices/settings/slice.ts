import { SettingsSliceTypes } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SettingsSliceTypes = {
	navigation: [
		{ link: '/', title: 'All Tasks', icon: 'FiGrid' },
		{ link: '/in-progress', title: 'In Progress', icon: 'FiFastForward' },
		{ link: '/complete', title: 'Complete', icon: 'FiCheck' },
		{ link: '/settings', title: 'Settings', icon: 'FiSettings' },
	],
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
