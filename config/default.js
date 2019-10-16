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
    dirs: {
        logs: path.join(__dirname, './../logs'),
        public: path.join(__dirname, './../public')
    }
};