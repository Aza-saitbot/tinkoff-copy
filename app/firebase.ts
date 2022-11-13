import {initializeApp} from "firebase/app";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCx-0DMAkaG1l7XSowBbSqRK0BZ368Ztd8",
    authDomain: "tinkoff-copy-d2320.firebaseapp.com",
    projectId: "tinkoff-copy-d2320",
    storageBucket: "tinkoff-copy-d2320.appspot.com",
    messagingSenderId: "22419558101",
    appId: "1:22419558101:web:bb61e270d3bb31cdf99c5c",
    measurementId: "G-ZZZ18HBWHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(' analytics', analytics)
export const auth = getAuth()

export const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)


export const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)


export const logout = () => signOut(auth)

export const db = getFirestore()