import React from 'react'
import Home from './Home'
import styles from './Search.module.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useRef, useState, useEffect } from 'react';
import MovieData from '../components/MovieData';
import { useNavigate } from 'react-router-dom';


export default function Search() {

  // Store and set search results from API
  const [searchResults, setResults] = useState(null);

  // Flag for form submit
  const [isSubmit, setSubmitFlag] = useState(false);

  // State for search query options. MovieData component handles fetch using the options defined below and sets state here
  const [fetchOptions, setFetchOptions] = useState(
    {
      setState: setResults,
      baseURL: 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1',
      url: '',
      resourceType: 'movies',
      action: 'Search'
    }
  );

  const navigate = useNavigate();
  const searchTerm = useRef();
  const searchYear = useRef();

  // Lock scrolling while this component is mounted
  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = 'scroll';
    }
  }, [])

  // Run when searchResults are updated
  useEffect(() => {
    if (searchResults) {
      setSubmitFlag(false)
      let state = {state: 'blah'}
      navigate("/results", { state: { data: searchResults }})
    }
  }, [searchResults])

  const handleClick = () => {
    
    if (searchTerm.current.value === '') return null;
    if (searchYear.current.value !== '' && (searchYear.current.value < 1900 || searchYear.current.value > 2099)) return null;

    const query = encodeURIComponent(searchTerm.current.value);
    const year =  encodeURIComponent(searchYear.current.value);

    const baseURL = fetchOptions.baseURL;
    let url = baseURL + '&query=' + query
    if (year !== '') url += '&year=' + year;

    setFetchOptions({
      ...fetchOptions,
      url: url
    })
    
    setSubmitFlag(true);
  }

  return (
    <div style={{position: 'relative', width: '100%', height: '100svh', overflow: 'hidden'}}>
      
      {/* Using Home as a component and overriding default behavior with props */}
      <Home styles={styles} fade={true} imageOverride={'poster'}/>
      
      <div className='d-flex flex-row bg-dark m-auto' style={{top: 0, position: 'absolute', zIndex: 1, opacity: .9, width: '100vw'}}>
        <div></div>
        <div className='m-auto bg-dark' style={{height: '100svh'}}>
          <Card className='bg-warning text-primary' style={{marginTop: 50, width: '70vw', maxWidth: 600, fontWeight: 'bold'}}>
            <Card.Header as='h3' className='text-dark py-4 border-secondary border-5'>
              Movie Search
            </Card.Header>
            <Card.Body className='py-5'>
            <Form noValidate validated={true}>
              <Form.Group className="mb-5">
                <Form.Label>Keyword (Required)</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    ref={searchTerm}
                    type="text"
                    placeholder="Search by title, actor, keyword, etc."
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    You must enter a search term
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-5 pb-5">
                <Form.Label>Release Year (Optional)</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control type="number" ref={searchYear} placeholder="Year Released" className=''
                  min="1900" max="2099" step="1"
                  />
                </InputGroup>
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleClick}>
                {'Click to search'}
              </Button>
            </Form>
            </Card.Body>
          </Card>
        </div>
        <div></div>
      </div>
      {isSubmit? <MovieData {...{fetchOptions}} key={1} /> : null}
    </div>
  )
}
