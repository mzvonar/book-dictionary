const superagent = require('superagent');

const auth = {
    token: null,
    since: null
};

function authenticate() {
    return new Promise((resolve, reject) => {
        if(auth.token && Date.now() - auth.since < 8 * 60 * 1000) {
            return resolve(auth.token);
        }

        superagent
            .post(`${process.env.MICROSOFT_TRANSLATOR_ENDPOINT}`)
            .set('Ocp-Apim-Subscription-Key', process.env.MICROSOFT_TRANSLATOR_KEY)
            .then(response => {
                console.log('response.body: ', response.body);

                auth.token = response.body;
                auth.since = Date.now();

                return resolve(auth.token)
            })
            .catch(reject)
    });
}

module.exports = function({ word, from = 'en', to = 'sk' }) {
    return new Promise((resolve, reject) => {

        authenticate()
            .then(token => {
                superagent
                    .post('https://api.cognitive.microsofttranslator.com/translate')
                    .query({
                        'api-version': '3.0',
                        from: from,
                        to: to
                    })
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-type', 'application/json')
                    .send([
                        {
                            Text: word
                        }
                    ])
                    .then(response => {
                        const results = response.body[0];
                        return resolve(results.translations.map(translation => translation.text))
                    })
                    .catch(reject)
            })
            .catch(reject);
    });
};