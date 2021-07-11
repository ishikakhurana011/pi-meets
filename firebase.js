import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.js';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCJ9L-6fW0Yg2DKz1a_yvtae5UdX5_gZhk",
    authDomain: "teams-clone-dc6b8.firebaseapp.com",
    projectId: "teams-clone-dc6b8",
    storageBucket: "teams-clone-dc6b8.appspot.com",
    messagingSenderId: "766530244770",
    appId: "1:766530244770:web:1c17533222fedff18e87fb",
    measurementId: "G-8JC1GCKZV5"
  });

export const db = app.firestore();

export default firebase;