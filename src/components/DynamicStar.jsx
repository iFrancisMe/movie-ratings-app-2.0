import React from 'react'
//import { useState, useEffect } from 'react';
import Star from './Star'

// Renders a dynamic star which changes from unfilled star to filled star on hover. Component is composed of 2 absolute divs contained in 1 parent relative div. 
// Topmost div is set to reveal div underneath to provide effect.
export default function DynamicStar(props) {

    // let [isHover, setHover] = useState(false);
    // let [isClicked, setClicked] = useState(false);

    let styles = {};

    if (props.styles !== undefined) {
        styles = props.styles;
    }

    let index = props.index;
    
    // Callback function to handle mouse entering div
    let handleMouseEnter = () => {
        props.propsObj.onMouseEnter(props.index);
    }

    // Callback function to handle mouse leaving div
    let handleMouseLeave = () => {
        props.propsObj.onMouseLeave(props.index);
    }
    
    // When star is clicked, filled value becomes fixed to indicate a selected rating
    let handleClick = () => {
        props.propsObj.onClick(props.index)
    }

    let dynamic = (props.propsObj.isHover[props.index])? {position: 'absolute', zIndex: 100} : {color: 'transparent', position: 'absolute', zIndex: 100};
    return (
        <div className={styles.star} style={{position: 'relative', padding: 2}} >
            <div style={{position: 'absolute', zIndex: 101}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
                <Star key={index} starType={'noFill'}/>
            </div>
            <div className={styles.dynamicStar} style={dynamic}>
                <Star key={index+10} starType={'filled'}/>
            </div>
        </div>
    )
}
