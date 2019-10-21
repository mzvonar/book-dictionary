// @flow
import type { State } from '../types';

const subStateSelector = (state: State) => state.word;

export const listSelector = (state: State) => {
    const subState = subStateSelector(state);
    return subState.list;
};

export const makeEntitySelector = (word: string) => (state: State) => {
    const subState = subStateSelector(state);
    return subState.entities[word];
};