import { useTheme } from '@emotion/react'
import { Drawer, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CloseIcon from '../../../UI/Icons/CloseIcon'
import MenuIcon from '../../../UI/Icons/MenuIcon'
import classes from './Burger.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        color: `${theme.palette.secondary.main} !important`
    },
    paper: {
        width: "75%",
        backgroundColor: `${theme.palette.background.thirdBg} !important`,
        padding: "30px",
        paddingRight: "20px",
        paddingTop: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        '& button': {
            marginLeft: "auto"
        },
        '& a': {
            color: theme.palette.text.primary
        },
        '& a.active': {

        }
    }
}));

const Burger = (props) => {
    const theme = useTheme()

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const anchor = 'right'

    const material = useStyles()

    return (
        <div className={classes.main}>
            <div className={classes.burger}>
                <IconButton
                    style={{
                        backgroundColor: theme.palette.background.buttonSecondary,
                        color: theme.palette.text.primary
                    }}
                    onClick={handleOpen}
                >
                    <MenuIcon color={theme.palette.text.primary}/>
                </IconButton>
            </div>
            <Drawer
                anchor={anchor}
                open={isOpen}
                onClose={handleOpen}
                classes={material}
            >
                <IconButton
                    onClick={handleOpen}
                    style={{
                        backgroundColor: theme.palette.background.buttonSecondary,
                        color: theme.palette.text.primary,
                        padding: "10px"
                    }}
                >
                    <CloseIcon color={theme.palette.text.primary}/>
                </IconButton>
                <div className={classes.links}>
                    <NavLink onClick={handleOpen} to="Home" className={(navData) => (navData.isActive ? material.root : '')}>Home</NavLink>
                    <NavLink onClick={handleOpen} to="/" className={(navData) => (navData.isActive ? material.root : '')}>Token Lottery</NavLink>
                    <NavLink onClick={handleOpen} to="/nft_minting" className={(navData) => (navData.isActive ? material.root : '')}>NFT Minting</NavLink>
                    <NavLink onClick={handleOpen} to="/nft_lottery" className={(navData) => (navData.isActive ? material.root : '')}>NFT Lottery</NavLink>
                    <NavLink onClick={handleOpen} to="/staking" className={(navData) => (navData.isActive ? material.root : '')}>Staking</NavLink>
                </div>
            </Drawer>
        </div>
    )
}

export default Burger
