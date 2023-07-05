import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CustomIconButton from "../../UI/Button/IconButton/CustomIconButton";
import LittleArrow from "../../UI/Icons/LittleArrow";
import Label from "../../UI/Text/Label/Label";

const tableStyles = makeStyles((theme) => ({
  root: {
    borderSpacing: "0 20px !important",
    borderCollapse: "unset !important",
    "@media screen and (max-width: 568px)": {
      borderSpacing: "0 8px !important",
    },
    "& th label": {
      "@media screen and (max-width: 375px)": {
        fontSize: "12px !important",
      },
      "@media screen and (max-width: 340px)": {
        fontSize: "10px !important",
      },
    },
    "& th": {
      "@media screen and (max-width: 375px)": {
        fontSize: "12px !important",
        padding: "8px !important",
      },
    },
    "& td": {
      borderTop: "1px solid transparent !important",
      borderBottom: "1px solid transparent !important",
      position: "relative",
      backgroundColor: theme.palette.background.thirdBg,
      "@media screen and (max-width: 375px)": {
        padding: "8px !important",
      },
    },
    "& tr td:first-child": {
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
      borderTopLeftRadius: "16px",
    },
    "& tr td:last-child": {
      borderTopRightRadius: "16px",
      borderBottomRightRadius: "16px",
      borderBottomRightRadius: "16px",
      borderTopRightRadius: "16px",
    },
    "& tr td:nth-child(2)": {
      left: "0px",
    },
    "& .MuiTableRow-root": {
      height: "72px",

      width: "calc(100% - 5px)",

      "@media screen and (max-width: 375px)": {
        height: "fit-content",
      },
    },
    "& .MuiTableCell-root": {
      color: theme.palette.primary.main,
      borderBottom: "none",
      paddingTop: "8px",
      paddingBottom: "8px",
      fontSize: "14px !important",
      fontWeight: "600 !important",
      maring: "10px 0 !important",
      "@media screen and (max-width: 468px)": {
        fontSize: "12px !important",
      },
    },
    "& .MuiTableCell-head": {
      opacity: 0.5,
      fontSize: "14px",
      fontWeight: "400",
      "@media screen and (max-width: 468px)": {
        fontSize: "12px !important",
      },
    },
  },
}));

const selectedRowStyles = makeStyles((theme) => ({
  root: {
    "& td:first-child": {
      borderLeft: `1px solid ${theme.palette.secondary.main} !important`,
    },
    "& td:last-child": {
      borderRight: `1px solid ${theme.palette.secondary.main} !important`,
    },
    "& td": {
      transitionDuration: ".1s",
      borderTop: `1px solid ${theme.palette.secondary.main} !important`,
      borderBottom: `1px solid ${theme.palette.secondary.main} !important`,
    },
  },
}));

const StakeTable = (props) => {
  const { rows, items, userItems, currentIndex, setCurrentIndex } = props;

  const material = tableStyles();
  const materialSelected = selectedRowStyles();

  return (
    <TableContainer>
      <Table classes={material}>
        <TableHead>
          {rows.map((el, index) => (
            <TableCell
              align={index === rows.length - 1 ? "right" : "left"}
              key={el.value}
            >
              <Label text={el} />
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {items.map((el, index) => (
            <TableRow
              key={el._id}
              classes={
                items[currentIndex].period === el.period && materialSelected
              }
            >
              <TableCell>{el.period}</TableCell>
              <TableCell>{el.daily_back}%</TableCell>
              {/* <TableCell>{el.APY}%</TableCell> */}
              <TableCell>
                {userItems[index].earnings ? userItems[index].earnings : "-"}{" "}
                $PANDA
              </TableCell>
              <TableCell align="right">
                <CustomIconButton
                  onClick={() => setCurrentIndex(index)}
                  icon={<LittleArrow />}
                  active={el.period === items[currentIndex].period}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StakeTable;
