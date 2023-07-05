import { Button, IconButton } from "@mui/material";
import React from "react";
import Overflow from "../../UI/Overflow/Overflow";
import classes from "./ConnectWallet.module.css";

import metamask from "../../../Assets/metamask.png";
import wallet from "../../../Assets/wallet.png";
import CloseIcon from "../../UI/Icons/CloseIcon";
import { useTheme } from "@emotion/react";
import CustomButton from "../../UI/Button/CustomButton";

const ConnectWallet = (props) => {
  const { onClose, connectMetamask, connectWalletConnect, dispatch } = props;

  const theme = useTheme();

  return (
    <Overflow>
      <div
        className={classes.main}
        style={{
          backgroundColor: theme.palette.background.main,
        }}
      >
        <div className={classes.header}>
          <h4
            style={{
              color: theme.palette.text.primary,
            }}
          >
            Connect Wallet
          </h4>
          <IconButton onClick={onClose}>
            <CloseIcon color={theme.palette.text.primary} />
          </IconButton>
        </div>
        <div className={classes.content}>
          <Button
            className={classes.button}
            onClick={() => dispatch(connectMetamask())}
            style={{
              border: `1px solid ${theme.palette.text.primary}`,
            }}
          >
            <img src={metamask} alt="metamask" />
            <p>Metamask</p>
          </Button>
          <Button
            className={classes.button}
            onClick={() => dispatch(connectWalletConnect())}
            style={{
              border: `1px solid ${theme.palette.text.primary}`,
            }}
          >
            <img src={wallet} alt="metamask" />
            <p>WalletConnect</p>
          </Button>
        </div>
        {/* <div className={classes.submit}>
                    <CustomButton text="Connect"/>
                </div> */}
      </div>
    </Overflow>
  );
};

export default ConnectWallet;
