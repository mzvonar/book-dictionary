// @flow
import { CALL_API } from '../middlewares/api';
import type { Book } from '../types';
import * as constants from '../constants/translateConstants';

type _TranslateAction = {|
    type: typeof constants.TRANSLATE,
    data: string
|};

export type TranslateAction = _TranslateAction;


export default {
    translate: (word: string): _TranslateAction => ({
        type: constants.TRANSLATE,
        [CALL_API]: {
            method: 'GET',
            endpoint: '.netlify/functions/translate',
            data: {
                word
            }
        },
        data: word
    })
};