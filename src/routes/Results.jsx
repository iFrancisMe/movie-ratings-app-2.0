import React from 'react'
import MovieCard from '../components/MovieCard';
import stylesDefault from './Results.module.css';
import {useLocation, Routes, RouterProvider, Link, useNavigate} from 'react-router-dom';

function ResultsCards(props) {
  
  let styles = props.styles;
  let movieData = props.movieData;

  let collection = [];
    for (let index = 0; index < movieData.length; index++) {
        let obj = movieData[index];

        collection.push(
          <MovieCard data={obj} styles={styles} key={obj.id}/>
        )
    }

    return collection
}

export default function Results(props) {
  const location = useLocation();

  let movieData = null;

  if (location.state !== null && location.state.data !== undefined) {
    movieData = location.state.data;
  } else {
    movieData = props.collection;
  }

  let styles = stylesDefault;

  if (props.styles !== undefined) {
    // Override styles module with parent defined styles
    styles = props.styles; 
  }

  return (
    <>
      {movieData? <ResultsCards {...{movieData}} styles={styles}/> : null}
    </>
  )
}
