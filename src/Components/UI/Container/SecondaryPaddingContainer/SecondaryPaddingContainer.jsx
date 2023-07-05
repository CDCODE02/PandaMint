import React from 'react'
import classes from './SecondaryPaddingContainer.module.css'
import { cx } from '../../../../Utils/classnames'

const SecondaryPaddingContainer = (props) => {
    const { children, className } = props

    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default SecondaryPaddingContainer