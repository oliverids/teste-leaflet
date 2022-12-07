const map = L.map('map').setView([-20.32, -40.33], 4);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 12,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// const marker = L.marker([-20.32, -40.33]).addTo(map)
//   .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();
let popupContent;

fetch('./pontos.json').then(r => r.json()).then(r => {

  for (let i = 0; i < r.length; i++) {
    popupContent = `<a href="#${r[i].nome}"><h2>${r[i].nome}</h2></a>`;

    L.marker([r[i].lat, r[i].lon]).addTo(map).bindPopup(popupContent);


    let uniSection = document.createElement('section');
    uniSection.id = `#${r[i].nome}`;
    uniSection.classList.add('secao-uni');
    uniSection.innerHTML = `<h2>${r[i].nome}</h2>`;
    document.getElementById('about').appendChild(uniSection);
  }
})

// L.DomEvent.addListener(popupEvent, 'click', function(event){
//   console.log(event.target)
// });

map.on('popupopen', function (e) {
  var marker = e.popup._source._popup._content,
    anchor = marker.substring(
      marker.indexOf('"') + 1,
      marker.lastIndexOf('">'));

  document.querySelectorAll('.secao-uni').forEach(e => e.classList.remove('ativo'));
  document.getElementById(anchor).classList.add('ativo');
});

// const circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(map).bindPopup('I am a circle.');

// const polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(map).bindPopup('I am a polygon.');


// const popup = L.popup()
//   .setLatLng([51.513, -0.09])
//   .setContent('I am a standalone popup.')
//   .openOn(map);

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent(`You clicked the map at ${e.latlng.toString()}`)
//     .openOn(map);
// }

// map.on('click', onMapClick);

