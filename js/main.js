import { universidades, users, createIcon, clickMapOverlay } from "./_functions.js";

let popupContent;

const secaoAbout = document.querySelector('#about .container');

//UNIVERSIDADES FETCH
let uniArray = [];

for (let i = 0; i < universidades.length; i++) {
    popupContent = `<a href="#${universidades[i].nome}"><h2>${universidades[i].nome}</h2></a>`;

    let uniIcon = createIcon('uni');

    let marker = L.marker([universidades[i].lat, universidades[i].lon], { icon: uniIcon }).bindPopup(popupContent);
    uniArray.push(marker);

    let uniSection = document.createElement('section');
    uniSection.id = `#${universidades[i].nome}`;
    uniSection.classList.add('secao-uni');
    uniSection.innerHTML = `
        <h2>${universidades[i].nome}</h2>
        <p>Aqui terão informações sobre a ${universidades[i].nome}.</p>
      `;
    secaoAbout.appendChild(uniSection);
}
const uniLayer = L.layerGroup([...uniArray]);

// console.log(L.Icon.Default.prototype.options)

//USERS FETCH
let userArray = [];

for (let i = 0; i < users.length; i++) {
    popupContent = `<a href="#${users[i].name}"><h2>${users[i].name}</h2></a>`;

    let userIcon = createIcon('user');

    let marker = L.marker([users[i].address.geo.lat, users[i].address.geo.lng], { icon: userIcon }).bindPopup(popupContent);
    userArray.push(marker);

    let uniSection = document.createElement('section');
    uniSection.id = `#${users[i].name}`;
    uniSection.classList.add('secao-uni');
    uniSection.innerHTML = `
        <h2>${users[i].name}</h2>
        <p><strong>Usuário:</strong> @${users[i].username}</p>
        <p><strong>E-mail:</strong> ${users[i].email}</p>
        <p><strong>Telefone:</strong> ${users[i].phone}</p>
        <p><strong>Website:</strong> ${users[i].website}</p>
        <p><strong>Empresa:</strong> ${users[i].company.name}</p>

      `;
    secaoAbout.appendChild(uniSection);
}
const userLayer = L.layerGroup([...userArray]);

const map1 = L.map('map1', {
    center: [-20.32, -40.33],
    zoom: 4,
    layers: [uniLayer, userLayer]
});

map1.on('popupopen', function (e) {
    var marker = e.popup._source._popup._content,
        anchor = marker.substring(
            marker.indexOf('"') + 1,
            marker.lastIndexOf('">'));

    let ChosenSection = document.getElementById(anchor);
    document.querySelectorAll('.secao-uni').forEach(e => e.classList.remove('ativo'));
    ChosenSection.classList.add('ativo');
    setTimeout(() => ChosenSection.scrollIntoView({ block: "start", behavior: "smooth" }), 10);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map1);

uniLayer.addTo(map1); //layer inicial a ser mostrada
map1.removeLayer(userLayer) // layer a ser escondida inicialmente

const overlayMaps = {
    "Universidades": uniLayer,
    "Pesquisadores": userLayer
}

L.control.layers(overlayMaps);

clickMapOverlay('universidades', 'users', uniLayer, userLayer, map1);