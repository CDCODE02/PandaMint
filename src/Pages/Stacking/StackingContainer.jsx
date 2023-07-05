import React, { useEffect, useState } from 'react'
import Stacking from './Staking'
import aces_logo from '../../Assets/Icons/aces_logo.png'

const StackingContainer = (props) => {
    const [toogleValue, setToogleValue] = useState("stake")
    const [currentPercent, setCurrentPercent] = useState(50)
    const [currentUnstakePercent, setCurrentUnstakePercent] = useState(50)

    const info = [
        {
            period: "30 Days",
            daily_back: "2%",
            earnings: "400 K $PANDA",
            amount_staked: "132,568,333",
            rewards: "132.3142 $PANDA",
            liquidity: "$ 56 M",
        },
        {
            period: "60 Days",
            daily_back: "3%",
            earnings: 0,
            amount_staked: "132,568,333",
            rewards: "132.3142 $PANDA",
            liquidity: "$ 56 M",
        },
        {
            period: "90 Days",
            daily_back: "5%",
            amount_staked: "132,568,333",
            rewards: "132.3142 $PANDA",
            liquidity: "$ 56 M",
        },
    ]

    const [currentInfo, setCurrentInfo] = useState(info[0])

    const [stake, setStake] = useState({
        icon: aces_logo,
        name: "$PANDA",
        available: 500,
        value: ""
    })

    const [unstake, setUnstake] = useState({
        icon: aces_logo,
        name: "$PANDA",
        available: 500,
        value: ""
    })

    const handleStake = (value) => {
        const numberValue = Number(value)
        setCurrentPercent(0)
        if(numberValue <= stake.available) {
            setStake({
                ...stake,
                value: numberValue
            })
            if(numberValue % 25 === 0){
                setCurrentPercent(75)
            }
        }else {
            setStake({
                ...stake,
                value: stake.available
            })
            setCurrentPercent(100)
        }
    }

    const handleUnstake = (value) => {
        const numberValue = Number(value)
        setCurrentUnstakePercent(0)
        if(numberValue <= unstake.available) {
            setUnstake({
                ...unstake,
                value: numberValue
            })
        }else {
            setUnstake({
                ...unstake,
                value: unstake.available
            })
        }
    }

    const handleStakePercent = (value) => {
        setCurrentPercent(Number(value))
        setStake({
            ...stake,
            value: stake.available / 100 * Number(value)
        })
    }

    const handleUnstakePercent = (value) => {
        setCurrentUnstakePercent(Number(value))
        setUnstake({
            ...unstake,
            value: unstake.available / 100 * Number(value)
        })
    }

    useEffect(() => {
        if(stake.value === stake.available) {
            setCurrentPercent(100)
        }else if(stake.value === stake.available * 0.75) {
            setCurrentPercent(75)
        }else if(stake.value === stake.available / 2) {
            setCurrentPercent(50)
        }else if(stake.value === stake.available / 4){
            setCurrentPercent(25)
        }else {
            setCurrentPercent(0)
        }

        if(unstake.value === unstake.available) {
            setCurrentUnstakePercent(100)
        }else if(unstake.value === unstake.available * 0.75) {
            setCurrentUnstakePercent(75)
        }else if(unstake.value === unstake.available / 2) {
            setCurrentUnstakePercent(50)
        }else if(unstake.value === unstake.available / 4){
            setCurrentUnstakePercent(25)
        }else {
            setCurrentUnstakePercent(0)
        }

    }, [stake, unstake])

    return (
        <>
            <Stacking
                toogleValue={toogleValue}
                setToogleValue={setToogleValue}
                info={info}
                currentInfo={currentInfo}
                setCurrentInfo={setCurrentInfo}
                currentPercent={currentPercent}
                currentUnstakePercent={currentUnstakePercent}
                setCurrentPercent={handleStakePercent}
                setCurrentUnstakePercent={handleUnstakePercent}
                unstake={unstake}
                handleUnstake={handleUnstake}
                handleStake={handleStake}
                stake={stake}
            />
        </>
    )
}

export default StackingContainer
