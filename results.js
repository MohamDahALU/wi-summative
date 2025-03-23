document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const uploadedImage = document.getElementById("uploaded-image")
  const animeTitle = document.getElementById("anime-title")
  const animeEpisode = document.getElementById("anime-episode")
  const animeTimestamp = document.getElementById("anime-timestamp")
  // const animeSeason = document.getElementById("anime-season")
  const matchConfidence = document.getElementById("match-confidence")
  const animeClip = document.getElementById("anime-clip")
  const animeSynopsis = document.getElementById("anime-synopsis")
  const banner = document.querySelector(".banner")



  const query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
    description
    coverImage {
      large
    }
  }
}
`;


  async function getAnimeData() {
    const animeData = JSON.parse(localStorage.getItem("animeData"))
    if (!animeData) {
      window.location.href = "index.html"
    }
    
    var variables = {
      id: animeData.anilist
    };
    
    let url = 'https://graphql.anilist.co'
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };
    
    
    
    const res = await fetch(url, options)
    const { data: { Media: details } } = await res.json()
    
    uploadedImage.src = animeData.image
    
    animeTitle.textContent = details.title.english
    animeEpisode.textContent = `Episode ${animeData.episode}`

    let seconds = Math.floor(animeData.from) % 60
    let minutes = Math.floor(animeData.from / 60)
    animeTimestamp.textContent = `${minutes}:${seconds}`
    matchConfidence.textContent = `${Math.round(animeData.similarity * 100)}%`
    animeClip.src = animeData.video
    animeSynopsis.innerHTML = details.description
    banner.src = details.coverImage.large

    // Add confidence color
    if (Math.round(animeData.similarity * 100) >= 90) {
      matchConfidence.classList.add("high-confidence")
    } else if (Math.round(animeData.similarity * 100) >= 80) {
      matchConfidence.classList.add("medium-confidence")
    } else {
      matchConfidence.classList.add("low-confidence")
    }
  }

  getAnimeData()

})

