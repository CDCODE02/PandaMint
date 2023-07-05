import { useTheme } from '@emotion/react'
import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './Label.module.css'

const Label = (props) => {
    const { text, className } = props

    const theme = useTheme()

    return (
        <label 
            className={cx(classes.main, className)}
            style={{ color: theme.palette.text.secondary }}
        >
            {text}
        </label>
    )
}

export default Label