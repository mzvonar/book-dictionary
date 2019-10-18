// @flow
import urlJoin from 'url-join';
import superagent from 'superagent';
import type { MiddlewareAPI, Dispatch } from 'redux';
import Debug from 'debug';

const debug = Debug('lottoland:middlewares:api');

export const CALL_API = 'CALL_API';
export const ORIGINAL_ACTION = Symbol('Original Action');
export const REQUEST_PROMISE = Symbol('REQUEST_PROMISE');
export const REQUEST_PROMISE_FNS = Symbol('Original Promsise Functions');

export const STATUS_PENDING = 'pending';
export const STATUS_SUCCESS = 'success';
export const STATUS_ERROR = 'error';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

type Headers = {
    [key: string]: string | number
};

type CallApiOptions = string | {
    method: Methods,
    endpoint: string,
    data?: {},
    apiRoot?: string,
    authorization?: string,
    headers?: Headers
}

export type CallApiAction = $ReadOnly<{
    CALL_API?: CallApiOptions
}>;

export type ApiAction<A, R> = A & {
    status: 'pending' | 'success' | 'error',
    response?: R
};

export type Config = {
    apiRoot?: string,
    headers?: Object
}

const isPromise = (obj) => Boolean(obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function');

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
type CallApiProps = {
    method: Methods,
    url: string,
    authorization?: string,
    headers?: Headers,
    data?: {}
}
export const defaultCallApi = ({ method, url, authorization, headers, data }: CallApiProps) => {
    return new Promise((resolve, reject) => {
        const promises = [];
        const request = superagent(method, url);

        if(authorization) {
            if(typeof authorization === 'function') {
                authorization = authorization();
            }

            if(!isPromise(authorization)) {
                authorization = Promise.resolve(authorization);
            }

            authorization.then(authorizationToken => {
                if(authorizationToken) {
                    request.set('Authorization', authorizationToken);
                }
            });

            promises.push(authorization);
        }

        if(headers) {
            for(const key in headers) {
                if(Object.prototype.hasOwnProperty.call(headers, key)) {
                    request.set(key, headers[key]);
                }
            }
        }

        if(method === 'GET' && data) {
            request.query(data);
        }
        else if((method === 'POST' || method === 'PUT') && data) {
            request.send(data);
        }

        Promise.all(promises)
            .then(() => {
                resolve(request);
            })
            .catch(reject);
    });
};

type Store = $ReadOnly<{
    getState: () => mixed,
}>;

type Action = $ReadOnly<{
    CALL_API?: ?CallApiOptions
}>

type Middleware<S, A, D> = (api: MiddlewareAPI<S, A, D>) => (next: D) => (action: A) => any;

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default function createApiMiddleware<S, A: { type: *, ... } | { type: *, CALL_API: CallApiOptions, ... }, D: Dispatch<A>>(config: Config): Middleware<S, A, D> {
    // TODO: add config with onBeforeRequest and onAfterRequest callbacks and implement auth
    const GLOBAL_CONFIG = {
        apiRoot: '',
        headers: null,
        callApi: defaultCallApi,
        ...config
    };

    return (store) => (next) => (action) => {
        let apiSettings;

        if(action.CALL_API) {
            apiSettings = ((action.CALL_API: any): CallApiOptions);
        }

        if (typeof apiSettings === 'undefined') {
            return next(action);
        }

        if(typeof apiSettings === 'string') {
            apiSettings = ({
                endpoint: apiSettings
            }: Object);
        }

        let { endpoint, data } = apiSettings;
        const { apiRoot, authorization = GLOBAL_CONFIG.authorization, headers: customHeaders } = apiSettings;
        const method = apiSettings.method || 'GET';

        if (typeof endpoint === 'function') {
            endpoint = endpoint(store.getState());
        }

        if (typeof endpoint !== 'string') {
            throw new Error('Specify a string endpoint URL.');
        }

        const actionWith = data => {
            return Object.assign({}, action, data);
        };

        const promise = new Promise<mixed>((resolve, reject) => {
            let baseUrl;
            if(endpoint.indexOf('http') === 0) {
                baseUrl = '';
            }
            else {
                baseUrl = (typeof apiRoot !== 'undefined') ? (apiRoot || '') : (GLOBAL_CONFIG.apiRoot || '');
            }
            const url = urlJoin(baseUrl, endpoint);

            const globalHeaders = typeof GLOBAL_CONFIG.headers === 'function' ? GLOBAL_CONFIG.headers(action) : GLOBAL_CONFIG.headers;

            const headers = {
                ...globalHeaders,
                ...customHeaders
            };

            debug(method, url);
            GLOBAL_CONFIG.callApi({ method, url, authorization, headers, data })
                .then(response => {
                    debug('SUCCESS: ', method, url);

                    const data = {
                        status: STATUS_SUCCESS,
                        response: response.body ? response.body : JSON.parse(response.text)
                    };

                    try {
                        next(actionWith(data));
                        return resolve(data.response);
                    }
                    catch(e) {
                        return reject(e);
                    }
                })
                .catch(e => {
                    debug('ERROR: ', method, url, e);

                    let error = e.response && e.response.body;

                    if(!error) {
                        error = {
                            status: e.status || e.statusCode
                        };
                    }

                    const nextAction = actionWith({
                        status: STATUS_ERROR,
                        // $FlowFixMe
                        [ORIGINAL_ACTION]: action,
                        error: error
                    });

                    nextAction.originalError = e;

                    next(nextAction);

                    return reject(nextAction.originalError);
                });
        });



        next(actionWith({
            status: STATUS_PENDING,
            'REQUEST_PROMISE': promise
        }));

        return promise;
    };
}