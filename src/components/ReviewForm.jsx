import React from 'react'
import { useRef, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import RatingsFormControl from './RatingsFormControl';
import RatingsCard from './RatingsCard';
import {useNavigate, useParams} from 'react-router-dom';

export default function ReviewForm(props) {

    /* Component runs in 3 modes. 
    1. Default mode: Review form for submitting a review - Runs when no flags are given
    2. Review Card: Displays a user review if review data passed into component
    3. Edit form: Cross between the other 2 modes. Displays a review card that is editable 
        or deletable. Requires review data as prop and edit flag via route
    */

    const navigate = useNavigate(); // For navigating after form submission
    const reviewAuthor = useRef(); // Ref for input field value
    const reviewText = useRef(); // Ref for input field value


    let mode = useParams(); // Flag for if navigating to editMode route - To enable editing/deleting reviews

    if (mode.editMode) {
        mode = mode.editMode; // If mode.editMode param exists, then assign mode to value
        
        // If edit mode selected, scroll to top of page to view form
        document.querySelector(':root').scrollIntoView({ behavior: 'instant' })
    }

    // Object to store and better access data retrived from props
    const data = {
        reviewData: null,
        movieData: null
    }

    // Get movieData from props
    if (props.movieData) {
        data.movieData = props.movieData;
    } 

    // Get review data from props
    if (props.reviewData) {
        data.reviewData = props.reviewData;
    } 

    // State for recording score based on Star count selected
    const [rating, setRating] = useState(null);

    // State for Star Form Control Hover Effect
    const [hoverState, setHoverState] = useState(false);

    // styling module and movie data passed from parent 
    const styles = props.styles;
    const movieData = data.movieData;

    // Template to be completed on form submission and sent as options body in fetch call to API
    let formTemplate = {
        movieID: data.movieData.id, // ID corresponding to movie in TMDB API, keeping in Mock API as movie reference
        author: null, // From name field on form
        date: null,
        rating: null,
        content: null, // Review content from form
        id: null // ID is the record id from Mock API. if form is working with data obtained from Mock, then we need the ID to update or delete record
    }

    // Send form data as state data via route location state
    const submitForm = () => {
        
        // Reset form fields (clear form)
        reviewAuthor.current.value = "";
        reviewText.current.value = "";
        setRating(null);

        // Navigate to current route, passing form data as state
        navigate( `/reviews/${data.movieData.id}`, {state: { movieData: data.movieData, formData: formTemplate }})
        
    }

    // Button handling for Submit button
    const handleClickSubmit = () => {
        
        const dt = new Date();

        formTemplate = {
            ...formTemplate,
            movieID: data.movieData.id,
            author: reviewAuthor.current.value,
            date: dt,
            rating: rating * 2,
            content: reviewText.current.value,
            id: data.reviewData? data.reviewData.id : null
        }
        
        submitForm();
    }

    // Button handling for Close button
    const handleClickClose = () => {
        // const dt = new Date() // For resetting component key
        // Reset form fields
        reviewAuthor.current.value = "";
        reviewText.current.value = "";
        setRating(null);
        // keyRef.current = dt;
        navigate( `/reviews/${data.movieData.id}`, {state: { movieData: data.movieData }})
    }

    // Button handling for Edit button
    const handleClickEdit = () => {
        // Navigate to editMode route and pass data as state
        navigate( `/reviews/${data.movieData.id}/editMode`, {state: { movieData: data.movieData, reviewData: data.reviewData }})
    }

    // Button handling for Delete button. Only need record ID and 'delete' flag for ReviewData component to interpret as DELETE call
    const handleClickDelete = () => {
        formTemplate = {
            ...formTemplate,
            delete: true,
            id: data.reviewData?.id
        }
        
        submitForm();
    }

    // For changing header text on Review Card component depending on role as Entry form, Edit form, or viewing card
    const getHeaderText = () => {
        if (mode === 'editMode') {
            return 'Edit Review';
        } else if (data.reviewData) {
            return 'Viewer Review';
        } else {
            return 'Submit Review';
        }
    }

    // Hover state to swap static Star rating for dynamic Star form control
    const handleMouseEnter = () => {
        setHoverState(true);
    }

    // Hover state to swap dynamic Star form control for static Star rating
    const handleMouseLeave = () => {
        setHoverState(false);
    }

    return (
        <div className={`m-auto ${props.readOnly? styles.reviewCardDiv : null}`}> 
        {/* Set class above only if readOnly flag is set - For overriding styling to distinguish from default form */}

            <Card className={`mt-1 mb-5 ${props.readOnly? styles.reviewCard : styles.reviewForm}`} 
                    style={{width: '70vw', maxWidth: 600, fontWeight: 'bold'}}>
                <Card.Header as='h3' className='border-5' >
                
                <Form.Group className='m-auto d-flex flex-flow justify-content-between'>
                        {/* Display Submit button in Edit mode or when no reviewData present */}
                        {
                            (props.readOnly === true && mode !== 'editMode')?
                            <Button className='mb-2'
                                variant="primary"
                                onClick={handleClickEdit}
                                >
                                {'Edit'}
                            </Button>
                            :
                            null
                        }

                        {/* Header text based on component mode */}
                        <span className='m-auto justify-content-center'>
                            {getHeaderText()}    
                        </span> 

                        {/* Display Close button in edit mode only */}
                        {
                            (props.readOnly === true && mode !== 'editMode')?
                            <Button className='mb-2'
                                variant="primary"
                                onClick={handleClickDelete}
                                >
                                {'Del'}
                            </Button>
                            :
                            null
                        }
                    </Form.Group>
                </Card.Header>
                <Card.Title className='m-auto mt-3'>
                    {/* Show review date if reviewData present */}
                    {data.reviewData?.reviewDate}
                </Card.Title>
                <Card.Body className=''>
                <Form noValidate validated={true}>

                    {/* Custom Star Rating Selection Form Component  */}
                    <Form.Group className="mb-4">
                        <Form.Label>Rating</Form.Label>
                        <div className='rounded bg-white m-auto' style={{height: '2em', width: '7em'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <InputGroup>
                                
                                {/* In 'Edit' mode, show static Star Rating and swap to dynamic control on mouse hover */}
                                {/* In standard Form mode, always show dynamic control */}
                                {
                                    (/* 
                                        If readOnly = true (ReviewCard mode) display static Star Rating Component showing current rating score.
                                        Swap component for dynamic Star form control in Edit mode only when Mouse hover and 
                                        remain in dynamic control if new score selected or swap back to static on mouse leave
                                     */
                                    (
                                        (props.readOnly === false  && mode !== 'editMode')
                                        || 
                                        (
                                            (props.readOnly === false ) 
                                            && 
                                            (mode === 'editMode')
                                            &&
                                            (hoverState === true || rating !== null)
                                        ))
                                    )
                                    ?
                                    <RatingsFormControl  setRating={setRating} styles={styles} reviewData={data.reviewData}/> 
                                    :
                                    <RatingsCard {...{movieData}} styles={styles} reviewData={data.reviewData}/>
                                }
                                {/* RatingsCard component used for static Star rating display in Review Card mode */}
                                
                            </InputGroup>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <InputGroup hasValidation>
                        <Form.Control
                            ref={reviewAuthor}
                            type="text"
                            placeholder="Display Name"
                            required
                            defaultValue={data.reviewData?.reviewAuthor /* Prefill data when review data passed in for Edit or Card mode */} 
                            disabled={props.readOnly /* Input fields are disabled in Review Card mode (when readOnly = true) */}
                        /> {/* Show review author if reviewData present */}

                        <Form.Control.Feedback type="invalid">
                            You must enter your name
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="m-auto mb-4">
                        <Form.Label>Review Comments</Form.Label>
                        <InputGroup hasValidation>
                        <Form.Control
                            ref={reviewText}
                            as="textarea"
                            placeholder="Type your review here."
                            required
                            style={{height: '10em'}}
                            defaultValue={data.reviewData?.reviewContent /* Prefill data when review data passed in for Edit or Card mode */}
                            disabled={props.readOnly /* Input fields are disabled in Review Card mode (when readOnly = true) */}
                        />
                        <Form.Control.Feedback type="invalid">
                            You must enter your comments
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='m-auto d-flex justify-content-center' style={{gap: 20}}>
                        {/* Display Submit button in Edit mode or when no reviewData present */}
                        {
                            (props.readOnly === false)?
                            <Button className='mb-2'
                                variant="primary"
                                onClick={handleClickSubmit}
                                >
                                {'Submit'}
                            </Button>
                            :
                            null
                        }
                        {/* Display Close button in edit mode only */}
                        {
                            (props.readOnly === false && mode === 'editMode')?
                            <Button className='mb-2'
                                variant="primary"
                                onClick={handleClickClose}
                                >
                                {'Close'}
                            </Button>
                            :
                            null
                        }
                    </Form.Group>
                </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
