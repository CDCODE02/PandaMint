import React from 'react'
import MainPaddingContainer from '../../Container/MainPaddingContainer/MainPaddingContainer'
import classes from './LeftSide.module.css'

const LeftSide = (props) => {
    const { children, className } = props

    return (
        <div className={classes.main}>
            <MainPaddingContainer className={className}>
                {children}
            </MainPaddingContainer>
        </div>
    )
}

export default LeftSide