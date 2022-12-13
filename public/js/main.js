import { universidades, users, zonas, macros, createIcon, selectMap } from "./_functions.js";


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

//ZONAS DE CRESCIMENTO
let ZonasArray = [];

for (let i = 0; i < zonas.length; i++) {
    popupContent = `<a href="#${zonas[i].nome}"><h2>${zonas[i].nome}</h2></a>`;

    let circle = L.circle([zonas[i].lat, zonas[i].lng], {
        color: '#822AB2',
        fillColor: '#822AB2',
        fillOpacity: 0.5,
        radius: zonas[i].radius
    }).bindPopup(popupContent);
    ZonasArray.push(circle);

    let uniSection = document.createElement('section');
    uniSection.id = `#${zonas[i].nome}`;
    uniSection.classList.add('secao-uni');
    uniSection.innerHTML = `
        <h2>${zonas[i].nome}</h2>
        <p>Aqui terão informações sobre a ${zonas[i].nome}.</p>
      `;
    secaoAbout.appendChild(uniSection);
}
const ZonasLayer = L.layerGroup([...ZonasArray]);

//ZONAS DE CRESCIMENTO
let MacrosArray = [];

for (let i = 0; i < macros.length; i++) {
    popupContent = `<a href="#${macros[i].nome}"><h2>${macros[i].nome}</h2></a>`;

    let valueFiltered = Object.values(macros[i]).filter(value => typeof value === 'object'),
        polygonArray = [];

    for (let i = 0; i < valueFiltered.length; i++) {
        polygonArray.push(valueFiltered[i])
    }

    const polygon = L.polygon(polygonArray).bindPopup(popupContent);

    MacrosArray.push(polygon);

    let uniSection = document.createElement('section');
    uniSection.id = `#${macros[i].nome}`;
    uniSection.classList.add('secao-uni');
    uniSection.innerHTML = `
        <h2>${macros[i].nome}</h2>
        <p>Aqui terão informações sobre a ${macros[i].nome}.</p>
      `;
    secaoAbout.appendChild(uniSection);
}
const MacrosLayer = L.layerGroup([...MacrosArray]);

const map = L.map('map', {
    center: [-20.32, -40.33],
    zoom: 4,
    layers: [uniLayer, userLayer, MacrosLayer, ZonasLayer]
});

map.on('popupopen', function (e) {
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
}).addTo(map);

uniLayer.addTo(map); //layer inicial a ser mostrada
[userLayer, ZonasLayer, MacrosLayer].forEach(each => map.removeLayer(each)); // layers a serem escondidas inicialmente

const overlayMaps = {
    "Universidades": uniLayer,
    "Pesquisadores": userLayer,
    "Macro Regiões": MacrosLayer,
    "Zonas de Crescimento": ZonasLayer
}

L.control.layers(overlayMaps);

const selectOptions = document.getElementById('selectOptions');
selectOptions.addEventListener('change', () => {
    let selectedOverlay = selectOptions.value;

    switch (true) {
        case selectedOverlay == 'users':
            [uniLayer, ZonasLayer, MacrosLayer].forEach(each => map.removeLayer(each));
            map.addLayer(userLayer)
            break;

        case selectedOverlay == 'universidades':
            [userLayer, ZonasLayer, MacrosLayer].forEach(each => map.removeLayer(each));
            map.addLayer(uniLayer)
            break;

        case selectedOverlay == 'zonas':
            [userLayer, uniLayer, MacrosLayer].forEach(each => map.removeLayer(each));
            map.addLayer(ZonasLayer)
            break;

        case selectedOverlay == 'macros':
            [userLayer, uniLayer, ZonasLayer].forEach(each => map.removeLayer(each));
            map.addLayer(MacrosLayer)
            break;

        default:
            break;
    }

})