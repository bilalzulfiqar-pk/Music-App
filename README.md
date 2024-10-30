# Music App 🎶

A sleek web-based music player that fetches, organizes, and plays audio files directly from a folder structure. The app supports dynamic playlists and song libraries, offering seamless navigation, playlist organization, and volume control with a minimalist interface.

## Features

- **Fetch and Play Songs**: Loads audio files from specified folders and plays them in a player with controls.
- **Dynamic Playlists**: Automatically fetches playlists from folders, each with its own cover and metadata.
- **Responsive Interface**: Features a side-tab library for easy song and playlist navigation.
- **Playback Controls**: Play, pause, previous, next, and volume controls with a functional seek bar.
- **Auto-Updating UI**: Displays the currently playing song and artist.

## Project Structure

- **HTML**: The main structure for the interface with containers for playlists, songs, and the player.
- **CSS**: Styling for responsive layout and design elements (see `css/styles.css`).
- **JavaScript**: Contains logic for fetching, displaying, and controlling songs and playlists (`js/script.js`).

## Usage

1. **Run the Project**: Clone the repository and serve it using a local server to avoid CORS issues when fetching local files.
2. **Organize Media**: Place media files in `/media/<folder-name>` with the following structure:
   - Audio files (`.mp3`) with naming format `"Song - Artist"`.
   - A JSON file (`info.json`) for each folder to store playlist metadata (e.g., `{ "name": "Playlist Name" }`).
   - Cover images (`cover.jpeg`) for each playlist.
3. **Playlists and Song Library**: Upon loading, the app fetches available playlists, displaying each as a selectable card.

## JavaScript Functions

- **`loadFolders()`**: Fetches available folders as playlists from the `/media/` directory.
- **`getNames(folder)`**: Retrieves song names from a specified folder.
- **`loadSongs(folder)`**: Displays songs in a playlist and plays the selected one.
- **`playSong(folder, song)`**: Initiates audio playback for a selected song.
- **Controls**: Includes functions to control volume, play, pause, and navigate through songs.

## Requirements

- **Local Server**: A local server (like [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)) is recommended for testing and development.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/music-app.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd music-app
    ```

3. **Start a local server**: A local server is recommended for proper functionality, as it allows the app to fetch files without CORS restrictions. If you use Live Server for VS Code, simply right-click `index.html` and select "Open with Live Server."

4. **Open the app in your browser**: Your app should now be running locally and accessible via your web browser.



## Acknowledgements

- Icons and images are located in the `svg/` directory.
- Audio management is powered by JavaScript’s built-in `Audio()` API.
