import React from 'react'
import MainPaddingContainer from '../../Container/MainPaddingContainer/MainPaddingContainer'
import SecondaryPaddingContainer from '../../Container/SecondaryPaddingContainer/SecondaryPaddingContainer'
import classes from './RightSide.module.css'

const RightSide = (props) => {
    const { children, className } = props

    return (
        <div className={classes.main}>
            <SecondaryPaddingContainer className={className}>
                {children}
            </SecondaryPaddingContainer>
        </div>
    )
}

export default RightSide