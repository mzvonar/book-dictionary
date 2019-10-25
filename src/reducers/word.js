// @flow
import type { Action, Word } from '../types';
import * as bookConstants from '../constants/bookConstants';
import * as constants from '../constants/wordConstants';

export type State = {
    list: $ReadOnlyArray<string>,
    entities: {
        [word: string]: Word
    }
};

const initialState = {
    list: [],
    entities: {}
};

export default function word(state: State = initialState, action: Action): State {
    switch(action.type) {
        case bookConstants.SET_BOOK: {
            return initialState;
        }

        case constants.SET_WORD: {
            const index = state.list.indexOf(action.data.word);

            let newList = state.list;
            if(index === -1) {
                newList = [
                    ...state.list,
                    action.data.word
                ];
            }

            return {
                list: newList,
                entities: {
                    ...state.entities,
                    [action.data.word]: action.data
                }
            };
        }

        default:
            return state;
    }
}