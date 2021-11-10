import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const registerForm = document.querySelector('.formRegister')
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#inputName').value
    const lastname = document.querySelector('#inputLastName').value
    const email = document.querySelector('#inputEmail').value
    const password = document.querySelector('#inputPassword').value
    const phone = document.querySelector('#inputPhone').value
    
    registerForm.reset()

    console.log(name, lastname);
})