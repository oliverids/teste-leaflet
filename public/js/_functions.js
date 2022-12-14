export const universidades = await fetch('https://deno-api-fake.deno.dev/api/universidade').then(r => r.json());

export const users = await fetch('https://deno-api-fake.deno.dev/api/users').then(r => r.json());

export const zonas = await fetch('./ZonasData.json').then(r => r.json());

export const macros = await fetch('./MacrosData.json').then(r => r.json());

export function createIcon(icon) {
    let markerIcon = L.icon({
        iconUrl: `public/img/${icon}.png`,
        iconSize: [30, 43], // size of the icon
        iconAnchor: [16, 41], // point of the icon which will correspond to marker's location
        // popupAnchor: [15, -90] // point from which the popup should open relative to the iconAnchor
        popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor

    });

    return markerIcon;
}

export default { universidades, users, zonas, macros, createIcon }