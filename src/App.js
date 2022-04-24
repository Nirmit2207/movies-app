import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';

import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'https://www.omdbapi.com?apikey=1fb22392'

function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('Jurassic Park')
  const [debouncedValue] = useDebounce(searchTerm, 500)

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    
    data.Response !== 'False' && setMovies(data.Search)
  }

  useEffect(() => {
    (debouncedValue !== '') && searchMovies(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="app">
      <h1>MoviesHere</h1>

      <div className="search">
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" />
      </div>

      {
        movies.length > 0 ?
          (<div className="container">
            {movies.map(movie => <MovieCard movie={movie} key={movie.imdbID} />)}
          </div>) : (<div className="empty">
            <h2>No movies found</h2>
          </div>)
      }

      <footer>
        Created with 💛 by <a href="http://nirmitcodes.netlify.app">Nirmit</a>
      </footer>

    </div>
  );
}

export default App;
