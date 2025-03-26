# Anime Frame Finder

Anime Frame Finder is a web application that allows users to upload a screenshot from an anime and identify the anime, episode, and timestamp from the image. The app uses the [Trace.moe API](https://soruly.github.io/trace.moe-api/) to search for anime data and the [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs) to fetch detailed information about the identified anime.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Links](#links)
- [How It Works](#how-it-works)
- [Setup Instructions](#setup-instructions)
  - [Local Setup](#local-setup)
  - [Server Setup](#server-setup)
- [How it was deployed](#how-it-was-deployed)
  - [For web servers (nginx)](#for-web-servers-nginx)
  - [For loader balancer (haproxy)](#for-loader-balancer-haproxy)
- [Development Challenges](#development-challenges)
  - [Image Handling Between Pages](#image-handling-between-pages)

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
  - [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs) for fetching detailed anime information.
- **Server**: Nginx (for hosting the application).

## Links

- **Live Site**: [Anime Frame Finder](https://www.swiftq.tech)
- **Demo Video**: [Demo Video](https://youtu.be/856Tv58nKe0)
- **Repository**: [GitHub Repository](https://github.com/MohamDahALU/wi-summative)

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

5. Restart haproxy.

## Development Challenges

### Image Handling Between Pages

One of the main challenges faced during development was handling image uploads across different pages. Since the application is a client-side only solution without a backend server for storage, maintaining the uploaded image data while navigating between pages required creative solutions:

- **Using localStorage**: To persist the uploaded image between pages, the application encodes the image as a base64 string and stores it in the browser's localStorage before navigating to the results page.
  
- **Managing Large Images**: Since localStorage has size limitations, the application needed to implement validation for image sizes and properly handle potential failures.

- **Cross-Page Communication**: Ensuring that the results page could seamlessly access data from the upload page required careful structuring of the localStorage data and proper error handling.

- **Handling Different Routes**: The application needed special configuration in Nginx to handle the routing between pages while maintaining state, particularly for the results route.

These challenges led to a more robust implementation using client-side storage techniques to create a seamless user experience despite the stateless nature of the web.
