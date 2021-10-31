import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDwaZ_YX8KexBYpAC8CcSrrloQjyGZBOnw",
    authDomain: "jinkx-conector.firebaseapp.com",
    projectId: "jinkx-conector",
    storageBucket: "jinkx-conector.appspot.com",
    messagingSenderId: "202650736121",
    appId: "1:202650736121:web:657d3a55d6d255672f5928",
    measurementId: "G-CVEBVZ2XBR"
})

export const auth = firebase.auth();

// export const getFirestore = firebase.firestore();
export function getFirestore(){
    
    return firebase.firestore(app)
    // return firebase.auth.GoogleAuthProvider(googleProvider)
}

export default app;