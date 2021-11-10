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

const tempTower1 = document.getElementById('tempTower1');
const pm1Tower1 = document.getElementById('pm1Tower1');
const pm25Tower1 = document.getElementById('pm25Tower1');
const pm10Tower1 = document.getElementById('pm10Tower1');
const humTower1 = document.getElementById('humTower1');
const dateTower1 = document.getElementById('dateTower1');

const tempTower2 = document.getElementById('tempTower2');
const pm1Tower2 = document.getElementById('pm1Tower2');
const pm25Tower2 = document.getElementById('pm25Tower2');
const pm10Tower2 = document.getElementById('pm10Tower2');
const humTower2 = document.getElementById('humTower2');
const dateTower2 = document.getElementById('dateTower2');

const dbRef = getDatabase();

const referenceTower1 = ref(dbRef, 'sensoresbajocosto/plantower1')
onValue(referenceTower1, (snap) => {
    let tower1 = snap.val()
    tempTower1.innerHTML = tower1.temperatura
    humTower1.innerHTML = tower1.humedad
    dateTower1.innerHTML = tower1.fecha
    pm1Tower1.innerHTML = tower1.PM10
    pm25Tower1.innerHTML = tower1.PM25
    pm10Tower1.innerHTML = tower1.PM100
})

const referenceTower2 = ref(dbRef, 'sensoresbajocosto/plantower2')
onValue(referenceTower2, (snap) => {
    let tower2 = snap.val()
    tempTower2.innerHTML = tower2.temperatura
    humTower2.innerHTML = tower2.humedad
    dateTower2.innerHTML = tower2.fecha
    pm1Tower2.innerHTML = tower2.PM10
    pm25Tower2.innerHTML = tower2.PM25
    pm10Tower2.innerHTML = tower2.PM100
})

