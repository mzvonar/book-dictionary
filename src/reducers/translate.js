// @flow
import { STATUS_SUCCESS } from '../middlewares/api';
import type { Action } from '../types';
import * as constants from '../constants/translateConstants';

export type State = {
    word: null | string,
    translations: null | $ReadOnlyArray<string>
};

const initialState = {
    word: null,
    translations: null
};

export default function app(state: State = initialState, action: Action): State {
    switch(action.type) {
        case constants.TRANSLATE:
            if(action.status === STATUS_SUCCESS) {
                return {
                    ...state,
                    word: action.data,
                    translations: action.response
                };
            }
            else {
                return state;
            }

        case constants.SET_TRANSLATIONS:
            return {
                ...state,
                word: action.data === null ? null : state.word,
                translations: action.data
            };


        default:
            return state;
    }
}