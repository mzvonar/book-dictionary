// @flow
import type { Action, User } from '../types';
import * as constants from '../constants/userConstants';

export type State = {
    initialized: boolean,
    userId: null | string,
    data: null | User
};

const initialState = {
    initialized: false,
    userId: null,
    data: null
};

export default function app(state: State = initialState, action: Action): State {
    switch(action.type) {
        case constants.SET_INITIALIZED: {
            return {
                ...state,
                initialized: action.data
            };
        }

        case constants.SET_USER_ID: {
            return {
                ...state,
                userId: action.data,
                data: null
            };
        }

        case constants.SET_USER: {
            return {
                ...state,
                data: action.data
            };
        }

        default:
            return state;
    }
}