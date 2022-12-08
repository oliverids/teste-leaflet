const universidades = await fetch('https://deno-api-fake.deno.dev/api/universidade').then(r => r.json()),
    users = await fetch('https://deno-api-fake.deno.dev/api/users').then(r => r.json());

let popupContent;

const secaoAbout = document.querySelector('#about .container');

//UNIVERSIDADES FETCH
let uniArray = [];

for (let i = 0; i < universidades.length; i++) {
    popupContent = `<a href="#${universidades[i].nome}"><h2>${universidades[i].nome}</h2></a>`;

    let marker = L.marker([universidades[i].lat, universidades[i].lon]).bindPopup(popupContent);
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

    let marker = L.marker([users[i].address.geo.lat, users[i].address.geo.lng]).bindPopup(popupContent);
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

const map = L.map('map', {
    center: [-20.32, -40.33],
    zoom: 4,
    layers: [uniLayer, userLayer]
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

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

uniLayer.addTo(map); //layer inicial a ser mostrada
map.removeLayer(userLayer) // layer a ser escondida inicialmente

const overlayMaps = {
    "Universidades": uniLayer,
    "Pesquisadores": userLayer
}

let layerControl = L.control.layers(overlayMaps);

const uniBtn = document.getElementById('universidades'),
    userBtn = document.getElementById('users');

[uniBtn, userBtn].forEach(each => {
    each.addEventListener('click', e => {
        if (each == uniBtn) {
            userBtn.classList.remove('ativo');
            uniBtn.classList.add('ativo');
            map.removeLayer(userLayer)
            map.addLayer(uniLayer)

        } else {
            uniBtn.classList.remove('ativo');
            userBtn.classList.add('ativo');
            map.removeLayer(uniLayer)
            map.addLayer(userLayer)
        }
    })
})


