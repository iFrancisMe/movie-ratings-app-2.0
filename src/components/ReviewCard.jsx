import React from 'react'
import ReviewForm from './ReviewForm';

export default function ReviewCard(props) {

    const data = props.reviewData;
    const styles = (props.styles)? props.styles : null;

    const reviewObj = {
        reviewAuthor: data.author,
        reviewDate: (new Date(data.date)).toLocaleDateString(), // Convert date to locale date string
        reviewContent: data.content,
        rating: data.rating,
        id: data.id
    }
    
    return (
        <ReviewForm styles={styles} movieData={props.movieData} reviewData={reviewObj} readOnly={props.readOnly}/>
    )
}
