// @flow
import type { State } from '../types';

export const subStateSelector = (state: State) => state.user;

export const userInitializedSelector = (state: State) => {
    const subState = subStateSelector(state);
    return subState && subState.initialized;
};

export const userIdSelector = (state: State) => {
    const subState = subStateSelector(state);
    return subState && subState.userId;
};

export const userSelector = (state: State) => {
    const subState = subStateSelector(state);
    return subState && subState.data;
};

export const configSelector = (state: State) => {
    const user = userSelector(state);
    return user && user.config;
};