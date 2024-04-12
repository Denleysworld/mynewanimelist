const url = 'https://api.jikan.moe/v4';
let currentPage = 1;
const resultsPerPage = 3;

function search() {
  const animeName = document.getElementById('anime-name').value;
  fetch(`${url}/anime?q=${animeName}&page=${currentPage}&limit=${resultsPerPage}`)
    .then(response => response.json())
    .then(data => {
      const animeResults = document.getElementById('animeResults');
      animeResults.innerHTML = ''; // Clear previous results

      data.data.forEach(item => {
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
        animeResults.appendChild(animeResultsDiv);
      });

      if (data.data.length === 0) {
        animeResults.innerHTML = "<p>No results found.</p>";
      }

      if (data.data.length < resultsPerPage) {
        document.getElementById('load-more-btn').style.display = 'none';
      } else {
        document.getElementById('load-more-btn').style.display = 'block';
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const animeResults = document.getElementById('animeResults');
      animeResults.innerHTML = "<p>An error occurred. Please try again later.</p>";
    });
}

function loadMore() {
  currentPage++;
  search();
}

function clearResults() {
  document.getElementById('anime-name').value = '';
  document.getElementById('animeResults').innerHTML = '';
}

document.getElementById('search-btn').addEventListener('click', search);
document.getElementById('clear-btn').addEventListener('click', clearResults);
document.getElementById('load-more-btn').addEventListener('click', loadMore);
