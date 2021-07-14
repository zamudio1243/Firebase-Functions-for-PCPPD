import * as functios from 'firebase-functions';
import * as admin from 'firebase-admin';


const firebaseConfig = {
    apiKey: "AIzaSyC6gxhINyjRetBOkPsTwuF1Jcm7veQJ02Y",
    authDomain: "pair-programming-7ea55.firebaseapp.com",
    projectId: "pair-programming-7ea55",
    storageBucket: "pair-programming-7ea55.appspot.com",
    messagingSenderId: "864529477380",
    appId: "1:864529477380:web:d66ace4b304eee3ac02a51",
    measurementId: "G-V7ZRHWMHPP",
  };

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

export const createUserRecord = functios.auth
    .user()
    .onCreate((user,context)=>{
        const userRef = db.doc(`users/${user.uid}`);

        return userRef.set({
            nombre: user.displayName,
            apellido: user.displayName,
            boleta: ''
        });
    });