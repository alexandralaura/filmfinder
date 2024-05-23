import logo from './logo.svg';
import './App.css';

function App() {
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
