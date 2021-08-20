import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const defaultChannel = functions.firestore
    .document('/espacios_de_trabajo/{id}')
    .onCreate((snapshot,context)=>{
 
        const workSpaceRef = db.doc(`espacios_de_trabajo/${context.params.id}`);
        const channel = {
            "nombre":  "General",
            "mensajes": [],
            "permisos": []
        };

        return workSpaceRef.update({
            canales_texto: channel
        });
    });