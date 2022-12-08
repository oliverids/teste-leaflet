const map = L.map('map').setView([-20.32, -40.33], 4);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 12,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let popupContent;

fetch('./pontos.json').then(r => r.json()).then(r => {

  for (let i = 0; i < r.length; i++) {
    popupContent = `<a href="#${r[i].nome}"><h2>${r[i].nome}</h2></a>`;

    L.marker([r[i].lat, r[i].lon]).addTo(map).bindPopup(popupContent);


    let uniSection = document.createElement('section');
    uniSection.id = `#${r[i].nome}`;
    uniSection.classList.add('secao-uni');
    uniSection.innerHTML = `
      <h2>${r[i].nome}</h2>
      <p>Aqui terão informações sobre a ${r[i].nome}.</p>
    `;
    document.getElementById('about').appendChild(uniSection);
  }
})

map.on('popupopen', function (e) {
  var marker = e.popup._source._popup._content,
    anchor = marker.substring(
      marker.indexOf('"') + 1,
      marker.lastIndexOf('">'));

  document.querySelectorAll('.secao-uni').forEach(e => e.classList.remove('ativo'));
  document.getElementById(anchor).classList.add('ativo');
});

