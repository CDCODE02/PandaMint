import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CustomIconButton from '../../UI/Button/IconButton/CustomIconButton'
import MainCard from '../../UI/Cards/MainCard/MainCard'
import ArrowLeftIcon from '../../UI/Icons/ArrowLeftIcon'
import CashIcon from '../../UI/Icons/CashIcon'
import classes from './CurrentJackpot.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        color: `${theme.palette.text.primary}`,
        backgroundColor: `${theme.palette.secondary.main} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.hover} !important`
        },
        '& svg': {
            color: `${theme.palette.text.primary}`,
        }
    }
}));

const CurrentJackpot = (props) => {
    const { cash, actionText, onClick } = props

    const material = useStyles()

    return (
        <MainCard className={classes.mainCard}>
            <div className={classes.cashIconContainer}>
                <CashIcon/>
            </div>
            <div className={classes.mainCardInfo}>
                <h4>{cash} CMP</h4>
                <span>Current Jackpot (daily)</span>
            </div>
            <div className={classes.buyEntryContainer}>
                <p>{actionText}</p>
                <CustomIconButton icon={<ArrowLeftIcon/>} onClick={onClick}/>
            </div>
        </MainCard>
    )
}

export default CurrentJackpot
