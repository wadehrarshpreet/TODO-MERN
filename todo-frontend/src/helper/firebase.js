import firebase from 'firebase';
import { firebaseConfig } from './config.js';


firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth;
class FirebaseHelper {
  constructor() {
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }
  loginWithGoogle(callback) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=>{
      callback(result);
    });
  }
  logout() {
    return firebaseAuth().signOut();
  }

  getUser(sendUser) {
    firebaseAuth().onAuthStateChanged(user => {
      sendUser(user);
    });
  }

}
export default new FirebaseHelper();
