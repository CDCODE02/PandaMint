import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import classes from './CustomIconButton.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        color: `${theme.palette.text.secondary} !important`,
        backgroundColor: `${theme.palette.background.buttonSecondary} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.hover} !important`
        },
        '& svg': {
            color: `${theme.palette.text.primary}`,
        }
    }
}));

const useActiveStyles = makeStyles((theme) => ({
    root: {
        color: `${theme.palette.text.primary} !important`,
        backgroundColor: `${theme.palette.secondary.main} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.hover} !important`
        },
        '& svg': {
            color: `${theme.palette.text.primary}`,
        }
    }
}));

const CustomIconButton = (props) => {
    const { icon, onClick, active = true } = props

    const material = useStyles()
    const mateialActive = useActiveStyles()

    return (
        <IconButton 
            className={classes.main}
            classes={active ? mateialActive : material} 
            onClick={onClick}
        >
            {icon}
        </IconButton>
    )
}

export default CustomIconButton