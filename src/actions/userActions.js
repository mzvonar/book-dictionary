// @flow
import type { User } from '../types';
import * as constants from '../constants/userConstants';

type SetUserIdAction = {|
    type: typeof constants.SET_USER_ID,
    data: null | string
|};

type SetUserAction = {|
    type: typeof constants.SET_USER,
    data: null | User
|};

export type UserAction =
    | SetUserIdAction
    | SetUserActionn;

const userActions = {
    setUserId: (userId: null | string): SetUserIdAction => ({
        type: constants.SET_USER_ID,
        data: userId
    }),

    setUser: (user: null | User): SetUserAction => ({
        type: constants.SET_USER,
        data: user
    })
};

export default userActions;