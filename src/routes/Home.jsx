import React, { useState } from 'react'
import MovieData from '../components/MovieData';
import MovieCarousel from '../components/MovieCarousel';
import stylesDefault from './Home.module.css'
import Results from './Results';

import {useLocation} from 'react-router-dom';

export default function Home(props) {

  const [movieData, setMovieData] = useState(null);
  let styles = stylesDefault;
  
  if (props.styles !== undefined) {
    styles = props.styles;
  } 

  // MovieData component handles fetch using the options defined below and sets state here
  const fetchOptions = {
    setState: setMovieData,
    url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    resourceType: 'movies',
    action: 'New Movies'
  }

  // Possible override of backdrop image for carousel with poster image
  const imageOverride = props.imageOverride;

  return (
    <>
      <MovieData {...{fetchOptions}} />
      <div>
        <div className={`jumbotron bg-secondary py-3 display-6 bg-danger ${styles.marqueeDiv}`}>
          <div className={styles.marquee}>Now Playing in Theaters</div>
        </div>
        {(movieData !== null)? <MovieCarousel collection={movieData} styles={styles} fade={(props.fade)? true : false} imageOverride={imageOverride} /> : <p>Loading</p>}
      </div>
      {(movieData !== null)? <Results collection={movieData} styles={props.styles? styles : undefined} /> : <p>Loading</p>}
    </>
  )
}
