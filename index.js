const url = 'https://api.jikan.moe/v4';
let currentPage = 1;
const resultsPerPage = 1;

function search() {
  const animeName = document.getElementById('anime-name').value;
  document.getElementById('anime-name').value = '';
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
        animeResults.innerHTML = `
          <p>No more results.</p>
          <form id="post-form">
            <label for="anime-title">Anime Title:</label><br>
            <input type="text" id="anime-title" name="anime-title"><br>
            <label for="synopsis">Synopsis:</label><br>
            <textarea id="synopsis" name="synopsis"></textarea><br>
            <button type="submit">Submit</button>
          </form>
        `;
        document.getElementById('load-previous-btn').style.display = 'block';
        document.getElementById('load-more-btn').style.display = 'none';
      } else {
        document.getElementById('load-previous-btn').style.display = 'block';
        document.getElementById('load-more-btn').style.display = 'block';
      }

      document.getElementById('page-number').textContent = `Page ${currentPage}`;

      // Scroll to the top of the results
      animeResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

function loadPrevious() {
  if (currentPage > 1) {
    currentPage--;
    search();
  }
}

function clearResults() {
  document.getElementById('anime-name').value = '';
  document.getElementById('animeResults').innerHTML = '';
  document.getElementById('load-previous-btn').style.display = 'none';
  document.getElementById('load-more-btn').style.display = 'none';
  currentPage = 1;
}

function postData(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById('post-form'));
  const animeTitle = formData.get('anime-title');
  const synopsis = formData.get('synopsis');
}

  fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ animeTitle, synopsis })
  })
    .then(response => {
      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        throw new Error('Failed to save data');
      }
    })
    .catch(error => {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    });


const bgMusic = document.getElementById('bg-music');


function toggleBackgroundMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}


const header = document.querySelector('header');
header.addEventListener('click', toggleBackgroundMusic);


document.getElementById('search-btn').addEventListener('click', search);
document.getElementById('clear-btn').addEventListener('click', clearResults);
document.getElementById('load-more-btn').addEventListener('click', loadMore);
document.getElementById('load-previous-btn').addEventListener('click', loadPrevious);
document.getElementById('post-form').addEventListener('submit', postData);
