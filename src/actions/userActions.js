// @flow
import type { User } from '../types';
import * as constants from '../constants/userConstants';

type SetUserAction = {|
    type: typeof constants.SET_USER,
    data: null | User
|};

export type UserAction = SetUserActionn;

const userActions = {
    setUser: (user: null | User): SetUserAction => ({
        type: constants.SET_USER,
        data: user
    })
};

export default userActions;