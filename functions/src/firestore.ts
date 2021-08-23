import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Workspace } from './models/workspace';
import { User } from './models/user';

const db = admin.firestore();

export const defaultSettings = functions.firestore
    .document('/espacios_de_trabajo/{id}')
    .onCreate(async(snapshot,context)=>{
 
        const workSpaceRef = db.doc(`espacios_de_trabajo/${context.params.id}`);
        const workSpaceData = <Workspace>(await workSpaceRef.get()).data();
        
        const channel = {
            "nombre":  "General",
            "permisos": []
        };

        await db.collection("usuarios")
            .where("uid", "==", workSpaceData.uid_usuario).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc)=> {
                   const user = <User> doc.data();
                   workSpaceRef.collection("usuarios").add(user)
                });
            });
        

        
        workSpaceRef.collection("canales_voz").add(channel)
        return workSpaceRef.collection("canales_texto").add(channel)

    });