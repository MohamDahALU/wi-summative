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

### Local Setup

1. **Clone the Repository**:
```bash
git clone https://github.com/MohamDahALU/wi-summative.git
```

2. **Open index.html in the Browser**

### Server Setup

1. **Install nginx**
```bash
sudo apt-get update
sudo apt-get install nginx -y
```

2. **Clone the repository in /var/www/html/**
```bash
cd /var/www/html/ 
sudo git init
sudo git remote add origin https://github.com/MohamDahALU/wi-summative.git
sudo git pull origin main
```

3. **Restart nginx**
```bash
sudo service nginx restart
```


## How it was deployed
### For web servers (nginx)

1. Do initial installation and configuration of nginx.

2. Move to "/var/www/html/", initialize as git repository, set origin to "https://github.com/MohamDahALU/wi-summative.git", then pull the project from the repository. 

3. Change "/etc/nginx/sites-available/default" to include:
    ```
    location /results {
        try_files $uri /results.html;
    }
    ```
    to handle results route.

4. Restart nginx

### For loader balancer (haproxy)

1. Install haproxy.

2. Add lines to configuration file to handle requests and distribute them to each web server we have.

3. Generate SSL certificate for our domain to allow https connections.

4. Change configuration file to handle https requests, and to redirect http to https.
