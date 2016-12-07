import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC4NcWn366WXJALyIiPDAJgpBDVQ8cMG5o',
  authDomain: 'mobx-next-todos.firebaseapp.com',
  databaseURL: 'https://mobx-next-todos.firebaseio.com',
};

// Allows to avoid Firebase reinit on HMR
if (Firebase.apps.length === 0) {
  Firebase.initializeApp(config);
}

const Database = Firebase.database().ref();
const Auth = Firebase.auth();
const AuthObject = Firebase.auth;

export {
  Auth,
  AuthObject,
  Database,
};
