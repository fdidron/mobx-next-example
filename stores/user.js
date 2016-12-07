import { action, toJS, extendObservable } from 'mobx';

import { Auth, AuthObject } from '../utils/firebase';
import { destroyUserCookie, getUserFromCookie, setUserCookie } from '../utils/auth.js';


const defaultState = {
  error: null,
  displayName: null,
  photoURL: null,
  auth: false,
  uid: false
}

export default class User {

  constructor(User = null) {
    //We construct the store with a User or the defaultstate otherwise, used to hydrate the store.
    extendObservable(this, User || defaultState);

    //Firebase Auth related. We listen to auth events on the browser side only;
    if(typeof window !== 'undefined') {
      Auth.onAuthStateChanged( user => {
        //Auth change received, if the user is not null (by extend signed in) we update the store's observables
        if(user !== null) {
          this.updateUser(Object.assign({}, user, {auth: true}));
          this.auth = true;
        }
        else {
          this.signOut();
        }
      });
    }
  }

  getJSON = () => toJS({
    auth: this.auth,
    displayName: this.displayName,
    photoURL: this.photoURL,
    uid: this.uid
  })

  getUserFromCookie = (req) => getUserFromCookie(req);

  signInWithGithub = async (e) => {
    e.preventDefault();
    const provider = new AuthObject.GithubAuthProvider();
    try {
      //Firebase related. We don't need to return the user value as it will be returned by
      //the onAuthStateChanged listener registered in the constructor
      await Auth.signInWithPopup(provider);
    }
    catch(e) {
      this.error = e.message;
      return null;
    }
  }

  signOut = (e) => {
    e.preventDefault();
    //We reset the store to its initial state
    this.updateUser(defaultState);
    //We destroy the user's cookie entry
    destroyUserCookie();
    //We unauth from Firebase
    Auth.signOut();
  }

  updateUser = action( ({displayName, photoURL, auth, uid}) => {
    //We update the observable props
    this.auth = auth;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.uid= uid;
    //And we update the cookie to allow retrieving the user info on
    //subsequent server renders
    setUserCookie(this.getJSON());
  })
};
