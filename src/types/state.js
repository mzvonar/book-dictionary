// @flow
import type { State as BookState } from '../reducers/book';
import type { State as BooksState } from '../reducers/books';
import type { State as TranslateState } from '../reducers/translate';
import type { State as UserState } from '../reducers/user';
import type { State as WordState } from '../reducers/word';

export type State = $ReadOnly<{
    book: BookState,
    books: BooksState,
    translate: TranslateState,
    user: UserState,
    word: WordState
}>;