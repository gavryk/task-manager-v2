import { IAuthSliceTypes } from '@/common';
import { authApi } from '@/store/api/auth.api';
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
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.getAuthUser.matchFulfilled, (state, { payload }) => {
			state.user = payload;
		});

		builder.addMatcher(authApi.endpoints.getAuthUser.matchRejected, (state) => {
			state.user = null;
		});
	},
});

export const { setAuth, setLogout } = authSlice.actions;

export default authSlice.reducer;
