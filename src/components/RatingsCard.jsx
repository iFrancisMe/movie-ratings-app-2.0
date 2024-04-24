import React from 'react';
import {useState, useRef, useEffect} from 'react';
import Star from './Star';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const Rating = (props) => {
    // Numerical Rating Score displayed on card
    return [<div className={props.styles.ratingsScore} key={props.score}>{props.score} Stars</div>]
}

// Calculate 5-star rating equivelent from score out of 10 from API data and build Star component
const MovieRating = (props) => {
    const parameters = props.ratingParameters;
    const score = parameters.score;
     
    let avgBase10 = score; // Score from API data based out of 10
    let scoreBase5 = (avgBase10 / 2).toFixed(1); // Convert to base 5 float
    let fullStarCount = parseInt(scoreBase5); // Parse integer to get full star count
    let halfStarCount = (scoreBase5 > fullStarCount) ? 1 : 0; // Remaining decimal if any is represented by a half-filled star

    // Assemble group of stars SVG using 5 Star components based on calculated 5-star score
    let starRating = [];

    for (let index = 0; index < 5; index++) {
        if (index < fullStarCount) {
            starRating.push(<Star key={index} starType={'filled'}/>);
        } else if (halfStarCount > 0) {
            starRating.push(<Star key={index} starType={'halfFilled'}/>);
            halfStarCount--;
        } else {
            starRating.push(<Star key={index} starType={'noFill'}/>)
        }
    }

    // Assign numerical score to ref via callback passed into props
    if (props.setVal !== undefined) props.setVal(scoreBase5);

    // Returns rating score as Star component representing rating
    return starRating;
};

export default function RatingsCard(props) {

    // const [reviewCollection, setReviewCollection] = useState(null);
    const [score, setScore] = useState(null);
    const rating = useRef(null)

    // For navigating to Reviews component
    const navigate = useNavigate();

    const movieID = props.movieData.id;
    const movieScore = props.movieData.vote_average;
    const styles = props.styles;

    // Parameters for building Star rating component
    const ratingParameters = {
        id: movieID,
        score: movieScore
    }

    // If review data present, display individual review score instead of overall movie score
    if (props.reviewData) {
        ratingParameters.score = props.reviewData.rating;
    }

    // callback function for MovieRating component to store calculated score value
    const setRatingValue = (value) => {
        rating.current = value;
    }

    //update score state value to update rendering of score
    useEffect(() => {
        if (!score) setScore(rating)
    }, [rating])

    const handleClick = () => {
        navigate(`/reviews/${movieID}`, {
            state: {
                movieData: props.movieData 
            }
        })
    }

    return (
        <div className='m-auto'>
            
            <Card className={styles.ratingsCard} onMouseEnter={props.onHover}>
                <Link to={`/reviews/${movieID}`} state={{movieData: props.movieData}} className={styles.ratingsHeader}>
                    Click for Reviews
                </Link>
                <Card.Header as='h6' className={styles.ratingsHeader}>
                    <div onClick={handleClick}>Movie Ratings</div>
                </Card.Header>
                <Card.Title className={styles.ratingsStars}>
                    <MovieRating {...{ratingParameters}} setVal={setRatingValue} />
                    {score? <Rating score={rating.current} styles={styles} key={movieID}/> : null}
                </Card.Title>
            </Card>

        </div>
    )
}
