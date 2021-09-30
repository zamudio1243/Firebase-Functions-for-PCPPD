import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from './utils/collections';

const db = admin.firestore();

const defaultSettings = functions.firestore
    .document('/espacios_de_trabajo/{id}')
    .onCreate(async(snapshot,context)=>{
 
        const workSpaceRef = db.doc(`espacios_de_trabajo/${context.params.id}`); 

        const channel = {
            "nombre":  "General",
            "permisos": []
        };

        await workSpaceRef.collection(Collection.VOICE_CHANNEL).add(channel);
        await workSpaceRef.collection(Collection.CODE_CHANNEL).add(channel);
        return workSpaceRef.collection(Collection.TEXT_CHANNEL).add(channel)
    }
);


export {defaultSettings}