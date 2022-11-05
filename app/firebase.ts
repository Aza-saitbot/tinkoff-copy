import {initializeApp} from "firebase/app";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCa-1OrO2kZz4OMRXA6tHQAXfdIS6xEFkc",
    authDomain: "tinkoff-387f9.firebaseapp.com",
    projectId: "tinkoff-387f9",
    storageBucket: "tinkoff-387f9.appspot.com",
    messagingSenderId: "54575055335",
    appId: "1:54575055335:web:68edd46d587389792afd42",
    measurementId: "G-HCQL42F42L"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth()

export const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)


export const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)


export const logout = () => signOut(auth)

export const db = getFirestore()