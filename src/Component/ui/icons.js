import React from 'react'
import { Link } from 'react-router-dom'

import mCitylogo from '../../Resources/images/logos/manchester_city_logo.png'

export const CityLogo = (props) => {

    const template = <div
        className='img_cover'
        style={{
            width: props.width,
            height: props.height,
            background:`url(${mCitylogo}) no-repeat`
        }}
    >
    </div>

    // props.link - see if the logo is linkable or not
    if(props.link){
        return (
            <Link to={props.linkTo} className='link_logo'> 
                {template}
            </Link>
        )
    } else {
        return template
    }

}