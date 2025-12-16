const WEATHER_API_KEY = 'b9f451d568e3475692a94415250412'; 
const CITY_NAME = 'Mumbai';
const MAP_LAT = 19.0760;   
const MAP_LON = 72.8777; 
const MAP_ZOOM = 13;   


async function fetchWeather() {
    const weatherInfoDiv = document.getElementById('weather-info');
    
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${CITY_NAME}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const location = data.location.name;
        const temp_c = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;

        weatherInfoDiv.innerHTML = `
            <h3>${location}, ${data.location.country}</h3>
            <img src="${icon}" alt="${condition}">
            <p>Temperature: <strong>${temp_c}°C</strong></p>
            <p>Condition: <strong>${condition}</strong></p>
            <p>Last Updated: ${data.current.last_updated.substring(11, 16)}</p>
        `;

    } catch (error) {
        console.error("Could not fetch weather data: ", error);
        weatherInfoDiv.innerHTML = `<p style="color: red;">Failed to load weather data. Please check the API key or network connection.</p>`;
    }
}

function initMap() {
    if (!document.getElementById('mapid')) {
        console.error("Map container with ID 'mapid' not found.");
        return;
    }

    const mymap = L.map('mapid').setView([MAP_LAT, MAP_LON], MAP_ZOOM);
    
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

 
    L.marker([MAP_LAT, MAP_LON])
        .addTo(mymap) 
        .bindPopup(`<b>${CITY_NAME}</b><br>My Residence City.`) 
        .openPopup();
}

async function loadHobbies() {
    try {
        const response = await fetch('http://localhost:3000/api/hobbies');
        const result = await response.json();

        const hobbyList = document.getElementById('hobby-list');
        hobbyList.innerHTML = '';

        result.data.forEach(hobby => {
            const li = document.createElement('li');
            li.textContent = hobby;
            hobbyList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading hobbies:", error);
    }
}

async function loadContact() {
    try {
        const response = await fetch('http://localhost:3000/api/contact');
        const result = await response.json();

        const contactList = document.getElementById('contact-list');
        contactList.innerHTML = '';

        for (let key in result.data) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${result.data[key]}`;
            contactList.appendChild(li);
        }
    } catch (error) {
        console.error("Error loading contact:", error);
    }
}

 

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    initMap();
    loadHobbies();
    loadContact();      
});