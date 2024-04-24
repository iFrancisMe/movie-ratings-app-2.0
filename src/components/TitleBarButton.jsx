import React from 'react'

// Button component for home and search buttons
export default function TitleBarButton(props) {

    // Inline styles related to alignment of elements only. Theming is handled in CSS module
    return (
        <div className={`m-auto ${props.className}`} style={{minHeight: 42, minWidth: 60}}>
            <props.icon  />
            <span> &nbsp;{props.text}&nbsp;</span>
        </div>
    )
}
