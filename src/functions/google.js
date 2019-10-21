const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;
const getCertificate = require('./getCertficate');

const certificate = getCertificate();
const projectId = 'book-dictionary';
const location = 'global';

const translationClient = new TranslationServiceClient({credentials: certificate});

module.exports = function({ word, from = 'en-US', to = 'sk-SK'}) {
    return new Promise((resolve, reject) => {
        const request = {
            parent: translationClient.locationPath(projectId, location),
            contents: [word],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: from,
            targetLanguageCode: to,
        };

        // Run request
        translationClient.translateText(request)
            .then(response => {
                response = response[0];

                return resolve(response.translations.map(translation => translation.translatedText));
            })
            .catch(reject);
    })
};