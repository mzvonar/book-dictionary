// @flow
import type { State } from '../types';

export const booksSelector = (state: State) => state.books;
export const bookSelector = (state: State) => state.book;
export const bookIdSelector = (state: State) => {
    const book = bookSelector(state);
    return book && book.id;
};