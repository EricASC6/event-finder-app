import firebase from "firebase";
import "firebase/auth";
import { FIREBASE_CONFIG } from "../keys/firebase-config";

firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;
