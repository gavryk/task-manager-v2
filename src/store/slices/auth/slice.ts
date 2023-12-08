import { IAuthSliceTypes } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAuthSliceTypes = {
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload;
		},
		setLogout: (state) => {
			state.user = null;
		},
	},
});

export const { setAuth, setLogout } = authSlice.actions;

export default authSlice.reducer;
