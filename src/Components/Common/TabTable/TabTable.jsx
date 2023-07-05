import {
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import classes from "./TabTable.module.css";
import { useTheme } from "@emotion/react";
import TableComponent from "./TableComponent/TableComponent";

const tabStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTabs-flexContainer": {
      gap: "44px",
      borderBottom: "1px solid #3B3C4E",

      "@media screen and (max-width: 468px)": {
        gap: 0,
      },
    },
    "& .MuiTab-textColorPrimary": {
      color: theme.palette.primary.main,
      opacity: 0.5,
      textTransform: "initial",
      fontSize: "16px",
      fontWeight: "600",
    },
    "& .Mui-selected": {
      opacity: 1,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const paginationStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaginationItem-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: `rgba(218, 56, 50, 0.1)`,
      border: "1px solid rgba(218, 56, 50, 0.5)",
    },
    "& .MuiPaginationItem-root.Mui-selected:hover": {
      backgroundColor: "#42528d",
    },
  },
}));

const TabTable = (props) => {
  const { items, winners } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const [seeMore, setSeeMore] = useState(10);

  const materialTab = tabStyles();
  const materialPagination = paginationStyles();

  const handleTabIndex = (event, value) => {
    setTabIndex(value);
  };

  const theme = useTheme();

  const rows = [
    {
      value: "#",
    },
    {
      value: "CMP Address",
    },
    {
      value: "Entries",
    },
  ];

  //   endTime:
  // payout:
  // totalEntries:
  // winningAddress:
  // winningNumber:
  const winnerRows = [
    {
      value: "#",
    },
    {
      value: "Winner",
    },
    {
      value: "Payout",
    },
  ];

  return (
    <div className={classes.main}>
      <div className={classes.tabs}>
        <Tabs value={tabIndex} classes={materialTab} onChange={handleTabIndex}>
          <Tab label="Curent Entries" />
          <Tab label="Previous Winners" />
        </Tabs>
      </div>
      <div className={classes.content}>
        {tabIndex === 0 && (
          <>
            <div className={classes.tables}>
              <div className={classes.table}>
                <TableComponent items={items.slice(0, seeMore)} rows={rows} />
              </div>
              {/* <div className={classes.secondTable}>
                <TableComponent
                  items={items.slice(-10)}
                  rows={rows}
                  second={true}
                />
              </div> */}
            </div>
            <h4
              className={classes.seeMore}
              onClick={() => setSeeMore(seeMore + 5)}
            >
              see more...
            </h4>
            <div className={classes.pagination}>
              {/* <Pagination
                page={1}
                count={10}
                classes={materialPagination}
                size={"small"}
                boundaryCount={1}
                siblingCount={0}
              /> */}
            </div>
          </>
        )}
        {tabIndex === 1 && (
          <>
            <div className={classes.tables}>
              <div className={classes.table}>
                <TableComponent
                  items={winners.slice(0, 10)}
                  rows={winnerRows}
                />
              </div>
              {/* <div className={classes.secondTable}>
                <TableComponent
                  items={items.slice(-10)}
                  rows={rows}
                  second={true}
                />
              </div> */}
            </div>
            {/* <div className={classes.pagination}>
              <Pagination
                page={1}
                count={10}
                classes={materialPagination}
                size={"small"}
                boundaryCount={1}
                siblingCount={0}
              />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default TabTable;
