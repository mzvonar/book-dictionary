// @flow
import { CALL_API } from '../middlewares/api';
import * as constants from '../constants/translateConstants';
import { configSelector } from '../selectors/userSelectors';

type _TranslateAction = {|
    type: typeof constants.TRANSLATE,
    data: $ReadOnly<{
        word: string
    }>
|};

type SetTranslationsAction = {|
    type: typeof constants.SET_TRANSLATIONS,
    data: null | $ReadOnlyArray<string>
|};

type ShowTranslationAction = {|
    type: typeof constants.SHOW_TRANSLATION,
    data: string
|};

export type TranslateAction =
    | _TranslateAction
    | SetTranslationsAction
    | ShowTranslationAction;


export default {
    translate: (word: string) => (dispatch, getState) => {
        const state = getState();
        const config = configSelector(state);

        dispatch({
            type: constants.TRANSLATE,
            [CALL_API]: {
                method: 'GET',
                endpoint: '.netlify/functions/translate',
                data: {
                    provider: config.provider,
                    word
                }
            },
            data: word
        });
    },

    setTranslations: (translations: null | $ReadOnlyArray<string>): SetTranslationsAction => ({
        type: constants.SET_TRANSLATIONS,
        data: translations
    }),

    showTranslation: (word: string): ShowTranslationAction => ({
        type: constants.SHOW_TRANSLATION,
        data: word
    })
};