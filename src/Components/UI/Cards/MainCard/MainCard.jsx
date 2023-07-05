import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './MainCard.module.css'

const MainCard = (props) => {
    const { children, className } = props

    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default MainCard