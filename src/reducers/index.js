// @flow
import {combineReducers} from 'redux';
import book from './book';
import translate from './translate';
import user from './user';

const rootReducer = combineReducers<Object, Action>({
    book,
    translate,
    user
});

export default rootReducer;