import React from 'react';
import { useState } from 'react';
import {useParams, useLocation} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ReviewForm from '../components/ReviewForm';
import styles from './Reviews.module.css'
import ReviewData from '../components/ReviewData';
import { useEffect, useRef } from 'react';
import ReviewCard from '../components/ReviewCard';

export default function Reviews() {

  const location = useLocation();
  const movieID = useParams().movieID;

  const [reviewsCollection, setReviewsCollection] = useState(null); // State to hold reviews obtained via API

  // Object to hold movie data passed in from routing location state
  const data = {
    movieData: null,
    reviewData: null
  }
  
  // Assign movieData from state to object if state exists
  if (location.state.movieData) {
    data.movieData = location.state.movieData;
  }

  // Assign shorthand constants for data properties
  const movieData = data.movieData;
  const posterPath = movieData.poster_path? movieData.poster_path : null;
  const backdropPath = movieData.backdrop_path? movieData.backdrop_path : null;
  const movieTitle = movieData.title? movieData.title : null;

  // store incoming review data if present - would be coming from navigation on form click of 'Edit' button
  if (location.state.reviewData) {
    data.reviewData = location.state.reviewData;
  } 

  let dt = new Date() // To be used as a key to rerender ReviewData upon form submission
  
  let formData = null;

  // Form data passed in by location state via navigate hook upon form submission
  if (location.state.formData !== undefined) {
    formData = location.state.formData
  }

  const getRandomKey = () => {
    return parseInt(Math.random());
  }

  const GetReviews = () => {
    let elements = [];
    
    if (reviewsCollection) {
      for (let index = 0; index < reviewsCollection.length; index++) {
        elements.push(
          <ReviewCard reviewData={reviewsCollection[index]} movieData={movieData} styles={styles} key={index} readOnly={true}/>
        )
      }
    }
      
    return elements
  }

  // let keyForData = getRandomKey();
  // let keyForReviewCards = getRandomKey();
  
  // useEffect(() => {
  //   if (reviewsCollection) {
  //     console.log('reviewsCollection');
  //     keyForData = getRandomKey();
  //     keyForReviewCards = getRandomKey();

  //   }
  // }, [reviewsCollection])

  return (
    <>
      <ReviewData {...{movieID}} key={formData} formData={formData} movieData={movieData} setState={setReviewsCollection} /> 
      <div className='container-fluid bg-dark m-auto' style={{position: 'relative'}}>
        <div className='bg-dark m-auto justify-content-center' style={{position: 'fixed', zIndex: 0, left: '-200vw', right: '-200vw', overflow: 'hidden', margin: 'auto'}}>
          <img src={backdropPath} style={{height: '100svh', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} alt="backdrop"/>
        </div>
        <div className='row'>&nbsp</div>
        <div className='d-flex-fluid flex-row m-auto'>
            <div></div>
            <div>
              <Card className='m-auto text-primary' style={{minHeight: '100svh', opacity: .9, width: '80vw'}}>
                <Card.Header as='h3'>
                  Viewer Reviews
                </Card.Header>
                <Card.Title className='mt-4 text-secondary'>
                  <h1>{movieTitle}</h1>
                </Card.Title>
                <Card.Body className='m-auto'>
                  
                  {/* if reviewdata not null, then reviewform will prepopulate with passed-in review data */}
                  <ReviewForm styles={styles} key={dt} movieData={movieData} reviewData={data.reviewData} readOnly={false}/>
                  
                  {/* Existing reviews will show below review submission form using the same component as form to give consistant look throughout */}
                  {reviewsCollection != null? <GetReviews /> : null}
                
                </Card.Body>

              </Card>
            </div>
            <div></div>
        </div>
        <div className='row'>&nbsp</div>
      </div>
    </>
  )
}
