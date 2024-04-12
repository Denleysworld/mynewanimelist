const url = 'https://api.jikan.moe/v4';

function search() {
  const animeName = document.getElementById('anime-name').value;
  fetch(`${url}/anime?q=${animeName}`)
    .then(response => response.json())
    .then(data => {
      let counter = 0;
      data.data.forEach(item => {
        if (counter < 3) {
          const anime = item;
          const imageUrl = item.images;
          const animeResultsDiv = document.createElement('div');
          animeResultsDiv.innerHTML = `
            <p></p>
            <img src ="${imageUrl.jpg.image_url}">
            <p><b>Title:</b> ${anime.title}</p>
            <p><b>Local Name:</b> ${anime.title_japanese} <p>
            <p><b>Synopsis:</b> ${anime.synopsis}</p>
            <p><b>Type:</b> ${anime.type}</p>
            <p><b>Total Episodes:</b> ${anime.episodes}</p>
          `;
          document.getElementById('animeResults').appendChild(animeResultsDiv);
          counter++;
        } else {
          return; 
        }
      });
    });
}
