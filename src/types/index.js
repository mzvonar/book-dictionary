// @flow
type _ExtractReturn<B, F: (...args: any[]) => B> = B; // eslint-disable-line no-unused-vars
export type ExtractReturn<F> = _ExtractReturn<*, F>;

export type * from './actions';
export type * from './book';
export type { State } from './state';
export type * from './redux';
export type * from './user';
export type * from './word';
