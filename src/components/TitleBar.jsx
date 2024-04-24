import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Title from './Title'
import SvgLogoReel from './SvgLogoReel'
import SvgHomeIcon from './SvgHomeIcon'
import SvgSearchIcon from './SvgSearchIcon'
import styles from './TitleBar.module.css'
import TitleBarButton from './TitleBarButton';
import {Link} from 'react-router-dom'

export default function TitleBar() {
  return (
    <div className={`d-flex flex-row m-auto px-0 mx-0 ${styles.titleBarMainDiv}`} >
        <Navbar className={`m-auto w-100 px-2`}>
            
            <div className={`m-auto w-100 d-flex flex-row`} style={{position: 'relative'}}>
                
                <Link to='/' className={`p-0 d-flex ${styles.navLinks}`}>
                    <SvgLogoReel />
                    <Title />
                </Link>
                
            </div>
            <div style={{position: 'absolute'}} className={`${styles.titleBarBackground}`}>&nbsp;</div>
            
            
            
            <div className={`p-0 d-flex`}>
                <Link to='/' className={styles.navLinks}>
                    {/** Home button */}
                    <TitleBarButton className={`${styles.homeButton} `} icon={SvgHomeIcon} text='Home'/>
                </Link>
                <Link to='/search' className={styles.navLinks}>
                    {/** Search Button */}
                    <TitleBarButton className={styles.searchButton} icon={SvgSearchIcon} text='Search'/>
                </Link>
            </div>

        </Navbar>
    </div>
    
  )
}
