// @flow
import type { Word } from '../types';
import * as constants from '../constants/wordConstants';

type SetWordAction = {|
    type: typeof constants.SET_WORD,
    data: Word
|};

export type WordAction = SetWordAction;


export default {
    setWord: (word: Word): SetWordAction => ({
        type: constants.SET_WORD,
        data: word
    })
};