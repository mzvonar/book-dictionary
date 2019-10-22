const path = require('path');


let release;
try {
    const sentryCliPath = path.resolve(__dirname, '../node_modules/@sentry/cli/bin/sentry-cli');
    release = require('child_process').execSync(`${sentryCliPath} releases propose-version`).toString().trim();
}
catch(e) {
    console.error(e);
}

if(!release) {
    if(process.env.NODE_ENV === 'production') {
        if(process.env.STAGING) {
            release = 'staging-Unknown';
        }
        else {
            release = 'prod-Unknown';
        }
    }
    else {
        release = 'dev-Unknown';
    }
}

module.exports = {
    "title": "Book dictionary",
    "port": 3000,
    firebase: {
        authDomain: "book-dictionary.firebaseapp.com",
        databaseURL: "https://book-dictionary.firebaseio.com",
        projectId: "book-dictionary",
        storageBucket: "book-dictionary.appspot.com",
        messagingSenderId: "926031760847",
        appId: "1:926031760847:web:a3c877e7d242c01bba96ba",
        measurementId: "G-ST1GB887N9"
    },
    "microsoft": {},
    dirs: {
        logs: path.join(__dirname, './../logs'),
        public: path.join(__dirname, './../public')
    }
};
