import firebase from 'firebase'; //npm install firebase, for using this

const firebaseApp =  firebase.initializeApp({
    apiKey: "AIzaSyA7cTOi3bfAufUMyYw7ISy0lC3W22qqVUE",
    authDomain: "mau-instagram-clone.firebaseapp.com",
    databaseURL: "https://mau-instagram-clone.firebaseio.com",
    projectId: "mau-instagram-clone",
    storageBucket: "mau-instagram-clone.appspot.com",
    messagingSenderId: "585713106353",
    appId: "1:585713106353:web:76477c57722f917cf9d190",
    measurementId: "G-J71RMGDFEQ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage} 