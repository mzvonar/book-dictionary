// @flow
import type { Action, User } from '../types';
import * as constants from '../constants/userConstants';

export type State = null | User;

const initialState = null;

export default function app(state: State = initialState, action: Action): State {
    switch(action.type) {
        case constants.SET_USER: {
            return action.data;
        }

        default:
            return state;
    }
}