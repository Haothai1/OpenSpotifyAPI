# OpenSpotifyAPI
## Description
This project demonstrates how to load and display data from the Spotify API using HTML, CSS, JavaScript, and TypeScript. The app will require you use an API key to login to a spotify account then display the user profile information and the top five songs of the user.


## Setup
If you do not already have Git and NodeJS install it:
1. Download Git to use git commands: https://git-scm.com/downloads
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/dd98b725-e9f3-4000-b7f6-c82c407116a5' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
2. Install nodeJS: https://nodejs.org/en/download/package-manager
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/7a1e6ba2-7168-476a-9bc6-f6035aa62255' title='Video Walkthrough' width='350' alt='Video Walkthrough' />

## Setting up the environment to run OpenSpotifyAPI:
3. Download or clone this repository to your local machine by typing in your terminal:
   ```sh
   git clone https://github.com/Haothai1/OpenSpotifyAPI.git
   ```
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/40f84c4a-d929-4550-80ef-60463b7e1dd5' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/81c6038e-dfc6-44fb-9ce9-7df4255a88d2' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/49836f6e-dd6b-4a07-9e03-ecf0962ef782' title='Video Walkthrough' width='350' alt='Video Walkthrough' />

4. Open the project in VScode if you haven't already. You can do so in the terminal:
   ```sh
   code OpenSpotifyAPI
   ```
   
## Run the APP locally with your own API key:
5. Create an SpotifyWeb account: https://developer.spotify.com/
   * Login to your Spotify Account (this email will be used for both your Spotify account and the Spotify web API access) and click on your user icon.
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/1eecd622-0711-40d0-8a75-493a8c9a908a' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
   * Verify your account with your email.
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/7f99115f-5b44-44dd-874d-3d2d7f29f072' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
   * Create your API Key.
     <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/1a29dd16-7661-40cb-948b-c7a86524b282' title='Video Walkthrough' width='350' alt='Video Walkthrough' />

6. Copy and paste your Client ID (or API key) in index.js file. The index.js file can be found under the src folder.
   (Note: You can skip this step if you send the owner your email to give you access to use their key instead of creating your own API key)
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/728de01e-fce9-435d-877e-97f61e1e76fd' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
   <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/cd4e0a6c-cc54-4840-989d-6cf0b1e0a678' title='Video Walkthrough' width='350' alt='Video Walkthrough' />
   

7. 4. Make sure you are in the directory of the project in the terminal:
   ```sh
   cd OpenSpotifyAPI
   ```
   
8. Now install npm to use npm packages and commands by typing:
   ```sh
   npm i
   ```

9. Go to the terminal and install Vite by typing:
   ```sh
   npm install vite
   ```

10. Run the app by typing:
   ```sh
   npm run dev
   ```

11. Click on the provided link after running npm run dev.
    <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/cfb14298-5415-49c5-ae8b-5c4e91e269c3' title='Video Walkthrough' width='350' alt='Video Walkthrough' />


12. You will be brought to a web page. Sign-in to the Spotify email you used for your Spotify web API to get your user profile information and Top 5 songs.
    (Note: Using two separate emails will not work, they must be the same email for both your Spotify account and the Spotify Web API).
    <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/b3bd7436-5347-49de-809c-c1b02585c914' title='Video Walkthrough' width='350' alt='Video Walkthrough' />

## Troubleshooting (No data is displayed)
1. Relaunch the application by going to the terminal and pressing ctrl+c and typing npm run dev if there are any issues.
    <img src='https://github.com/Haothai1/OpenSpotifyAPI/assets/100315684/39dfcfe2-5107-43c4-9227-bbbe9448a146' title='Video Walkthrough' width='350' alt='Video Walkthrough' />



## Usage
- The application will redirect you to the Spotify authorization page.
- Authorize the application to access your profile data.
- Your Spotify profile data will be displayed once you are redirected back.
- Navigate between the "Show Profile" and "Show Top Tracks". This will show your user profile and your top 5 songs you listen to.
