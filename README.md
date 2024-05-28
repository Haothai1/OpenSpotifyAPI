# OpenSpotifyAPI
## Description
This project demonstrates how to load and display data from the Spotify API using HTML, CSS, JavaScript, and TypeScript. The app will require you use an API key to login to a spotify account then display the user profile information and the top five songs of the user.

## Run the APP locally with your own API key:
1. Create an SpotifyWeb account: https://developer.spotify.com/
2. Paste your Client ID (API key) in index.js file. The index.js file can be found under the src folder.
   (Note: You can skip this step if you send the owner your email to give you access to use their key instead of creating your own API key)

## Setup
If you do not already have Git install it:
1. Download Git to use git commands: https://git-scm.com/downloads


## Setting up the environment to run OpenSpotifyAPI:
1. Download or clone this repository to your local machine by typing:
   ```sh
   git clone https://github.com/Haothai1/OpenSpotifyAPI.git
   ```
2. Go to the directory of the file:
   ```sh
   cd OpenSpotifyAPI
   ```
3. Install nodeJS: https://nodejs.org/en/download/package-manager
4. Now install npm to use npm packages and commands by typing:
   ```sh
   npm i
   ```
5. Go to the terminal and install Vite by typing:
   ```sh
   npm install vite
   ```
6. Run the app by typing:
   ```sh
   npm run dev
   ```
7. Click on the provided link after running npm run dev.
7. Sign-in to spotify to get your user profile information and Top 5 songs.
9. Relaunch the application by going to the terminal and pressing ctrl+c and typing npm run dev if there are any issues.


## Usage
- The application will redirect you to the Spotify authorization page.
- Authorize the application to access your profile data.
- Your Spotify profile data will be displayed once you are redirected back.
- Navigate between the "Show Profile" and "Show Top Tracks". This will show your user profile and your top 5 songs you listen to.
