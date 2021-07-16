import * as functios from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createUserRecord = functios.auth
    .user()
    .onCreate((user,context)=>{
        const userRef = db.doc(`usuarios/${user.uid}`);

        return userRef.set({
            nombre: user.displayName,
            apellido: user.displayName,
            boleta: '',
            fotoURL: user.photoURL
        });
    });