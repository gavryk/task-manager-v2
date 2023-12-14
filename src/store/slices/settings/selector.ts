import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const settingsSelector = createSelector(
	(state: RootState) => state.settings,
	(settings) => settings,
);
