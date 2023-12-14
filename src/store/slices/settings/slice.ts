import { SettingsSliceTypes } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SettingsSliceTypes = {
	navigation: [
		{ link: '#', title: 'All Tasks' },
		{ link: '#', title: 'In Progress' },
		{ link: '#', title: 'Complete' },
		{ link: '#', title: 'Settings' },
	],
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
