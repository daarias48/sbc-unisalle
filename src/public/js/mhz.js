import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var firebaseConfig = {
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
initializeApp(firebaseConfig);

const temp = document.getElementById('tempMhz');
const co2 = document.getElementById('co2');
const hum = document.getElementById('hMhz');
const date = document.getElementById('dateMhz');

const dbRef = getDatabase();
const reference = ref(dbRef, 'sensoresbajocosto/mhz19c')
onValue(reference, (snap) => {
    let mhz = snap.val()
    temp.innerHTML = mhz.temperatura
    co2.innerHTML = mhz.co2
    date.innerHTML = mhz.fecha
    hum.innerHTML = mhz.humedad
})
