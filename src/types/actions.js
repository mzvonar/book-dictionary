// @flow
import type { BookAction } from '../actions/bookActions';
import type { WordAction } from '../actions/wordActions';

export type Action =
    | BookAction
    | WordAction;