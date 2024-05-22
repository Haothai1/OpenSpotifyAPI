/* src/script.js */
document.addEventListener('DOMContentLoaded', () => {
    const clientId = "ccf07b7dcb7940ee8a1d732c7da2a87f"; // Replace with your client ID
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        getAccessToken(clientId, code).then(accessToken => {
            setupUIHandlers(accessToken);
            fetchProfile(accessToken).then(profile => {
                populateProfileUI(profile);
                showSection("profile");
            });
        });
    }
});

function setupUIHandlers(accessToken) {
    document.getElementById("showProfile").addEventListener("click", () => {
        fetchProfile(accessToken).then(profile => {
            populateProfileUI(profile);
            showSection("profile");
        });
    });

    document.getElementById("showTopTracks").addEventListener("click", () => {
        getTopTracks(accessToken).then(tracks => {
            populateTopTracksUI(tracks);
            showSection("topTracks");
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });
    const data = await response.json();
    return data.access_token;
}

async function fetchProfile(accessToken) {
    return fetchWebApi('v1/me', 'GET', null, accessToken);
}

async function getTopTracks(accessToken) {
    const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET', null, accessToken);
    console.log(data); // Check what the API returns
    return data.items; // Ensure this is the correct path to the array of tracks

    // return fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET', null, accessToken);
}

async function fetchWebApi(endpoint, method, body, token) {
    const headers = { Authorization: `Bearer ${token}` };
    if (method === 'POST' && body) headers['Content-Type'] = 'application/json';

    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    });
    return await response.json();
}

function populateProfileUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name || 'N/A';
    document.getElementById("id").innerText = profile.id || 'N/A';
    document.getElementById("email").innerText = profile.email || 'N/A';
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify || '#');
    document.getElementById("url").setAttribute("href", profile.href || '#');

    // Access the <img> element directly
    const avatar = document.getElementById("avatar");

    // Check if there are images and use the first one, otherwise use the default
    if (profile.images && profile.images.length > 0) {
        avatar.src = profile.images[0].url;
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    } else {
        avatar.src = 'img/spotify_default.png'; // Ensure this path is correct
        document.getElementById("imgUrl").innerText = 'Default image used';
    }
}


function populateTopTracksUI(tracks) {
    const tracksList = document.getElementById("tracksList");
    tracksList.innerHTML = '';  // Clear existing tracks
    if (!tracks || tracks.length === 0) {
        tracksList.innerHTML = '<li>No tracks available</li>';
        return;
    }
    tracks.forEach(track => {
        const listItem = document.createElement("li");
        listItem.innerText = `${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
        tracksList.appendChild(listItem);
    });
}
