// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
// import type { ApiAction as ApiMiddlewareAction } from '../middlewares/api';
import type { Action } from './actions';
import type { State } from './state';

// export type GetState = () => State;
// export type ApiAction<R> = ApiMiddlewareAction<Action, R>;
// export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any; // eslint-disable-line no-use-before-define

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;