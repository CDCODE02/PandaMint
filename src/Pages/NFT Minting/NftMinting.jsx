import { useTheme } from "@emotion/react";
import { Divider, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomButton from "../../Components/UI/Button/CustomButton";
import SecondaryCard from "../../Components/UI/Cards/SecondaryCard/SecondaryCard";
import LeftSide from "../../Components/UI/Sides/LeftSide/LeftSide";
import RightSide from "../../Components/UI/Sides/RightSide/RightSide";
import Label from "../../Components/UI/Text/Label/Label";
import classes from "./NftMinting.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mintNft, getNftLottoData } from "../../Redux/reduxActions";

const NftMinting = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { item, limit, handleLimit, handleWallet } = props;
  const dispatch = useDispatch();
  let { nft, userAddress, chainId } = useSelector((state) => state.common);

  const theme = useTheme();

  const handleMint = async () => {
    setIsLoading(true);
    let receipt = await dispatch(mintNft(limit));
    if (receipt) {
      console.log(receipt);
      dispatch(getNftLottoData());
    }
    setIsLoading(false);
  };

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
        <div className={classes.imgContainer}>
          <img src={item.image} alt="nft" className={classes.nft} />
        </div>
      </LeftSide>
      <RightSide className={classes.right}>
        <SecondaryCard className={classes.rightCard}>
          <div className={classes.rightHeader}>
            <Typography variant="h4" color={"primary"}>
              NFT Minting
            </Typography>
            <div className={classes.limit}>
              <p style={{ color: theme.palette.secondary.main }}>
                {nft.minted}
              </p>
              <p style={{ color: theme.palette.text.secondary }}>&nbsp;/ 1,000</p>
            </div>
          </div>
          <div className={classes.counterContainer}>
            <Label text="QTY" />
            <div
              className={classes.counter}
              style={{
                border: `1px solid ${theme.palette.background.border}`,
              }}
            >
              <IconButton
                style={{
                  color: theme.palette.primary.main,
                }}
                onClick={() => handleLimit("minus")}
                disabled={limit - 1 === 0}
              >
                -
              </IconButton>
              <input
                disabled
                value={limit}
                style={{ color: theme.palette.primary.main }}
              />
              <IconButton
                style={{
                  color: theme.palette.primary.main,
                }}
                onClick={() => handleLimit("plus")}
                disabled={limit + 1 > 20}
              >
                +
              </IconButton>
            </div>
          </div>
          <Label text="Amount Max 10 per transaction" />
          <div
            className={classes.priceBlock}
            style={{ backgroundColor: theme.palette.background.thirdBg }}
          >
            <div className={classes.stage}>
              <p style={{ color: theme.palette.text.primary }}>
                {limit} x {nft.price} CMP
              </p>
              <Label text="Excluding gas fee" />
            </div>
            <Divider
              style={{
                border: `1px solid ${theme.palette.background.border}`,
                width: "100%",
                margin: "16px 0",
              }}
            />
            <div className={classes.stage}>
              <Typography variant="h4">{nft.price * limit} CMP</Typography>
              <Label text="Price" />
            </div>
          </div>
          <CustomButton
            disabled={isLoading}
            onClick={userAddress ? handleMint : handleWallet}
            text="Mint"
          />
        </SecondaryCard>
      </RightSide>
    </div>
  );
};

export default NftMinting;
