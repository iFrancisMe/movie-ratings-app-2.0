import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react'
// import MovieData from './MovieData'; // Was initially going to use existing reviews from TMDB API, hence component
import {useNavigate} from 'react-router-dom'

export default function ReviewData(props) {
    
    // const [TMDBReviews, setTMDBReviews] = useState(null); // State for collecting review data from TMDB API
    
    const navigate = useNavigate();

    const movieID = props.movieID; // ID to reference movie
    const formData = useRef(props.formData); // Form submission data passed in as props

    const submitMockReview = async (dataObject) => {
        console.log('Submit')
        // If form data not present, abort routine
        if (!formData.current) return null;

        let id = dataObject.id; // Mock API id of resource

        // Options for fetch request. If form data includes record id, then method is PUT, otherwise POST for new review
        const url = `https://65eca26b0ddee626c9b0bb03.mockapi.io/api/v1/Movies/${id? id : ''}`
        const options = {
            method: `${ (id === null) ? 'POST' : (dataObject.delete) ? 'DELETE' : 'PUT' 
                /* If no id then is new record to POST, else if delete property then DELETE, else update with PUT */
                }`, 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataObject)
        }

            // Create or update record. If form includes id value, then it is not new, so update
            await fetch(url, options)
                .then(res => console.log(res))
                .then(getMockReviews()) // Get updated reviews collection
                // Then navigate via router to current page with only movie data, not form data to prevent double posting
                .then(navigate( "", {state: { movieData: props.movieData }}))
        // }

    }

    const getMockReviews = async (returnData = false) => {

        let response = null;
        let reviews = null;
        // console.log('fetching')
        const url = 'https://65eca26b0ddee626c9b0bb03.mockapi.io/api/v1/Movies/'

        // Get existing MOCK reviews
        await fetch(url)
            .then(resp => resp.json())
            .then(results => response = Array.from(results))

        // Locate record with matching movieID
        response = response.filter((item) => item.movieID.toString() === movieID.toString());
        
        if (response instanceof Array && response.length >= 1) {
            reviews = response;
        
        } else {
            response = null;
        }

        props.setState(reviews); // Write reviews collection to parent state only if not returning data
    }

    useEffect(() => {

        // On first render if component runs with form data then submit data to API server
        // Else request reviews data from API server

        if (formData.current) {
                
            submitMockReview(formData.current)
            formData.current = null // Clear form data to prevent duplicate fetch call
        } else {
            getMockReviews();
        }

        return () => {
            // console.log('Closing Data')
        }
    }, [])
    
    return (
        <>
            {/* Was originally going to retrieve existing reviews collection from TMDB API. For now just using MockAPI for review data */}
            {/* <MovieData {...{fetchOptions}} /> */} {/* MovieData component handles fetch for TMDB API */}
        </>
    )
}
