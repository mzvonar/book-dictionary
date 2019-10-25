// @flow
import type { State } from '../types';

export const booksSelector = (state: State) => state.books;
export const bookSelector = (state: State) => state.book;