import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './MainPaddingContainer.module.css'

const MainPaddingContainer = (props) => {
    const { children, className } = props

    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default MainPaddingContainer