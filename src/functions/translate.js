const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;
const credentials = require('../../translate-service-account');

const projectId = 'book-dictionary';
const location = 'global';

const translationClient = new TranslationServiceClient({credentials});

exports.handler = (event, context, callback) => {
    try {
        const request = {
            parent: translationClient.locationPath(projectId, location),
            contents: [event.queryStringParameters.word],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: event.queryStringParameters.from || 'en-US',
            targetLanguageCode: event.queryStringParameters.to || 'sk-SK',
        };

        // Run request
        translationClient.translateText(request)
            .then(response => {
                response = response[0];

                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response.translations)
                })
            })
            .catch(e => {
                callback(e)
            })
    }
    catch(e) {
        callback(e)
    }
};