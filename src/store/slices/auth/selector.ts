import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const authSelector = createSelector(
	(state: RootState) => state.auth,
	(auth) => auth,
);
