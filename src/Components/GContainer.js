import React from 'react'
import Space from './Space'
import Snake from './Snake'
import Food from './Food'

import Styles from './Styles/GContainer.module.css'

const GContainer = (props) => {
    var ComponentToReturn;
    
    if (props.contentType===0)
    {
        ComponentToReturn = <Space />
    }else if (props.contentType===1){
        ComponentToReturn = <Snake />
    }else if (props.contentType===2){
        ComponentToReturn = <Food />
    }
    return <div className={Styles.GContainer}>{ComponentToReturn}</div>
}

export default GContainer;