// @flow
import type { Word } from '../types';
import * as constants from '../constants/wordConstants';

type SetWordsAction = {|
    type: typeof constants.SET_WORDS,
    data: $ReadOnlyArray<Word>
|};

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
    setWords: (words: $ReadOnlyArray<Word>): SetWordsAction => ({
        type: constants.SET_WORDS,
        data: words
    }),

    setWord: (word: Word): SetWordAction => ({
        type: constants.SET_WORD,
        data: word
    }),

    unsetWord: (wordId: string): UnsetWordAction => ({
        type: constants.UNSET_WORD,
        data: wordId
    })
};