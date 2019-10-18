// @flow
import type { Book } from '../types';
import * as constants from '../constants/bookConstants';

type SetBookAction = {|
    type: typeof constants.SET_BOOK,
    data: Book
|};

export type BookAction = SetBookAction;


export default {
    setBook: (book: Book): SetBookAction => ({
        type: constants.SET_BOOK,
        data: book
    })
};