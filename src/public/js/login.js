import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, getIdToken, setPersistence, inMemoryPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

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
const db = getFirestore();
const auth = getAuth();
setPersistence(auth, inMemoryPersistence)


// const username = document.querySelector('#user')
// const loginForm = document.querySelector('#form-login')
// const loginBtn = document.querySelector('#loginBtn')
// const logout = document.querySelector('#logout')
// const incorrect = document.querySelector('#incorrect')

// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const email = document.querySelector('#email-login').value
//     const password = document.querySelector('#password-login').value

//     const verify = getUsert(email, password)
//         .then(data => {
//             if(data != null) {
//                 loginBtn.hidden = true
//                 username.hidden = false
//                 username.innerHTML = `Welcome ${data.name}`
//                 logout.hidden = false
//                 loginForm.reset()
//                 $('#loginModal').modal('hide')

//             }else {
//                 incorrect.style.display = "block"
//             }
//         })
   
// })

// const getUsert = async (email, password) => {
//     const docRef = doc(db, 'users', email)
//     const docSnap = await getDoc(docRef)
//     if(docSnap.exists()) {
//         if(docSnap.data().password === password) {
//             return await docSnap.data()
//         }else {
            
//         }
//     }else {
        
//     }
// }

// const incorrectRegister = document.querySelector('#incorrectRegister')
// const registerBtn = document.querySelector('#windowLogin')
// registerBtn.addEventListener('click', (e) => {
//     e.preventDefault()
//     $('#loginModal').modal('hide')
// })

// logout.addEventListener('click', (e) => {
//     e.preventDefault()
//     loginBtn.hidden = false
//     logout.hidden = true
//     username.hidden = true
// })

// const registerForm = document.querySelector('#form-register')
// registerForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const email = e.target.registerEmail.value
//     const password = e.target.registerPassword.value
//     const name = document.querySelector('#name-register').value
//     const lastname = document.querySelector('#lastname-register').value
//     const phone = document.querySelector('#phone-register').value
    
//     const inserted = insertUsers(name, lastname, phone, email, password)
//         .then(inserted => {
//             if(inserted) {
//                 loginBtn.hidden = true
//                 logout.hidden = false
//                 username.hidden = false
//                 username.innerHTML = `Welcome ${name}`
//                 registerForm.reset()
//                 $('#registerModal').modal('hide')
//             }else {
//                 incorrectRegister.style.display = "block"
//             }
//         })
    
// })

// async function insertUsers(name, lastname, phone, email, password) {
//     const user = await verifyUser(email)
//     if(!user) {
//         await setDoc(doc(db, 'users', email), {
//             name: name,
//             lastname: lastname,
//             phone: phone,
//             email: email,
//             password: password,
//             type: 'cliente'
//         })
//         return true
//     }else {
//         return false
//     }
// }

// const verifyUser = async (email) => {
//     const docRef = doc(db, 'users', email)
//     const docSnap = await getDoc(docRef)
//     return await docSnap.exists() ?  true : false;
// }



// 1633496400000