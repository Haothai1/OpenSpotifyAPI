document.addEventListener('DOMContentLoaded', () => {
    // Set your Spotify Client ID here
    const clientId = "ccf07b7dcb7940ee8a1d732c7da2a87f"; // Replace with your client ID here
    
    // Retrieve the URL search parameters
    const params = new URLSearchParams(window.location.search);
    
    // Get the authorization code from the URL parameters
    const code = params.get("code");

    // If the authorization code is not present, redirect to the Spotify authorization flow
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        // If the authorization code is present, exchange it for an access token
        getAccessToken(clientId, code).then(accessToken => {
            console.log("Access Token:", accessToken); // Debugging: Log the access token
            // Setup UI event handlers with the access token
            setupUIHandlers(accessToken);
            // Fetch the user's Spotify profile using the access token
            fetchProfile(accessToken).then(profile => {
                console.log("Profile Data:", profile); // Debugging: Log the profile data
                // Populate the UI with the user's profile information
                populateProfileUI(profile);
                // Show the profile section in the UI
                showSection("profile");
            }).catch(error => {
                console.error("Error fetching profile:", error); // Debugging: Log any errors fetching the profile
            });
        }).catch(error => {
            console.error("Error getting access token:", error); // Debugging: Log any errors getting the access token
        });
    }
});

function setupUIHandlers(accessToken) {
    // Set up the event handler for the "Show Profile" button
    document.getElementById("showProfile").addEventListener("click", () => {
        // Fetch the user's profile again when the button is clicked
        fetchProfile(accessToken).then(profile => {
            console.log("Profile Data on Button Click:", profile); // Debugging: Log the profile data on button click
            // Populate the UI with the user's profile information
            populateProfileUI(profile);
            // Show the profile section in the UI
            showSection("profile");
        }).catch(error => {
            console.error("Error fetching profile on button click:", error); // Debugging: Log any errors fetching the profile on button click
        });
    });

    // Set up the event handler for the "Show Top Tracks" button
    document.getElementById("showTopTracks").addEventListener("click", () => {
        // Fetch the user's top tracks when the button is clicked
        getTopTracks(accessToken).then(tracks => {
            console.log("Top Tracks Data:", tracks); // Debugging: Log the top tracks data
            // Populate the UI with the user's top tracks
            populateTopTracksUI(tracks);
            // Show the top tracks section in the UI
            showSection("topTracks");
        }).catch(error => {
            console.error("Error fetching top tracks:", error); // Debugging: Log any errors fetching the top tracks
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    // Show the specified section
    document.getElementById(sectionId).style.display = 'block';
}

async function redirectToAuthCodeFlow(clientId) {
    // Generate a code verifier and challenge for PKCE
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    // Store the verifier in local storage
    localStorage.setItem("verifier", verifier);
    
    // Build the URL parameters for the authorization request
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    // Redirect the user to the Spotify authorization page
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    // Generate a random code verifier of the specified length
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    // Generate a code challenge from the code verifier
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    // Retrieve the code verifier from local storage
    const verifier = localStorage.getItem("verifier");
    
    // Build the URL parameters for the token request
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    // Make the token request to the Spotify API
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });
    if (!response.ok) {
        console.error(`Failed to get access token: ${response.statusText}`);
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
}

async function fetchProfile(accessToken) {
    // Fetch the user's profile using the provided access token
    return fetchWebApi('v1/me', 'GET', null, accessToken);
}

async function getTopTracks(accessToken) {
    // Fetch the user's top tracks using the provided access token
    const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET', null, accessToken);
    console.log(data); // Debugging: Log the top tracks data
    return data.items; // Ensure this is the correct path to the array of tracks
}

async function fetchWebApi(endpoint, method, body, token) {
    // Build the headers for the API request
    const headers = { Authorization: `Bearer ${token}` };
    if (method === 'POST' && body) headers['Content-Type'] = 'application/json';

    // Make the API request to the specified endpoint
    console.log(`Fetching ${endpoint} with token:`, token); // Debugging: Log the endpoint and token
    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    });
    if (!response.ok) {
        console.error(`Error fetching ${endpoint}:`, response.statusText); // Debugging: Log any errors fetching the endpoint
    }
    return await response.json();
}

function populateProfileUI(profile) {
    // Populate the profile UI with the user's profile information
    document.getElementById("displayName").innerText = profile.display_name || 'N/A';
    document.getElementById("id").innerText = profile.id || 'N/A';
    document.getElementById("email").innerText = profile.email || 'N/A';

    // Set the Spotify URI link
    const spotifyUri = profile.external_urls ? profile.external_urls.spotify : 'N/A';
    console.log("Spotify URI:", spotifyUri); // Debugging: Log the Spotify URI
    const uriElement = document.getElementById("uri");
    uriElement.innerText = spotifyUri;
    uriElement.setAttribute("href", spotifyUri);
    uriElement.setAttribute("target", "_blank");

    // Set the profile avatar image
    const avatar = document.getElementById("avatar");
    if (profile.images && profile.images.length > 0) {
        avatar.src = profile.images[0].url;
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    } else {
        avatar.src = 'img/spotify_default.png'; // Ensure this path is correct
        document.getElementById("imgUrl").innerText = 'Default image used';
    }
}

function populateTopTracksUI(tracks) {
    // Populate the top tracks UI with the user's top tracks
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
