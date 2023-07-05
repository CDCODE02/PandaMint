import React from 'react'
import { Button } from '@mui/material'
import classes from './SwitchBar.module.css'
import { useTheme } from '@emotion/react'

const SwitchBar = (props) => {
    const { value, onClick } = props

    const theme = useTheme()

    return (
        <div 
            className={classes.main}
            style={{
                backgroundColor: theme.palette.background.buttonSecondary
            }}
        >
            <Button 
                onClick={() => onClick("stake")}
                style={{
                    backgroundColor: value === "stake" ? theme.palette.text.primary : theme.palette.background.buttonSecondary,
                    color: value === "stake" ? theme.palette.secondary.main : theme.palette.text.primary
                }}
            >
                Stake
            </Button>
            <Button 
                onClick={() => onClick("unstake")}
                style={{
                    backgroundColor: value === "unstake" ? theme.palette.text.primary : theme.palette.background.buttonSecondary,
                    color: value === "unstake" ? theme.palette.secondary.main : theme.palette.text.primary
                }}
            >
                Unstake
            </Button>
        </div>
    )
}

export default SwitchBar