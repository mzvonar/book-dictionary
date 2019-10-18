// @flow
import type { Action, Book } from '../types';
import * as constants from '../constants/bookConstants';

export type State = null | Book;

const initialState = null;

export default function app(state: State = initialState, action: Action): State {
    switch(action.type) {
        case constants.SET_BOOK: {
            return action.data;
        }

        default:
            return state;
    }
}