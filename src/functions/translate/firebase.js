const admin = require('firebase-admin');
const getCertificate = require('./getCertficate');
// const credentials = require('./firebase-service-account');

try {
    const certificate = getCertificate();

    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(certificate),
            databaseURL: 'https://book-dictionary.firebaseio.com'
        });
    }
}
catch(e) {
    console.error('Firebase error', e);
}

module.exports = admin;