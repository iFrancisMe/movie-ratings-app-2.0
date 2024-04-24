import React from 'react'
import Card from 'react-bootstrap/Card'
import SvgLogoReel from './SvgLogoReel'
import SvgAppLogo from './SvgAppLogo'
import styles from './PosterUnavailable.module.css'

export default function PosterUnavailable() {


  return (
    <Card className={`m-auto ${styles.posterCard}`}>
      <Card.Header className={`justify-content-center ${styles.posterHeader}`}>
        <div style={{position: 'absolute', zIndex: 0, width: '100%'}}></div>
        M<SvgAppLogo styles={styles} />vie P<SvgAppLogo styles={styles} />ster
      </Card.Header>
      <Card.Title className='m-auto'>
        
      </Card.Title>
      <Card.Body className='m-auto content-justify-center'>
        
        <div className={`m-auto ${styles.posterTitle}`} style={{position: 'absolute', left: 0}}>
          Unavailable
        </div>
        
      </Card.Body>
      <Card.Footer>
      <SvgLogoReel styles={styles}/>
      </Card.Footer>
    </Card>
  )
}
