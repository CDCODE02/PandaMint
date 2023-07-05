import { useTheme } from "@emotion/react";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SwapField from "../../Components/Common/SwapField/SwapField";
import StakeTable from "../../Components/Stacking/StakeTable/StakeTable";
import UnstakeTable from "../../Components/Stacking/StakeTable/UnstakeTable";
import SwitchBar from "../../Components/Stacking/Switch/SwitchBar";
import SecondaryCard from "../../Components/UI/Cards/SecondaryCard/SecondaryCard";
import QuestionIcon from "../../Components/UI/Icons/QuestionIcon";
import LeftSide from "../../Components/UI/Sides/LeftSide/LeftSide";
import RightSide from "../../Components/UI/Sides/RightSide/RightSide";
import Label from "../../Components/UI/Text/Label/Label";
import classes from "./Stacking.module.css";
import Countdown from "react-countdown";

import aces_logo from "../../Assets/Icons/aces_logo.png";
import CustomButton from "../../Components/UI/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { initAction } from "../../Redux/reduxActions";

const stakeRows = ["Period", "Daily Profit", "Earnings", "Action"];
const percents = [25, 50, 75, 100];

const Stacking = (props) => {
  const theme = useTheme();
  const { toogleValue, setToogleValue } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let { staking, userStaking, acesBalance, stakingApproved, chainId } =
    useSelector((state) => state.common);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [currentUnstakePercent, setCurrentUnstakePercent] = useState(0);
  const [stake, setStake] = useState({
    icon: aces_logo,
    name: "$PANDA",
    available: 500,
    value: "",
  });
  const [unstake, setUnstake] = useState({
    icon: aces_logo,
    name: "$PANDA",
    available: 500,
    value: "",
  });

  const handleStakePercent = (value) => {
    setCurrentPercent(Number(value));
    setStake({
      ...stake,
      value: truncateByDecimalPlace((acesBalance / 100) * Number(value), 0),
    });
  };

  const handleUnstakePercent = (value) => {
    setCurrentUnstakePercent(Number(value));
    setUnstake({
      ...unstake,
      value:
        userStaking[currentIndex].balance > 0
          ? truncateByDecimalPlace(
              (userStaking[currentIndex].balance / 100) * Number(value),
              0
            )
          : 0,
    });
  };

  const countdownRenderer = ({ formatted }) => {
    if (
      formatted.days === "00" &&
      formatted.hours === "00" &&
      formatted.minutes === "00" &&
      formatted.seconds === "00"
    ) {
      return <p> {userStaking[currentIndex].balance > 0 ? "Ready" : "-"} </p>;
    }
    if (formatted.days <= 0) {
      return (
        <p>
          {formatted.hours > 0
            ? `${formatted.hours} Hours, `
            : `${formatted.minutes}:${formatted.seconds}`}
        </p>
      );
    }

    return <p>{formatted.days} Days</p>;
  };

  const handleClick = async (type, value) => {
    setIsLoading(true);
    let receipt = await dispatch(initAction(type, currentIndex, value));
    if (receipt) {
      console.log(receipt);
    }
    setIsLoading(false);
  };

  const truncateByDecimalPlace = (value, numDecimalPlaces) =>
    (
      Math.trunc(value * Math.pow(10, numDecimalPlaces)) /
      Math.pow(10, numDecimalPlaces)
    ).toString();

  useEffect(() => {
    if (window.ethereum) {
      if (chainId !== 256256) {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3e900" }],
        });
      }
    }
  }, []);

  return (
    <div className={classes.main}>
      <LeftSide className={classes.left}>
        <Typography variant="h4" style={{ color: theme.palette.text.primary }}>
          Staking
        </Typography>
        <StakeTable
          items={staking}
          userItems={userStaking}
          rows={stakeRows}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </LeftSide>
      <RightSide className={classes.right}>
        <SecondaryCard className={classes.rightCard}>
          <SwitchBar value={toogleValue} onClick={setToogleValue} />
          {toogleValue === "stake" && (
            <>
              <div className={classes.info}>
                <div className={classes.field}>
                  <Label text="Period" />
                  <p style={{ color: theme.palette.text.primary }}>
                    {staking[currentIndex].period}
                  </p>
                </div>
                <div className={classes.field}>
                  <Label text="Daily Profit" />
                  <p style={{ color: theme.palette.text.primary }}>
                    {staking[currentIndex].daily_back}%
                  </p>
                </div>
                <div className={classes.field}>
                  <Label text="APY" />
                  <p style={{ color: theme.palette.text.primary }}>
                    {staking[currentIndex].APY}%
                  </p>
                </div>
                <div className={classes.field}>
                  <div className={classes.labelContainer}>
                    <Label text="Amount Staked" />
                    <Tooltip title="Questions?">
                      <span>
                        <QuestionIcon color={theme.palette.text.primary} />
                      </span>
                    </Tooltip>
                  </div>
                  <p style={{ color: theme.palette.text.primary }}>
                    {userStaking[currentIndex].balance} $PANDA
                  </p>
                </div>
                <div className={classes.field}>
                  <Label text="Claimable Rewards" />
                  <div className={classes.reward}>
                    <p style={{ color: theme.palette.text.special }}>
                      {userStaking[currentIndex].earnings} $PANDA
                    </p>
                    {/* <p style={{ color: theme.palette.text.primary }}>
                      &nbsp;- 0.58$
                    </p> */}
                  </div>
                </div>
              </div>
              <div className={classes.spacer}></div>
              <SwapField
                tokenIcon={stake.icon}
                tokenName={stake.name}
                leftLabel={"Stake"}
                available={acesBalance}
                valueText={"MAX"}
                onChange={(e) =>
                  setStake({
                    ...stake,
                    value: e,
                  })
                }
                value={stake.value}
                className={classes.swapField}
              />
              <div className={classes.percentButns}>
                {percents.map((el) => (
                  <Button
                    style={{
                      backgroundColor:
                        currentPercent === el
                          ? `${theme.palette.secondary.main}`
                          : `${theme.palette.background.buttonSecondary}`,
                      color: theme.palette.text.primary,
                    }}
                    onClick={() => handleStakePercent(el)}
                  >
                    {el}%
                  </Button>
                ))}
              </div>
              <CustomButton
                text={
                  stakingApproved
                    ? userStaking[currentIndex].balance > 0
                      ? "Stake & Compound"
                      : "Stake"
                    : "Approve Token"
                }
                disabled={stake.value.length === 0 || isLoading}
                onClick={
                  stakingApproved
                    ? () => handleClick("DEPOSIT", stake.value)
                    : () => handleClick("APPROVE")
                }
              />
              <div className={classes.buttons}>
                <Button
                  disabled={
                    isLoading || Number(userStaking[currentIndex].balance) <= 0
                  }
                  style={{
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.secondary.main}`,
                  }}
                  onClick={() => handleClick("CLAIM")}
                >
                  Claim Rewards
                </Button>
                <Button
                  disabled={
                    isLoading || Number(userStaking[currentIndex].balance) <= 0
                  }
                  style={{
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                  onClick={() => handleClick("COMPOUND")}
                >
                  Compound
                </Button>
              </div>
            </>
          )}
          {toogleValue === "unstake" && (
            <>
              <div
                className={classes.miniTableHeader}
                style={{ backgroundColor: theme.palette.background.thirdBg }}
              >
                {/* <Label text="Token" /> */}
                {/* <Label text="Daily Back" /> */}
                <Label text="Staked Amount" />
                <Label text="Earnings" />
                <Label text="Time Left" />
              </div>
              <div className={classes.miniTableItems}>
                <div
                  className={classes.miniTableItem}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {/* <div className={classes.miniTableToken}>
                    <img
                      src={aces_logo}
                      alt="token"
                      className={classes.miniTableTokenIcon}
                    />
                    <p>$PANDA</p>
                  </div> */}
                  {/* <div>
                    <p>{staking[currentIndex].daily_back}%</p>
                  </div> */}
                  <div>
                    <p>{userStaking[currentIndex].balance}</p>
                  </div>
                  <div>
                    <p>{userStaking[currentIndex].earnings}</p>
                  </div>
                  <div>
                    <p>
                      <Countdown
                        date={new Date(userStaking[currentIndex].unlockTime)}
                        renderer={countdownRenderer}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <SwapField
                tokenIcon={unstake.icon}
                tokenName={unstake.name}
                leftLabel={"Unstake"}
                available={
                  userStaking[currentIndex].balance > 0
                    ? userStaking[currentIndex].balance
                    : "0"
                }
                // valueText={"MAX"}
                onChange={(e) => {
                  setUnstake({
                    ...unstake,
                    value: e,
                  });
                }}
                value={unstake.value}
              />
              <div className={classes.percentButns}>
                {percents.map((el) => (
                  <Button
                    style={{
                      backgroundColor:
                        currentUnstakePercent === el
                          ? `${theme.palette.secondary.main}`
                          : `${theme.palette.background.buttonSecondary}`,
                      color: theme.palette.text.primary,
                    }}
                    onClick={() => handleUnstakePercent(el)}
                  >
                    {el}%
                  </Button>
                ))}
              </div>
              <CustomButton
                text="Unstake & Claim"
                disabled={!unstake.value || isLoading}
                onClick={() => handleClick("WITHDRAW", unstake.value)}
              />
              {userStaking[currentIndex].unlockTime > Date.now() && (
                <div className={classes.earlyWithdraw}>
                  <p>10% fee on early withdraw</p>
                </div>
              )}
            </>
          )}
        </SecondaryCard>
      </RightSide>
    </div>
  );
};

export default Stacking;
