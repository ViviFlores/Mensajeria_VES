// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Oly-6ToJ0b5D9aNuX7DiZjx4oYQ3Pcw",
  authDomain: "mensajeria-ves.firebaseapp.com",
  projectId: "mensajeria-ves",
  storageBucket: "mensajeria-ves.appspot.com",
  messagingSenderId: "558274527099",
  appId: "1:558274527099:web:ebd517b294f7571e2247de",
  databaseURL: "https://mensajeria-ves-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

//Referencia al servicio de BDD
export const dbRealTime = getDatabase(firebase);