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

        case constants.SET_WORDS: {
            const list = [];
            const entities = {};

            for(let i = 0, length = action.data.length; i < length; i += 1) {
                const word = action.data[i];
                list.push(word.word);
                entities[word.word] = word;
            }

            return {
                ...state,
                list,
                entities
            };
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

        case constants.UNSET_WORD: {
            const wordId = action.data;
            const index = state.list.indexOf(wordId);

            let list = state.list;
            if(index !== -1) {
                list = [].concat(state.list);
                list.splice(index, 1);
            }

            let entities = state.entities;
            if(entities[wordId]) {
                entities = {...state.entities};
                delete entities[wordId];
            }

            return {
                list,
                entities
            };
        }

        default:
            return state;
    }
}