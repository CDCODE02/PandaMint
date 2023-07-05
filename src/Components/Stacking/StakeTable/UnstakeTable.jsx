import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CustomIconButton from '../../UI/Button/IconButton/CustomIconButton'
import ArrowLeftIcon from '../../UI/Icons/ArrowLeftIcon'
import LittleArrow from '../../UI/Icons/LittleArrow'
import Label from '../../UI/Text/Label/Label'

const tableStyles = makeStyles((theme) => ({
    root: {
        borderSpacing: "0 20px !important",
        borderCollapse: "unset !important",
        '& tr td:first-child': { 
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px", 
            borderBottomLeftRadius: "16px",
            borderTopLeftRadius: "16px" 
        },
        '& tr td:last-child': { 
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            borderBottomRightRadius: "16px" ,
            borderTopRightRadius: "16px" 
        },
        '& td': {
            borderTop: "1px solid transparent !important",
            borderBottom: "1px solid transparent !important",
            transitionDuration: ".3s"
        },
        "& .MuiTableRow-root": {
            height: "72px",
            backgroundColor: theme.palette.background.thirdBg,
            width: "100%",
        },
        "& .MuiTableCell-root": {
            color: theme.palette.primary.main,
            borderBottom: "none",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "14px !important",
            fontWeight: "600 !important",
            maring: "10px 0 !important",
            border: "1px solid transparent"
        },
        "& .MuiTableCell-head": {
            opacity: .5,
            fontSize: "14px",
            fontWeight: "400"
        }
    }
}));

const selectedRowStyles = makeStyles((theme) => ({
    root: {
        '& td:first-child': { 
            borderLeft: `1px solid ${theme.palette.secondary.main} !important`
        },
        '& td:last-child': { 
            borderRight: `1px solid ${theme.palette.secondary.main} !important`
        },
        '& td': {
            transitionDuration: ".3s",
            borderTop: `1px solid ${theme.palette.secondary.main} !important`,
            borderBottom: `1px solid ${theme.palette.secondary.main} !important`
        },
    }
}));

const UnstakeTable = (props) => {
    const { rows, items, setCurrentInfo, currentInfo } = props

    const material = tableStyles()
    const materialSelected = selectedRowStyles()

    return (
        <TableContainer>
            <Table classes={material}>
                <TableHead>
                    {rows.map((el, index) => (
                        <TableCell
                            align={index === rows.length - 1 ? "right" : "left"} 
                            key={el.value}
                        >
                            <Label text={el}/>
                        </TableCell>
                    ))}
                </TableHead>
                <TableBody>
                    {items.map((el, index) => (
                        <TableRow key={el._id} classes={currentInfo.period === el.period && materialSelected}>
                            <TableCell>{el.period}</TableCell>
                            <TableCell>{el.liquidity}</TableCell>
                            <TableCell>{el.daily_back}</TableCell>
                            <TableCell>{el.earnings ? el.earnings : "-"}</TableCell>
                            <TableCell align='right'>
                                <CustomIconButton 
                                    onClick={() => setCurrentInfo(el)} 
                                    icon={<LittleArrow/>}
                                    active={el.period === currentInfo.period}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UnstakeTable