import { useTheme } from "@emotion/react";
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CurrentJackpot from "../../Components/Common/CurrentJackpot/CurrentJackpot";
import TabTable from "../../Components/Common/TabTable/TabTable";
import MainCard from "../../Components/UI/Cards/MainCard/MainCard";
import SecondaryCard from "../../Components/UI/Cards/SecondaryCard/SecondaryCard";
import HistoryIcon from "../../Components/UI/Icons/HistoryIcon";
import SettingsIcon from "../../Components/UI/Icons/SettingsIcon";
import LeftSide from "../../Components/UI/Sides/LeftSide/LeftSide";
import RightSide from "../../Components/UI/Sides/RightSide/RightSide";
import classes from "./Lottery.module.css";
import { makeStyles } from "@mui/styles";
import SwapField from "../../Components/Common/SwapField/SwapField";
import ArrowDownSwapIcon from "../../Components/UI/Icons/ArrowDownSwapIcon";

import Label from "../../Components/UI/Text/Label/Label";
import ArrowsChangeIcon from "../../Components/UI/Icons/ArrowsChangeIcon";
import CustomButton from "../../Components/UI/Button/CustomButton";
import { parseMoney } from "../../Utils/parseMoney";
import useWindowDimensions from "../../Hooks/useWindowDimension";
import { cx } from "../../Utils/classnames";
import CloseIcon from "../../Components/UI/Icons/CloseIcon";
import ArrowLeftIcon from "../../Components/UI/Icons/ArrowLeftIcon";
import aces_logo from "../../Assets/Icons/aces_logo.png";
import cmp_logo from "../../Assets/Icons/cmp_logo.png";

import {
  getTokenBalance,
  getQuote,
  checkAllowance,
  Approve,
  swap,
} from "../../blockchain/functions";

import { useDispatch, useSelector } from "react-redux";
import {
  getLottoData,
  getUserBalances,
  pickWinner,
} from "../../Redux/reduxActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
const tokens = [
  {
    value: "CMP",
    text: "CMP",
    address: "0x1fcbA3Cb797465F38839F48CA7c9cDA9d9aac28b",
    decimals: 18,
    img: cmp_logo,
    currentValue: "0",
    balance: "0",
  },
  {
    value: "PANDA",
    text: "PANDA",
    address: "0xB3890C342B38417fE3ea507D3004353b1A8c1b28",
    decimals: 18,
    img: aces_logo,
    currentValue: "0",
    balance: "0",
  },
];

let owner = "0xc2A27043469197Baa71601ff067504e1D4ED4E5a";
let admin1 = "0xc2A27043469197Baa71601ff067504e1D4ED4E5a";
let admin2 = "0xc2A27043469197Baa71601ff067504e1D4ED4E5a";

const Lottery = (props) => {
  // const { pay, receive, handlePay, handleReceive, handleSwap, exchangeRate } =
  // props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let { lotto, acesBalance, bnbBalance, userEntries, userAddress, chainId } =
    useSelector((state) => state.common);
  let { signer } = useSelector((state) => state.signer);
  const [enoughAllowance, setEnoughAllowance] = useState(true);
  const [tokenIn, setTokenIn] = useState(tokens[0]);
  const [tokenOut, setTokenOut] = useState(tokens[1]);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [winner, setWinner] = useState("");
  const [pickingWinner, setPickingWinner] = useState(false);

  const firstInputRef = useRef();

  const theme = useTheme();

  const { width } = useWindowDimensions();

  const [isShowSwap, setIsShowSwap] = useState(false);

  const handleShowSwap = () => {
    setIsShowSwap(!isShowSwap);
    firstInputRef.current.focus();
  };

  const timer = null;

  const changeToken = async (token, side) => {
    switch (side) {
      case "IN":
        checkTokenAllowance(token);
        setTokenIn({ ...token });
        break;
      case "OUT":
        setTokenOut({ ...token });
        break;
      default:
        break;
    }
  };

  const switchSides = () => {
    changeToken(tokenOut, "IN");
    changeToken(tokenIn, "OUT");
  };

  const checkTokenAllowance = async (token) => {
    if (token.value === "CMP") {
      setEnoughAllowance(true);
    } else {
      let allowance = await checkAllowance(userAddress, token.address);
      console.log(allowance > 0, "allowance");
      setEnoughAllowance(allowance > 0);
    }
  };

  const handleAmountChange = async (num, side) => {
    let path = [tokenIn.address, tokenOut.address];
    let quote;
    switch (side) {
      case "IN":
        setAmountIn(num);
        quote = await getQuote(num, path, side, tokenIn.decimals);
        setAmountOut(
          getNumberDecimals((quote * 10 ** 18) / 10 ** tokenOut.decimals)
        );
        break;
      case "OUT":
        setAmountOut(num);
        quote = await getQuote(num, path, side, tokenOut.decimals);
        setAmountIn(
          getNumberDecimals((quote * 10 ** 18) / 10 ** tokenIn.decimals)
        );
        break;
      default:
        break;
    }
  };

  const handleSwap = async () => {
    setIsLoading(true);
    let path = [tokenIn.address, tokenOut.address];
    let decimals = [tokenIn.decimals, tokenOut.decimals];
    let receipt = await swap(
      amountIn,
      amountOut,
      path,
      userAddress,
      signer,
      decimals
    );
    if (receipt) {
      dispatch(getUserBalances(userAddress));
      dispatch(getLottoData());
      changeToken(tokenIn, "IN");
      changeToken(tokenOut, "OUT");
      console.log(receipt);
    }
    setIsLoading(false);
  };

  const handleApprove = async () => {
    setIsLoading(true);
    let receipt = await Approve(tokenIn.address, signer);
    if (receipt) {
      checkTokenAllowance(tokenIn);
      console.log(receipt);
    }
    setIsLoading(false);
  };

  const getNumberDecimals = (num) => {
    let length = Math.floor(num).toString().length;
    if (length > 4) {
      return Number(num).toFixed(0);
    } else {
      return Number(num).toFixed(8);
    }
  };

  const handleWinner = async () => {
    setPickingWinner(true);

    let winnerAddress = await pickWinner();
    setWinner(winnerAddress);

    setPickingWinner(false);
  };

  const truncate = (value, numDecimalPlaces) =>
    Math.trunc(value * Math.pow(10, numDecimalPlaces)) /
    Math.pow(10, numDecimalPlaces);

  useEffect(() => {
    changeToken(tokens[0], "IN");
    changeToken(tokens[1], "OUT");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      if (chainId !== 0x3e900) {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3e900" }],
        });
      }
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isShowSwap) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isShowSwap]);

  return (
    <div className={classes.main}>
      <LeftSide className={classes.left}>
        <CurrentJackpot
          cash={truncate(lotto.jackpot, 2)}
          actionText={"Buy Entry"}
          onClick={handleShowSwap}
        />
        <div className={classes.tickets}>
          <MainCard className={classes.ticket}>
            <p>{truncate(acesBalance, 0)}</p>
            <span>$Panda Balance</span>
          </MainCard>
          <MainCard className={classes.ticket}>
            <p>{lotto.entries}</p>
            <span>Lottery Entries</span>
          </MainCard>
          <MainCard className={classes.ticket}>
            <p>{userEntries}</p>
            <span>My Entries</span>
          </MainCard>
        </div>
        <div className={classes.table}>
          <TabTable items={lotto.addresses} winners={lotto.results} />
        </div>
        <div className={classes.table}>
          <SecondaryCard
            className={cx(classes.rightCard, classes.showSwapCard)}
          ></SecondaryCard>
        </div>
      </LeftSide>

      <RightSide
        className={cx(classes.right, isShowSwap ? classes.showSwap : "")}
      >
        <SecondaryCard
          className={cx(
            classes.rightCard,
            isShowSwap ? classes.showSwapCard : ""
          )}
        >
          <div className={classes.rightHeader}>
            <Typography variant="h4" color={"primary"}>
              Swap Tokens
            </Typography>
            <div className={classes.actions}>
              <IconButton
                style={{
                  backgroundColor: theme.palette.background.buttonSecondary,
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                style={{
                  backgroundColor: theme.palette.background.buttonSecondary,
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                <HistoryIcon />
              </IconButton>
              <IconButton
                onClick={handleShowSwap}
                className={classes.showButt}
                style={{
                  backgroundColor: theme.palette.background.buttonSecondary,
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                {!isShowSwap && <ArrowLeftIcon />}
                {isShowSwap && <CloseIcon color={theme.palette.primary.main} />}
              </IconButton>
            </div>
          </div>
          <SwapField
            tokenIcon={tokenIn.img}
            tokenName={tokenIn.value}
            leftLabel={"Pay"}
            available={
              tokenIn.value === "CMP"
                ? truncate(bnbBalance, 4)
                : truncate(acesBalance, 0)
            }
            valueText={"MAX"}
            inputRef={firstInputRef}
            value={amountIn}
            onChange={(e) => handleAmountChange(e, "IN")}
          />
          <div className={classes.iconContainer}>
            <Tooltip title="Swap">
              <IconButton onClick={switchSides}>
                <ArrowDownSwapIcon color={theme.palette.primary.main} />
              </IconButton>
            </Tooltip>
          </div>
          <SwapField
            tokenIcon={tokenOut.img}
            tokenName={tokenOut.value}
            leftLabel={"Receive (Estimated)"}
            available={
              tokenOut.value === "CMP"
                ? truncate(bnbBalance, 4)
                : truncate(acesBalance, 0)
            }
            valueText={"MAX"}
            value={amountOut}
            onChange={(e) => handleAmountChange(e, "OUT")}
          />
          <div className={classes.swapInfo}>
            <Label text={`1 CMP = ${parseMoney(10)} $PANDA`} />
            <ArrowsChangeIcon color={theme.palette.primary.main} />
          </div>
          <CustomButton
            onClick={enoughAllowance ? handleSwap : handleApprove}
            text={enoughAllowance ? "Swap Now" : `Approve ${tokenIn.value}`}
            // text="Confirm"
            disabled={isLoading}
          />
          <Label
            className={classes.totalLabel}
            text="25,000 $PANDA = 1 PANDA Entry"
          />
          <Divider
            style={{
              border: `1px solid ${theme.palette.background.border}`,
              width: "100%",
              marginTop: "24px",
            }}
          />
          <div className={classes.willGet}>
            <p style={{ color: theme.palette.text.primary }}>You will get:</p>
            <p style={{ color: theme.palette.text.special }}>
              {truncate((amountOut / 2500) % 2500, 0)} Entries!
            </p>
          </div>
          <Divider
            style={{
              border: `1px solid ${theme.palette.background.border}`,
              width: "100%",
              marginTop: "24px",
            }}
          />
          {userAddress === owner.toLowerCase() ||
          userAddress === admin1.toLowerCase() ||
          userAddress === admin2.toLowerCase() ? (
            <div className={classes.pickSection}>
              <h2>Winner Selection</h2>
              <h3>
                {pickingWinner
                  ? "Choosing a winner..."
                  : winner === ""
                  ? "Pick Winner"
                  : winner}
              </h3>
              <CustomButton
                onClick={handleWinner}
                text={"Pick"}
                // text="Confirm"
                disabled={isLoading}
              />
            </div>
          ) : (
            ""
          )}
        </SecondaryCard>
      </RightSide>
    </div>
  );
};

export default Lottery;
