// @flow
import type { Word } from '../types';
import * as constants from '../constants/wordConstants';

type SetWordAction = {|
    type: typeof constants.SET_WORD,
    data: Word
|};

type UnsetWordAction = {|
    type: typeof constants.UNSET_WORD,
    data: string
|};

export type WordAction =
    | SetWordAction
    | UnsetWordAction;


export default {
    setWord: (word: Word): SetWordAction => ({
        type: constants.SET_WORD,
        data: word
    }),

    unsetWord: (wordId: string): UnsetWordAction => ({
        type: constants.UNSET_WORD,
        data: wordId
    })
};