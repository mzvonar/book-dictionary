// @flow
import { STATUS_SUCCESS } from '../middlewares/api';
import type { Action, Book } from '../types';
import * as constants from '../constants/translateConstants';

export type State = {
    translations: null | $ReadOnlyArray<string>
};

const initialState = {
    translations: null
};

export default function app(state: State = initialState, action: Action): State {
    switch(action.type) {
        case constants.TRANSLATE:
            if(action.status === STATUS_SUCCESS) {
                return {
                    ...state,
                    translations: action.response
                };
            }


        default:
            return state;
    }
}