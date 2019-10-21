import firebase from '../services/firebase';

export default function getAuthorizationToken() {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        user.getIdToken()
            .then(function(accessToken) {
                return resolve(accessToken);
            })
            .catch(reject);
    });
}