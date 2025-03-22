// Mock API response
function getMockAnimeData() {
  // Array of possible anime data
  const animeData = [
    {
      title: "Attack on Titan",
      episode: 5,
      season: 1,
      timestamp: "12:45",
      confidence: 98,
      clipUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      synopsis:
        "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to cleanse the world of the giant humanoid Titans that have brought humanity to the brink of extinction.",
    },
    {
      title: "My Hero Academia",
      episode: 12,
      season: 2,
      timestamp: "18:22",
      confidence: 95,
      clipUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      synopsis:
        "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk. After being the only one to try and save his childhood bully from a villain, Izuku is given a Quirk by the world's greatest Hero, All Might.",
    },
    {
      title: "Demon Slayer",
      episode: 19,
      season: 1,
      timestamp: "21:09",
      confidence: 92,
      clipUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      synopsis:
        "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    },
    {
      title: "One Piece",
      episode: 278,
      season: 8,
      timestamp: "14:37",
      confidence: 87,
      clipUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      synopsis:
        "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named 'One Piece'.",
    },
    {
      title: "Naruto Shippuden",
      episode: 167,
      season: 4,
      timestamp: "08:52",
      confidence: 91,
      clipUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      synopsis:
        "Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.",
    },
  ]

  // Return a random anime from the array
  return animeData[Math.floor(Math.random() * animeData.length)]
}

// This would be replaced with actual API call in a real application
// Example of what the real API call might look like:
/*
async function searchAnimeByImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await fetch('https://api.animeframerecognition.com/search', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
}
*/

