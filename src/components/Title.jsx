import React from 'react'
import styles from './TitleBar.module.css'


// Renders app title for navbar
export default function Title(props) {
    
    // Inline styles related to alignment of elements only. Theming is handled in CSS module
    return (
        
        <div className={`d-flex flex-column ${styles.title}`} style={{fontSize: '24px', fontWeight: 'bold', paddingRight: 10, paddingTop: 0, marginLeft: 0}}>
            <span style={{textWrap: 'nowrap'}}>
                The Movie
            </span>
            <span style={{display: 'inline-flex', paddingLeft: 0, paddingTop: 0, textWrap: 'nowrap'}}>
                Reactor
            </span>
        </div>
  )
}
