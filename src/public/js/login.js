import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDeawHKlf1NBvPDIUer0sYDxn7WrIIL3ag",
    authDomain: "mysensorinfo.firebaseapp.com",
    databaseURL: "https://mysensorinfo-default-rtdb.firebaseio.com",
    projectId: "mysensorinfo",
    storageBucket: "mysensorinfo.appspot.com",
    messagingSenderId: "72274332118",
    appId: "1:72274332118:web:b0ee741dcfe8604fa13c77",
    measurementId: "G-RZMGVP8RQT"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const loginForm = document.querySelector('#form-login')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const loginEmail = document.querySelector('#email-login').value
    const loginPassword = document.querySelector('#password-login').value
    createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            console.log('login');
        })
})