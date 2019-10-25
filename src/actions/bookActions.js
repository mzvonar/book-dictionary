// @flow
import type { Books, Book } from '../types';
import * as constants from '../constants/bookConstants';

type SetBooksAction = {|
    type: typeof constants.SET_BOOKS,
    data: Books
|};

type SetBookAction = {|
    type: typeof constants.SET_BOOK,
    data: Book
|};

export type BookAction = SetBookAction;


export default {
    setBooks: (books: Books): SetBooksAction => ({
        type: constants.SET_BOOKS,
        data: books
    }),

    setBook: (book: Book): SetBookAction => ({
        type: constants.SET_BOOK,
        data: book
    })
};