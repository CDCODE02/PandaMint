import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './SecondaryCard.module.css'

const SecondaryCard = (props) => {
    const { children, className } = props

    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default SecondaryCard