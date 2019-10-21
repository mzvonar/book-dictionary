const config = require('config');

module.exports = function() {
    let certificate;
    if(config.firebase.certificate) {
        certificate = require(config.firebase.certificate);
    }
    else {
        certificate = JSON.parse(process.env.FIREBASE_CONFIG);
    }
    return certificate;
};
