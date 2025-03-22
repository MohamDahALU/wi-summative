document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const uploadedImage = document.getElementById("uploaded-image")
  const animeTitle = document.getElementById("anime-title")
  const animeEpisode = document.getElementById("anime-episode")
  const animeTimestamp = document.getElementById("anime-timestamp")
  const animeSeason = document.getElementById("anime-season")
  const matchConfidence = document.getElementById("match-confidence")
  const animeClip = document.getElementById("anime-clip")
  const animeSynopsis = document.getElementById("anime-synopsis")

  // Get uploaded image from localStorage
  const imageData = localStorage.getItem("uploadedImage")
  if (imageData) {
    uploadedImage.src = imageData
  } else {
    // Redirect back to upload page if no image
    window.location.href = "index.html"
  }

  // Mock Anime Data (for demonstration purposes)
  function getMockAnimeData() {
    return {
      title: "Attack on Titan",
      episode: 5,
      timestamp: "12:34",
      season: 1,
      confidence: 85,
      clipUrl: "https://example.com/clip.mp4",
      synopsis:
        "In a world where humanity lives inside cities surrounded by enormous walls that protect them from gigantic humanoids referred to as Titans, the story follows Eren Yeager, his adopted sister Mikasa Ackerman, and their friend Armin Arlert, whose lives are forever changed after the appearance of a colossal Titan brings about the destruction of their home town.",
    }
  }





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
  }
}
`;


  async function getAnimeData() {
    const animeData = JSON.parse(localStorage.getItem("animeData"))

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




    console.log(animeData)
    console.log(details)

    animeTitle.textContent = details.title.english
    animeEpisode.textContent = `Episode ${animeData.episode}`

    let seconds = Math.floor(animeData.from) % 60
    let minutes = Math.floor(animeData.from / 60)
    animeTimestamp.textContent = `${minutes}:${seconds}`
    // animeSeason.textContent = `Season ${response.season}`
    matchConfidence.textContent = `${Math.round(animeData.similarity * 100)}%`
    animeClip.src = animeData.video
    animeSynopsis.innerHTML = details.description

    // Add confidence color
    if (Math.round(animeData.similarity * 100) >= 90) {
      matchConfidence.classList.add("high-confidence")
    } else if (Math.round(animeData.similarity * 100) >= 70) {
      matchConfidence.classList.add("medium-confidence")
    } else {
      matchConfidence.classList.add("low-confidence")
    }
  }

  getAnimeData()

  // Simulate API response
  // setTimeout(() => {
  //   // Get mock API response
  //   const response = getMockAnimeData()

  //   // Update UI with response data
  //   animeTitle.textContent = response.title
  //   animeEpisode.textContent = `Episode ${response.episode}`
  //   animeTimestamp.textContent = response.timestamp
  //   animeSeason.textContent = `Season ${response.season}`
  //   matchConfidence.textContent = `${response.confidence}%`
  //   animeClip.src = response.clipUrl
  //   animeSynopsis.textContent = response.synopsis

  //   // Add confidence color
  //   if (response.confidence >= 90) {
  //     matchConfidence.classList.add("high-confidence")
  //   } else if (response.confidence >= 70) {
  //     matchConfidence.classList.add("medium-confidence")
  //   } else {
  //     matchConfidence.classList.add("low-confidence")
  //   }
  // }, 1000)
})

