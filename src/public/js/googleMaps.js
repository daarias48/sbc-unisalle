import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var map;

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

// Initialize Firebase
initializeApp(firebaseConfig);

let marker
function initMap() {
  const coords = {
    lat: 4.645257295775558,
    lng: -74.11301851098555
  }

  map = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: 16,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  const icaCounts = [0.0, 51.0, 101.0, 151.0, 201.0, 301.0, 500.0]
  const pm25Counts = [0.0, 12.0, 37.0, 55.0, 150.0, 250.0, 500.0]

  const db = getDatabase()
  const myRef = query(ref(db, 'sensors/modulairPm'), limitToLast(1))
  onValue(myRef, (data) => {
    data.forEach((doc) => {
      const modulair = doc.val()
      let ica
      for(let i = 0; i < icaCounts.length - 1; i++) {
        if(modulair.pm25 >= pm25Counts[i] && modulair.pm25 < pm25Counts[i + 1]) {
          ica = ((modulair.pm25 - pm25Counts[i]) * (icaCounts[i + 1] - icaCounts[i]) / (pm25Counts[i + 1] - pm25Counts[i])) + icaCounts[i]
        }
      }
      let color
      if(ica >= 0 && ica <= 50) color = '#39c227'
      if(ica > 50 && ica <= 100) color = '#fcc438'
      if(ica > 100 && ica <= 150) color = '#EF8D22'
      if(ica > 150 && ica <= 200) color = '#f00'
      if(ica > 200 && ica <= 300) color = '#834187'
      if(ica > 300 && ica <= 500) color = '#754106'

      const info =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h5 id="firstHeading" class="firstHeading">Ubicacion: Edificio Teusaca</h5>' +
        '<h6 id="firstHeading" class="firstHeading">Datos en tiempo real</h6>' +
        '<div id="bodyContent">' +
        `<p style="display: inline-block; color: #000; padding: 2px 5px; background-color: ${color};">Índice de calidad de aire ICA: ${ica.toFixed(0)}  </p>` +
        `<p>PM1: ${modulair.pm1} µg/m3 </p>` +
        `<p>PM10: ${modulair.pm10} µg/m3 </p>` +
        `<p>PM2.5: ${modulair.pm25} µg/m3 </p>` +
        `<p>Fecha: ${modulair.date} Hora: ${modulair.hour}</p>` +
        "</div>" +
        "</div>";
      
      const infowindow = new google.maps.InfoWindow({
        content: info,
        maxWidth: 400,
      });
      
      marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: 'Sensor'
      })
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      })
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      })
      marker.setAnimation(google.maps.Animation.BOUNCE)
    })
  }, { onlyOnce: true })
}

export default initMap()
