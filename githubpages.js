//github aparentemente n tem suporte pra ES modules então fiz um arquivo inteirão
//isso ou eu fiz merda

export const universidades = await fetch('https://deno-api-fake.deno.dev/api/universidade').then(r => r.json());

export const users = await fetch('https://deno-api-fake.deno.dev/api/users').then(r => r.json());

export const zonas = await fetch('./ZonasData.json').then(r => r.json());

export const macros = await fetch('./MacrosData.json').then(r => r.json());

export function createIcon(icon) {
    let markerIcon = L.icon({
        iconUrl: `public/img/${icon}.png`,
        iconSize: [30, 43], // size of the icon
        iconAnchor: [16, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [15, -90] // point from which the popup should open relative to the iconAnchor
    });

    return markerIcon;
}

export function selectMap() {
    const selectOptions = document.getElementById('selectOptions');
    selectOptions.addEventListener('change', () => {
        let selectedOverlay = selectOptions.value;
    
        switch (true) {
            case selectedOverlay == 'users':
                map.removeLayer(uniLayer)
                map.addLayer(userLayer)
                break;
        
            case selectedOverlay == 'universidades': 
                map.removeLayer(userLayer)
                map.addLayer(uniLayer)
            break;
    
            default:
                break;
        }
    
    })
}

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

    // for(let ponto = 3; ponto <= Object.keys(macros[i]).length; ponto++) {
    //     console.log(Object.keys(macros[i]).length);

    //     // const polygon = L.polygon([
    //     //     [macros[i].ponto1[0], macros[i].ponto1[1]],
    //     //     [macros[i].ponto2[0], macros[i].ponto2[1]],
    //     //     [macros[i].ponto3[0], macros[i].ponto3[1]],
    //     // ]).bindPopup(popupContent);

    //     // myObject[ + i] = foo;
    // }

    // console.log(macros[i].ponto4);

    const polygon = L.polygon([
        [macros[i].ponto1[0], macros[i].ponto1[1]],
        [macros[i].ponto2[0], macros[i].ponto2[1]],
        [macros[i].ponto3[0], macros[i].ponto3[1]],
        // ... macros[i].ponto4 ? [macros[i].ponto4[0], macros[i].ponto4[1]] : [],
    ]).bindPopup(popupContent);

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
map.removeLayer(userLayer) // layer a ser escondida inicialmente
map.removeLayer(ZonasLayer) // layer a ser escondida inicialmente
map.removeLayer(MacrosLayer) // layer a ser escondida inicialmente

const overlayMaps = {
    "Universidades": uniLayer,
    "Pesquisadores": userLayer,
    "Macro Regiões": MacrosLayer,
    "Zonas de Crescimento": ZonasLayer
}

L.control.layers(overlayMaps);

// clickMapOverlay('universidades', 'users', uniLayer, userLayer, map);

// selectMap()

const selectOptions = document.getElementById('selectOptions');
selectOptions.addEventListener('change', () => {
    let selectedOverlay = selectOptions.value;

    switch (true) {
        case selectedOverlay == 'users':
            map.removeLayer(uniLayer)
            map.removeLayer(ZonasLayer)
            map.removeLayer(MacrosLayer)
            map.addLayer(userLayer)
            break;

        case selectedOverlay == 'universidades':
            map.removeLayer(userLayer)
            map.removeLayer(ZonasLayer)
            map.removeLayer(MacrosLayer)
            map.addLayer(uniLayer)
            break;

        case selectedOverlay == 'zonas':
            map.removeLayer(userLayer)
            map.removeLayer(uniLayer)
            map.removeLayer(MacrosLayer)
            map.addLayer(ZonasLayer)
            break;

        case selectedOverlay == 'macros':
            map.removeLayer(userLayer)
            map.removeLayer(uniLayer)
            map.removeLayer(ZonasLayer)
            map.addLayer(MacrosLayer)
            break;

        default:
            break;
    }

})
