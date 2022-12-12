export const universidades = await fetch('https://deno-api-fake.deno.dev/api/universidade').then(r => r.json());

export const users = await fetch('https://deno-api-fake.deno.dev/api/users').then(r => r.json());


export function createIcon(icon) {
    let markerIcon = L.icon({
        iconUrl: `public/img/${icon}.png`,
        iconSize: [30, 43], // size of the icon
        iconAnchor: [16, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [15, -90] // point from which the popup should open relative to the iconAnchor
    });

    return markerIcon;
}

export function clickMapOverlay(botao1, botao2, layer1, layer2, map,) {
    const btn1 = document.getElementById(botao1),
        btn2 = document.getElementById(botao2);

    [btn1, btn2].forEach(each => {
        each.addEventListener('click', e => {
            if (each == btn1) {
                btn2.classList.remove('ativo');
                btn1.classList.add('ativo');
                map.removeLayer(layer2)
                map.addLayer(layer1)

            } else {
                btn1.classList.remove('ativo');
                btn2.classList.add('ativo');
                map.removeLayer(layer1)
                map.addLayer(layer2)
            }
        })
    })
}

export default { universidades, users, createIcon, clickMapOverlay}