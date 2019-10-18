import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

firebase.initializeApp(CONFIG.firebase);

export default firebase;