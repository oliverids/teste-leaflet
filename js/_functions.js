export const universidades = await fetch('https://deno-api-fake.deno.dev/api/universidade').then(r => r.json());

export const users = await fetch('https://deno-api-fake.deno.dev/api/users').then(r => r.json());

export const zonas = await fetch('./ZonasData.json').then(r => r.json());

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

export default { universidades, users, zonas, createIcon, selectMap}