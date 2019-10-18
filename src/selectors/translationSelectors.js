// @flow
import type { State } from '../types';

export const translationsSelector = (state: State) => state.translate.translations;