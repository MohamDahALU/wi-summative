# Anime Frame Finder

Anime Frame Finder is a web application that allows users to upload a screenshot from an anime and identify the anime, episode, and timestamp from the image. The app uses the [Trace.moe API](https://soruly.github.io/trace.moe-api/) to search for anime data and the [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2/) to fetch detailed information about the identified anime.

## Features

- **Image Upload**: Users can upload an anime screenshot via drag-and-drop or file selection.
- **Anime Identification**: The app identifies the anime, episode, and timestamp from the uploaded image.
- **Detailed Information**: Displays detailed information about the anime, including:
  - Title
  - Episode number
  - Timestamp
  - Match confidence
  - Synopsis
  - Cover image
- **Video Clip**: Displays a short video clip of the identified scene (if available).
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **APIs**:
  - [Trace.moe API](https://soruly.github.io/trace.moe-api/) for anime identification.
  - [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2/) for fetching detailed anime information.
- **Server**: Nginx (for hosting the application).

## How It Works

1. **Upload Image**: Users upload an anime screenshot.
2. **Search Anime**: The app sends the image to the Trace.moe API to identify the anime.
3. **Fetch Details**: Once the anime is identified, the app uses the AniList GraphQL API to fetch detailed information about the anime.
4. **Display Results**: The app displays the anime title, episode, timestamp, match confidence, synopsis, and cover image.

## Setup Instructions

1. **Clone the Repository**:
```bash
git clone https://github.com/MohamDahALU/wi-summative.git
```

2. **Open index.html in the Browser**

3. **Enjoy!**


