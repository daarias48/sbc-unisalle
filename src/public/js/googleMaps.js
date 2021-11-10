let map;
let markerClarity
let markerModul
let markerModul2
let markerNubo
let markerEva

function initMap() {
  const coords = {
    lat: 4.7499,
    lng: -74.0333
  }

  const coordsModul = {lat: 4.749, lng: -74.033}
  const coordsModul2 = {lat: 4.749, lng: -74.0336}
  const coordsClarity = {lat: 4.750, lng: -74.033}
  const coordsNubo = {lat: 4.749, lng: -74.034}
  const coordsEva = {lat: 4.750, lng: -74.034}

  map = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: 16,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  const infoClarity =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Clarity</h1>' +
    '<div id="bodyContent">' +
    '<p><a href="./clarity">' +
    "Information clarity</a></p>" +
    "</div>" +
    "</div>";
  const infoModul =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">ModulPM</h1>' +
    '<div id="bodyContent">' +
    '<p><a href="./modulair-pm">' +
    "Information modulair</a></p>" +
    "</div>" +
    "</div>";
  const infoModul2 =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">ModulairPM 2</h1>' +
    '<div id="bodyContent">' +
    '<p><a href="./modulair-pm2">' +
    "Information modulairPM2</a></p>" +
    "</div>" +
    "</div>";
  const infoNubo =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Nuboair</h1>' +
    '<div id="bodyContent">' +
    '<p><a href="./nuboair">' +
    "Information Nuboair</a></p>" +
    "</div>" +
    "</div>";
  const infoEva =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Eva</h1>' +
    '<div id="bodyContent">' +
    '<p><a href="./eva">' +
    "Information Eva</a></p>" +
    "</div>" +
    "</div>";

  const infowindowClarity = new google.maps.InfoWindow({
    content: infoClarity,
    maxWidth: 200,
  });
  const infowindowModul = new google.maps.InfoWindow({
    content: infoModul,
    maxWidth: 200,
  });
  const infowindowModul2 = new google.maps.InfoWindow({
    content: infoModul2,
    maxWidth: 200,
  });
  const infowindowNubo = new google.maps.InfoWindow({
    content: infoNubo,
    maxWidth: 200,
  });
  const infowindowEva = new google.maps.InfoWindow({
    content: infoEva,
    maxWidth: 200,
  });
  
  markerClarity = new google.maps.Marker({
    position: coordsClarity,
    map: map,
    title: 'Clarity'
  })
  markerClarity.addListener('click', () => {
    infowindowClarity.open({
      anchor: markerClarity,
      map,
      shouldFocus: false,
    })
  })
  markerClarity.setAnimation(google.maps.Animation.BOUNCE)

  markerModul = new google.maps.Marker({
    position: coordsModul,
    map: map,
    title: 'ModulairPM'
  })
  markerModul.setAnimation(google.maps.Animation.BOUNCE)
  markerModul.addListener('click', () => {
    infowindowModul.open({
      anchor: markerModul,
      map,
      shouldFocus: false,
    })
  })

  markerModul2 = new google.maps.Marker({
    position: coordsModul2,
    map: map,
    title: 'ModulairPM2'
  })
  markerModul2.setAnimation(google.maps.Animation.BOUNCE)
  markerModul2.addListener('click', () => {
    infowindowModul2.open({
      anchor: markerModul2,
      map,
      shouldFocus: false,
    })
  })

  markerNubo = new google.maps.Marker({
    position: coordsNubo,
    map: map,
    title: 'Nubo'
  })
  markerNubo.setAnimation(google.maps.Animation.BOUNCE)
  markerNubo.addListener('click', () => {
    infowindowNubo.open({
      anchor: markerNubo,
      map,
      shouldFocus: false,
    })
  })

  markerEva = new google.maps.Marker({
    position: coordsEva,
    map: map,
    title: 'Eva',
  })
  markerEva.setAnimation(google.maps.Animation.BOUNCE)
  markerEva.addListener('click', () => {
    infowindowEva.open({
      anchor: markerEva,
      map,
      shouldFocus: false,
    })
  })
  
}