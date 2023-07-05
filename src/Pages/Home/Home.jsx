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
import classes from "./Home.module.css";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
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
import { BsTwitter } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { BsMedium } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import logo from "../../Assets/logo3.png";
import logo1 from "../../Assets/Icons/aces_logo.png";
import logo2 from "../../Assets/0101.gif";
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
  const navigate = useNavigate();

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

  const onClick = () => {
    navigate(`/nft_minting`);
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
    <div>
      <div className={classes.headerlogo}>
        <div className={classes.main}>
          <h1 className={classes.center}> PandaMint </h1>
        </div>
        <div className={classes.p}>
          {/* <p className={classes.p} align-items="justify">The Lottery and NFT Minting Platform Built on Caduceus Network. </p> */}
          <p className={classes.p}>
            Win the daily jackpot by minting NFTs or holding $Panda tokens.
          </p>
        </div>
        <div className={classes.button1}>
          <button
            variant="h4"
            className={classes.button}
            actionText={"Mint Now"}
            onClick={onClick}
          >
            Mint Panda🐼
          </button>
        </div>
      </div>
      <div className={classes.lottery}>
        <h1 className={classes.lotteryh1}> About </h1>
      </div>
      <div className={classes.section}>
        <section className="about-section">
          <div className="about-section-image-container">
            <img src={logo1} alt="" />
          </div>
          <div className="about-section-text-container">
            <h1 className="primary-subheading">NFT Lottery</h1>
            <p className="primary-text">
              PandaMint is a lottery and NFT minting platform built especially
              for the community.
            </p>
            <p className="primary-text">
              every NFT or $Panda token holder has a chance to win daily jackpot
              rewards at PandaMint. The PandaMint platform is built on top of
              the Caduceus network. Which chain has very good advantages. Very
              low transaction fees made us choose Caduceus as a network to
              create a PandaMint platform.
            </p>
            <div className="about-buttons-container">
              <a href="https://pandamint.gitbook.io/pandamint/introduction/pandamint-platform">
                <button className="secondary-button">WhitePaper📂</button>
              </a>
            </div>
          </div>

          <style jsx>{`
            .about-section {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 40px;
            }

            .about-section-image-container {
              width: 50%;
            }

            .about-section-image-container img {
              max-width: 100%;
              height: auto;
              margin-left: 50px;
            }

            .about-section-text-container {
              width: 50%;
            }

            .primary-subheading {
              color: #ffffff;
              font-size: 40px;
              margin-bottom: 40px;
            }

            .primary-heading {
              color: #222;
              font-size: 32px;
              margin-top: 10px;
              margin-bottom: 20px;
            }

            .primary-text {
              color: #ffffff;
              font-size: 19px;
              margin-bottom: 10px;
              margin-right: 25px;
            }

            .about-buttons-container {
              margin-top: 30px;
            }

            .secondary-button {
              background-color: #ccc;
              color: #fff;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }

            /* Responsive Styles */
            @media (max-width: 768px) {
              .about-section {
                flex-direction: column;
                margin-bottom: 20px;
              }

              .about-section-image-container {
                width: 100%;
                margin-bottom: 20px;
                margin-right: 100px;
              }

              .about-section-text-container {
                width: 100%;
                margin-left: 15px;
              }

              .primary-heading {
                font-size: 28px;
                margin-bottom: 15px;
              }

              .primary-text {
                font-size: 16px;
                margin-bottom: 8px;
              }

              .secondary-button {
                padding: 8px 16px;
              }
            }
          `}</style>
        </section>
      </div>
      <div>
        <section className="about-section">
          <div className="about-section-image-container">
            <img src={logo2} alt="" />
          </div>
          <div className="about-section-text-container">
            <h1 className="primary-subheading">How to participate</h1>
            <p className="primary-text">
              The NFT (Non-Fungible Token) Lottery is an exciting concept that
              combines the uniqueness and value of NFTs with the thrill of a
              lottery. It offers participants the opportunity to win exclusive
              jackpot through a randomized draw.
            </p>
            <p className="primary-text">
              In an NFT Lottery, participants purchase lottery tickets or
              entries using cryptocurrency or a designated token. Each ticket
              represents a chance to win a specific jackpot or a collection of
              NFTs. The more tickets a participant buys, the higher their
              chances of winning.
            </p>
            <div className={classes.button1}>
              <button
                variant="h4"
                className={classes.button}
                actionText={"Mint Now"}
                onClick={onClick}
              >
                Mint 🐼
              </button>
            </div>
          </div>

          <style jsx>{`
            .about-section {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 40px;
            }

            .about-section-image-container {
              width: 50%;
            }

            .about-section-image-container img {
              max-width: 100%;
              height: auto;
              margin-left: 50px;
            }

            .about-section-text-container {
              width: 50%;
            }

            .primary-subheading {
              color: #ffffff;
              font-size: 40px;
              margin-bottom: 40px;
            }

            .primary-heading {
              color: #222;
              font-size: 32px;
              margin-top: 10px;
              margin-bottom: 20px;
            }

            .primary-text {
              color: #ffffff;
              font-size: 19px;
              margin-bottom: 10px;
              margin-right: 25px;
            }

            .about-buttons-container {
              margin-top: 30px;
            }

            .secondary-button {
              background-color: #ccc;
              color: #fff;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }

            /* Responsive Styles */
            @media (max-width: 768px) {
              .about-section {
                flex-direction: column;
                margin-bottom: 20px;
              }

              .about-section-image-container {
                width: 100%;
                margin-bottom: 20px;
                margin-right: 100px;
              }

              .about-section-text-container {
                width: 100%;
                margin-left: 15px;
              }

              .primary-heading {
                font-size: 28px;
                margin-bottom: 15px;
              }

              .primary-text {
                font-size: 16px;
                margin-bottom: 8px;
              }

              .secondary-button {
                padding: 8px 16px;
              }
            }
          `}</style>
        </section>
      </div>
      {/* futter */}
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={logo} alt="logo" />
          </div>
          <div className="footer-icons">
            <a href="https://www.google.com/search">
              <BsTwitter color="white" fontSize="1.5em" />
            </a>
            <a href="https://www.google.com/search">
              <BsDiscord color="white" fontSize="1.5em" />
            </a>
            <a href="https://www.google.com/search">
              <FaTelegram color="white" fontSize="1.5em" />
            </a>
            <a href="https://www.google.com/search">
              <BsMedium color="white" fontSize="1.5em" />
            </a>
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <span>Qualtiy</span>
            <span>Share</span>
            <span>Carrers</span>
          </div>
          <div className="footer-section-columns">
            <span>Disclaimer</span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
          <div className="footer-section-columns">
            <span>Help Mail</span>
            <span>Info@PandaMint.xyz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lottery;
