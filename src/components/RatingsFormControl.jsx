import React from 'react'
import { useState } from 'react'
import DynamicStar from './DynamicStar'

// Renders a star rating selector based on the ratings card object, exposing additional functionality not visible by default
export default function RatingsFormControl(props) {

  // State to provide hovering and click behavior to rendered star group
  let [isHover, setHover] = useState(new Array(5).fill(false));
  let [isClicked, setClicked] = useState(0);

  let styles={}; // will reference styles passed in as props if present
  let starCollection = []; // Collect rendered dynamic star components

  if (props.styles !== undefined) {
    styles = props.styles;
  }

  // Properties passed to dynamic star component to implement fill/unfill hover effect on rendered dynamic star being hovered/clicked and all stars leading to target. 
  // Star fill follows mouse pointer hovering highest value star
  let propsObj = {
    isHover: isHover,
    onMouseEnter: (index) => {
      
      let stateArray = isHover.slice(0);
      stateArray.fill(true, 0, index + 1);
      stateArray.fill(false, index + 1)
      setHover(stateArray);

    },
    onMouseLeave: (index) => {
      if (isClicked > 0) {

        let stateArray = isHover.slice(0);
        stateArray.fill(true, 0, isClicked);
        stateArray.fill(false, isClicked);
        setHover(stateArray);

      } else {

        let stateArray = isHover.slice(0);
        stateArray.fill(false, 0)
        setHover(stateArray);

      }
    },
    onClick: (index) => {    // Callback function to lock star fill in place, i.e., disable dynamic effect for filled stars until another star is clicked
      let ratingValue = index + 1;
      setClicked(ratingValue);
      props.setRating(ratingValue);
    }
  }

  // Assemble 5-star grouping of dynamic Star components
  let DynamicStars = () => {

    for (let index = 0; index < 5; index++) {

      propsObj.index = index;
      starCollection.push(<DynamicStar key={index + 20} index={index} styles={styles} propsObj={propsObj}/>)
      starCollection.push(<div key={index}>&nbsp;&nbsp;&nbsp;&nbsp;</div>)
    }
    
    starCollection.pop();

    return starCollection;
  }

  return (
    <div className={styles.starControl}>
      {DynamicStars()}
    </div>
)
}
