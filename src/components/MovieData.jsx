import React from 'react'
import { useEffect, useRef } from 'react'

async function requestTMDB(requestOptions, token) {

  const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2ZmZGU1MTlhZGM3OWRiNDU0N2JjMmRjMDUwN2RjZiIsInN1YiI6IjY1ZmE5MTY2MGJjNTI5MDE3Y2FlMjlkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNPuitx3WkXXYHxGlFD5oKGDvOr47jA-AA0OeuMMSm0';
  //const API_KEY = '53ffde519adc79db4547bc2dc0507dcf';

  // Extract url from requestOptions
  let url = requestOptions.url;

  // Authorization and fetch options
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  };

  let response = fetch(url, options)

  // Token ref to cancel request on component dismount
  if (token.cancelled) {
    return null
  } else {
    return (await response).json();
  }
}

// Taken from TMDB Configuration API. Configuration API is used for building URL path to resources.
// This response data returned never changes so statically copied here to avoid unnecessary fetch call.
function getConfiguration() {
  return {
      "images": {
        "base_url": "http://image.tmdb.org/t/p/",
        "secure_base_url": "https://image.tmdb.org/t/p/",
        "backdrop_sizes": [
          "w300",
          "w780",
          "w1280",
          "original"
        ],
        "logo_sizes": [
          "w45",
          "w92",
          "w154",
          "w185",
          "w300",
          "w500",
          "original"
        ],
        "poster_sizes": [
          "w92",
          "w154",
          "w185",
          "w342",
          "w500",
          "w780",
          "original"
        ],
        "profile_sizes": [
          "w45",
          "w185",
          "h632",
          "original"
        ],
        "still_sizes": [
          "w92",
          "w185",
          "w300",
          "original"
        ]
      }
    }
}

// Returns assembled URL path to image resource, such as backdrop images or posters
function getResourceURL(url, resourceType = 'poster', sizeIndex = 0) {

  // If data collection does not have URL for image, it will be coming from API as null value
  if (url === null) return null;

  // This is just validation to make sure we are passing the right data. API results should have partial URLs starting with '/' character
  if (url === undefined || url.startsWith('/') === false) {
      return undefined;
  }

  // ConfigMethod returns an object for constructing image resource URL, providing a base URL and path options depending on size options
  let configMethod = getConfiguration();
  let configData = configMethod.images;
  let resourceKeys = configData[resourceType + '_sizes'];

  // resourceKeys should return an array of size options
  if (resourceKeys instanceof Array === false) {
      return undefined
  }

  // Given the sizeIndex parameter, select the index of the resourceKeys to obtain the path name
  let sizeResourceName = resourceKeys[sizeIndex];

  // Assemble completed URL
  let resourceURL = configData.secure_base_url + sizeResourceName + url;

  return resourceURL;
}

// Prepare collection for consumption by parent. Convert image relative paths to full url.
function prepCollection(data, setState, resourceType = 'movies') { // Resource Type is movies (default) or reviews. 
  
  let replaceURLs = () => {
    for (let obj of data) {
      obj.backdrop_path = getResourceURL(obj.backdrop_path, 'backdrop', 2); // Selecting size index of 2 as defined in configuration function
      obj.poster_path = getResourceURL(obj.poster_path, 'poster', 4); // Selecting size index of 4 as defined in configuration function
    }
  }

  if (resourceType === 'movies') replaceURLs(); // Movie objects in collection include incomplete URLs, so replace with full URL before setting state.

  setState(data)
}

export default function MovieData(props) {

  // Token and status flag for canceling request
  const token = useRef({ cancelled: false });
  const status = useRef({ fullfilled: false});
  const cancel = () => token.current.cancelled = true;

  // Run once to request data from MovieData component
  useEffect(() => {

    const fetchOptions = props.fetchOptions
    const setState = fetchOptions.setState
    const resourceType = fetchOptions.resourceType

    let getData = () => {
      return requestTMDB(fetchOptions, token)
    }

    let data = getData();
      data.then(obj => {
        if (obj !== null) {
          
          // API results contain partial URLs to image sources. We need to replace those with full URLs
          prepCollection(obj.results, setState, resourceType)
          status.fullfilled = true;
        }
      })
      data.catch(err => console.error('error:' + err));

    // On component unload, if data has not arrived, then cancel request
    return () => {
      if (!status.fullfilled) {
        cancel();
      }
      console.log(fetchOptions.action, 'MovieData Unmount')
    }
  }, [])

  // No markup to render
  return (
    <></>
  )
}
