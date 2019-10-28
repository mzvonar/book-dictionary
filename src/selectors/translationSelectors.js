// @flow
import type { State } from '../types';

export const subStateSelector = (state: State) => state.translate;

export const wordSelector = (state: State) => {
    const subState = subStateSelector(state);
    return subState.word;
};

export const translationsSelector = (state: State) => {
    const subState = subStateSelector(state);
    return subState.translations;
};

export const hasTranslationsSelector = (state: State) => Boolean(translationsSelector(state));