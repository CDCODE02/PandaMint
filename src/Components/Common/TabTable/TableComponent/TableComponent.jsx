import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const tableStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      color: theme.palette.primary.main,
      borderBottom: "none",
      paddingTop: "8px",
      paddingBottom: "8px",
      "@media screen and (max-width: 468px)": {
        paddingBottom: "6px",
        paddingTop: "6px",
      },
      "@media screen and (max-width: 360px)": {
        fontSize: "12px",
      },
    },
    "& .MuiTableCell-head": {
      opacity: 0.5,
      fontSize: "14px",
      fontWeight: "400",
    },
  },
}));

const TableComponent = (props) => {
  const { items, rows, second = false } = props;

  const materialTable = tableStyles();

  return (
    <TableContainer>
      <Table classes={materialTable}>
        <TableHead>
          <TableRow>
            {rows.map((el, index) => (
              <TableCell
                align={index === rows.length - 1 ? "right" : "left"}
                key={el.value}
                style={{
                  paddingLeft: index === 0 ? 0 : 16,
                  paddingRight: index === rows.length - 1 ? 0 : 16,
                }}
              >
                {el.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((el, index) => (
            <TableRow key={el._id}>
              {Object.keys(el).map(function (key, i) {
                return (
                  <TableCell
                    style={{
                      paddingLeft: i === 0 ? 0 : 16,
                      paddingRight: i === rows.length - 1 ? 0 : 16,
                    }}
                    key={key}
                    align={
                      key === "entries"
                        ? "right"
                        : key === "payout"
                        ? "right"
                        : "left"
                    }
                  >
                    {i === 0 && index + 1 + (second ? 10 : 0)}
                    {i === 1 &&
                      el[key].substring(0, 12) +
                        "..." +
                        el[key].substring(el[key].length - 4)}
                    {i === 2 && el[key]}
                    {i === 3 && el[key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
