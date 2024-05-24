import logo from './logo.svg';
import './App.css';

function App() {
  const tmdbKey = '0a0dbedd502073680a351228731d1148';
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const playBtn = document.getElementById('playBtn');
  const getGenres = async () => {
    const genreRequestEndpoint = 
  '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  
  } catch(error) {
    console.log(error)
  }
  };
  const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

  const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('genres').value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById('likeOrDislikeBtns');
  btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen


// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('id', 'moviePoster');

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};
getGenres().then(populateGenreDropdown);
const getMovies = async () => {
  const selectedGenre = document.getElementById('genres').value;
  const discoverMovieEndpoint ='/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch =`${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
   const response = await fetch(urlToFetch);
   if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const movies = jsonResponse.movies;
    
   
    return movies;
   }
  } catch(error) {
     console.log(error)
  }
};
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch =`${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (error) {
     console.log(error);
  }

};
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  console.log(movies);
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  //const randomMovie = getRandomMovie(movies);
  console.log(randomMovie);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};
playBtn.onclick = showRandomMovie();
  return (
    <>
    <body>
    <header>
      <h1 id="appTitle">🍿Film Finder🍿</h1>
    </header>
    <form id="genreForm">
      <label>Choose a genre:</label>
      <select name="genres" id="genres">
      </select>
    </form>
    <button id="playBtn">Let's Play!</button>
    <div id="movieInfo">
      <div id="moviePoster"></div>
      <div id="movieText"></div>
    </div>
    <div id="likeOrDislikeBtns" hidden>
      <button id="likeBtn"><i class="fa-solid fa-thumbs-up"></i></button>
      <button id="dislikeBtn"><i class="fa-solid fa-thumbs-down"></i></button>
    </div>
  </body>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>  
  );
}

export default App;
