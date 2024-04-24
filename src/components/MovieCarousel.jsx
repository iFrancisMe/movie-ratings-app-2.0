import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import MovieCard from './MovieCard'

export default function MovieCarousel(props) {

    const [slideIndex, setSlideIndex] = useState(0)
    const MAX_SLIDES = 5;
    const styles = props.styles;
    const movieData = props.collection;
    const handleSelect = (selectedIndex) => {
        setSlideIndex(selectedIndex);
    };

    // Carousel Image override flag from parent to replace default backdrop (landscape orientation) with poster (vertical)
    const imageOverride = props.imageOverride;

    const getImageType = () => {
        if (imageOverride !== undefined) {
            return props.imageOverride;
            
        } else {
            return 'backdrop';
        }
    }

    const SlideCollection = () => {
        let collection = [];
        
        for (let index = 0; index < MAX_SLIDES; index++) {
            let obj = movieData[index];

            collection.push(
                <Carousel.Item key={obj.id}>
                    <div className='bg-dark'>
                        <img src={obj[`${getImageType()}_path`]} className={`${styles.slides}`} alt={getImageType()}/>
                        <MovieCard data={obj} styles={props.styles}  />
                    </div>
                </Carousel.Item>
            )
        }
        //console.log(props.collection)
        return collection
    }

    // If this component is rendered as a child with props passed in and fade transition requested. Default transition is slide.
    const transitionIsFade = () => {
        if (props.fade !== undefined && typeof(props.fade) === 'boolean') {
            return props.fade;
        } else {
            return false;
        }
    }

    return (
        <div className='m-auto' style={{position: 'relative', width: '100%'}}>
            <div></div>
            {/* If overriding default transition style to fade, disable controls and slide indicators */}
            <Carousel activeIndex={slideIndex} onSelect={handleSelect} fade={transitionIsFade()} controls={!transitionIsFade()} indicators={!transitionIsFade()}>
                {SlideCollection()}
            </Carousel>
            <div></div>
        </div>
    )
}

