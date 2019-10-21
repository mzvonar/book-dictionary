// @flow
import {combineReducers} from 'redux';
import book from './book';
import translate from './translate';
import user from './user';
import word from './word';

const rootReducer = combineReducers<Object, Action>({
    book,
    translate,
    user,
    word
});

export default rootReducer;