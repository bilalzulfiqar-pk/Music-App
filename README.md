# Music App 🎶  

A sleek web-based music player that fetches, organizes, and plays audio files. The app supports dynamic playlists and song libraries, offering seamless navigation, playlist organization, and volume control with a minimalist interface.  

## Live Demo  

[View the Music App on GitHub Pages](https://bilalzulfiqar-pk.github.io/Music-App/)

## Features  

- **Fetch and Play Songs**: Loads audio files from specified folders and plays them in a player with controls.  
- **Dynamic Playlists**: Automatically fetches playlists from a structured folder system.  
- **Responsive Interface**: Features a side-tab library for easy song and playlist navigation.  
- **Playback Controls**: Play, pause, previous, next, and volume controls with a functional seek bar.  
- **Auto-Updating UI**: Displays the currently playing song and artist.  

## Project Structure  

- **HTML**: The main structure for the interface with containers for playlists, songs, and the player.  
- **CSS**: Styling for responsive layout and design elements (see `css/styles.css`).  
- **JavaScript**: Handles fetching, displaying, and controlling songs and playlists (`js/script.js`).  

## Usage  

1. **Run the Project**: Open the deployed **GitHub Pages** link in a browser.  
2. **Organize Media**: The app loads audio files directly from an accessible directory structure.  
3. **Playlists and Song Library**: On loading, the app fetches available playlists, displaying them as selectable cards.  

## JavaScript Functions  

- **`loadPlaylists()`**: Fetches available playlists from the app's storage.  
- **`getSongs(playlist)`**: Retrieves songs from the selected playlist.  
- **`loadSongs(playlist)`**: Displays songs in a playlist and plays the selected one.  
- **`playSong(playlist, song)`**: Initiates audio playback for a selected song.  
- **Controls**: Includes functions for volume control, play, pause, and navigation.  

## Requirements  

- **GitHub Pages Deployment**: No local server required. The app is accessible directly via the GitHub Pages URL.  

## Installation (For Local Development)  

1. **Clone the repository**:  

    ```bash
    git clone https://github.com/your-username/music-app.git
    ```

2. **Navigate to the project directory**:  

    ```bash
    cd music-app
    ```

3. **Start a local server** (for testing changes before deployment):  
   - If using VS Code, install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).  
   - Right-click `index.html` and select **"Open with Live Server"**.  

4. **Access the app**: Open the local server link in your browser to see changes before deploying.  

## Acknowledgements  

- Icons and images are located in the `svg/` directory.  
- Audio management is powered by JavaScript’s built-in `Audio()` API.  
