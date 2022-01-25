const firebase = require('firebase/app')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } = require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyAP4ipIhAWYl8PEuMcnsbBAMhlaq_F5L40",
  authDomain: "aire-ciudadano.firebaseapp.com",
  databaseURL: "https://aire-ciudadano-default-rtdb.firebaseio.com",
  projectId: "aire-ciudadano",
  storageBucket: "aire-ciudadano.appspot.com",
  messagingSenderId: "109955859655",
  appId: "1:109955859655:web:17471d237468c5ce476ae2",
  measurementId: "G-CRLNK0PD2L"
};

firebase.initializeApp(firebaseConfig)

module.exports = { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut }
