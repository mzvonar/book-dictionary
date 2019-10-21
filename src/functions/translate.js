const firebase = require('./firebase');
const google = require('./google');
const microsoft = require('./microsoft');

exports.handler = (event, context, callback) => {
    try {
        const authorizationToken = event.headers.authorization;
        const provider = event.queryStringParameters.provider;
        const word = event.queryStringParameters.word;

        if(!authorizationToken) {
            return callback(null, {
                statusCode: 401,
                body: 'Unauthorized'
            });
        }

        if(!word) {
            return callback(null, {
                statusCode: 400,
                body: 'Word missing'
            });
        }

        firebase.auth().verifyIdToken(event.headers.authorization)
            .then(function() {
                let promise;

                if(provider === 'google') {
                    promise = google({
                        word: word,
                        from: event.queryStringParameters.from,
                        to: event.queryStringParameters.to
                    });
                }
                else if(provider === 'microsoft') {
                    promise = microsoft({
                        word: word,
                        from: event.queryStringParameters.from,
                        to: event.queryStringParameters.to
                    });
                }
                else {
                    return callback(new Error(`Unknown provider ${provider}`));
                }

                promise
                    .then(response => {
                        callback(null, {
                            statusCode: 200,
                            body: JSON.stringify(response)
                        })
                    })
                    .catch(e => {
                        callback(e)
                    });
            }).catch(callback);
    }
    catch(e) {
        callback(e)
    }
};