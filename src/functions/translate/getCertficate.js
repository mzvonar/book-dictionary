module.exports = function() {
    let certificate;
    if(process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        certificate = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    }
    else {
        certificate = JSON.parse(process.env.FIREBASE_CONFIG);
    }
    return certificate;
};
