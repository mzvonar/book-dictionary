// @flow
import type { Action, Books } from '../types';
import * as constants from '../constants/bookConstants';

export type State = Books;

const initialState = [];

export default function book(state: State = initialState, action: Action): State {
    switch(action.type) {
        case constants.SET_BOOKS: {
            return action.data;
        }

        default:
            return state;
    }
}