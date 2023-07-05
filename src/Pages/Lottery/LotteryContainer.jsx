import React, { useState } from 'react'
import { connect } from 'react-redux'
import Lottery from './Lottery'

import aces_logo from '../../Assets/Icons/aces_logo.png'
import BUSD_icon from '../../Assets/Icons/BUSD.svg'

const LotteryContainer = (props) => {
    const [pay, setPay] = useState({
        icon: BUSD_icon,
        name: "CMP",
        available: 500,
        value: ""
    })

    const [receive, setReceive] = useState({
        icon: aces_logo,
        name: "$PANDA",
        available: 1567876,
        value: ""
    })

    const [isSwapped, setIsSwapped] = useState(false)

    const exchangeRate = 104256

    const handleIsSwapped = () => {
        setIsSwapped(!isSwapped)
    }

    const handlePay = (value) => {
        const numberValue = Number(value)

        if(numberValue <= pay.available) {
            setPay({
                ...pay,
                value: numberValue
            })
            setReceive({
                ...receive,
                value: isSwapped ? exchangeRate / numberValue
                : numberValue * exchangeRate
            })
        }else {
            setPay({
                ...pay,
                value: pay.available
            })
            setReceive({
                ...receive,
                value: isSwapped ? exchangeRate / pay.available
                : pay.available * exchangeRate
            })
        }

    }

    const handleReceive = (value) => {
        const numberValue = Number(value)

        if(numberValue <= receive.available) {
            setReceive({
                ...receive,
                value: numberValue
            })
            setPay({
                ...pay,
                value: isSwapped ? exchangeRate * numberValue
                : numberValue / exchangeRate
            })
        }else {
            setReceive({
                ...receive,
                value: receive.available
            })
            setPay({
                ...pay,
                value: isSwapped ? exchangeRate * receive.available
                : receive.available / exchangeRate
            })
        }
    }

    const handleSwap = () => {
        const tmpPay = {...pay}
        setPay(receive)
        setReceive(tmpPay)
        handleIsSwapped()
    }

    return (
        <>
            <Lottery
                pay={pay}
                receive={receive}
                handlePay={handlePay}
                handleReceive={handleReceive}
                handleSwap={handleSwap}
                exchangeRate={exchangeRate}
            />
        </>
    )
}

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {

})(LotteryContainer)
