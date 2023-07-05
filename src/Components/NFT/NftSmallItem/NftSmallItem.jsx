import React from 'react'
import classes from './NftSmallItem.module.css'

const NftSmallItem = (props) => {
    const { item } = props

    return (
        <div className={classes.main}>
            <img src={item.image} alt="nft"/>
        </div>
    )
}

export default NftSmallItem