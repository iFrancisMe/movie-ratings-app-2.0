import React, { Component } from 'react'
import styles from './TitleBar.module.css'
import SvgHomeIcon from './SvgHomeIcon'
import SvgSearchIcon from './SvgSearchIcon'
import TitleBarButton from './TitleBarButton' 
import Title from './Title'
import SearchForm from './SearchForm'
import SvgLogoReel from './SvgLogoReel'

// Renders completed navbar with title and buttons
export default class TitleBarContainer extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            searchClicked: false,
            homeClicked: false
        }
    }

    // OnClick function for search button to toggle search form opening/closing. 
    setSearchFormVisibility = () => {
        let currentState = ! this.state.searchClicked;
        let obj = {searchClicked: currentState} // Toggle search form visibility
        this.setState(obj)
    }

    // Onclick function for home button
    goHome = () => {
        let obj = {homeClicked: true};
        this.setState(obj)
        window.location.reload();
    }

    render() {

        let searchClicked = this.state.searchClicked;
        //let homeClicked = this.state.homeClicked;

        return (
            <>
                <div className={` ${styles.titleBarMainDiv}`} style={{position: 'relative', display: 'inline-flex', width: '100%'}}>
                    
                    {/** Div container for title and button components */}
                    <div className={``} style={{display: 'inline-flex', width: '100%', paddingRight: '1em'}}>
                        
                        {/** Renders app title with logo */}
                        <Title className='' />
                        
                        <div><SvgLogoReel /></div>
                        {/** Spacer div with filmstrip background*/}
                        <div className={` ${styles.titleBarBackground}`} style={{display: 'flow-root'}}>
                        
                        </div> 
                    
                        {/** Home button */}
                        <TitleBarButton stateObject={{homeClicked: true}} className={`${styles.homeButton} `} icon={SvgHomeIcon} onClick={this.goHome} text='Home'/>

                        {/** Search Button */}
                        <TitleBarButton stateObject={{searchClicked: true}} className={styles.searchButton} icon={SvgSearchIcon} onClick={this.setSearchFormVisibility} text='Search'/>
                        
                    </div>
                    
                </div>
                {/* Renders drop down search form - Currently not implemnted yet except as a demo concept */}
                <div> 
                    {searchClicked? <SearchForm /> : null}
                </div>
            </>
        )
    }

}


