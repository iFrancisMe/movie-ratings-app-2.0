import React from 'react'
import Card from 'react-bootstrap/Card';
import RatingsCard from './RatingsCard';
import PosterUnavailable from './PosterUnavailable';

export default function MovieCard(props) {
    const styles = props.styles;
    const movieData = {...props}.data
    
    // If poster url not available from API data, we replace with image placeholder from external source
    // This is disabled currently in favor of swaping poster for custom component resembline a poster placeholder.
    // Re-enable and disable ternary block and re-enable img tag to revert to external image if component proves unwieldy
    
    const posterPath = (movieData.poster_path !== null) ? movieData.poster_path : 'https://placehold.co/500x750';
    
    return (
        <div className={`d-flex w-100 flex-row m-auto ${styles.movieCardDiv}`}>
            <div style={{margin: 'auto'}}>&nbsp;</div>
                <div>
                    <Card className={`d-flex flex-sm-row flex-column ${styles.movieCard}`}>
                        
                        {/* Disable block if custom component does not maintain responsiveness */}
                        {
                            (movieData.poster_path !== null)
                            ?
                            <img src={movieData.poster_path} className={styles.movieCardImage} alt='poster' />
                            :
                            <div className={styles.movieCardImageAlt}>
                                <PosterUnavailable />
                            </div>
                        }
                        
                        {/* Re-enable img tag here if disabling block above */}
                        {/* <img src={posterPath} className={styles.movieCardImage} alt='poster' /> */}

                        <Card.Body className={styles.movieCardBody} >
                            <Card.Title className={styles.movieCardTitle}>
                                {movieData.title}
                            </Card.Title>
                            <Card.Text className={styles.movieCardText}>
                                {movieData.overview}
                            </Card.Text>
                            <RatingsCard {...{movieData}} styles={styles}/>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{margin: 'auto'}}>&nbsp;</div>
        </div>
    )
}
