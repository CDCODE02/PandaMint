import React, { useEffect, useState } from "react";
import {
  Route,
  HashRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import "./App.css";
import Navbar from "./Components/Common/Navbar/Navbar";
import LotteryContainer from "./Pages/Lottery/LotteryContainer.jsx";
import HomeContainer from "./Pages/Home/HomeContainer.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NftLotteryContainer from "./Pages/NFT Lottery/NftLotteryContainer";
import NftMintingContainer from "./Pages/NFT Minting/NftMintingContainer";
import StackingContainer from "./Pages/Stacking/StackingContainer";
import ConnectWallet from "./Components/Modal/ConnectWallet/ConnectWallet";
import { useDispatch, useSelector } from "react-redux";
import {
  connectMetamask,
  connectWalletConnect,
  disconnectWallet,
  getNftData,
  getLevelsInfo,
  getAcesPrice,
  getLottoData,
  getNftLottoData,
} from "./Redux/reduxActions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#DA3832",
      hover: "#af2c27",
    },
    background: {
      main: "#1A1B23",
      buttonSecondary: "#3B3C4E",
      border: "#3B3C4E",
      thirdBg: "#23242E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#8B8CA7",
      special: "#53F3C3",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const App = () => {
  const [isShowConnectWallet, setIsShowConnectWallet] = useState(false);
  const dispatch = useDispatch();
  let { userAddress, connectionType, chainId, acesPrice } = useSelector(
    (state) => state.common
  );

  const handleShowWallet = () => {
    if (!userAddress) {
      setIsShowConnectWallet(!isShowConnectWallet);
    } else {
      dispatch(disconnectWallet());
    }
  };

  useEffect(() => {
    if (userAddress) {
      switch (connectionType) {
        case "metamask":
          dispatch(connectMetamask());
          break;
        case "WALLET_CONNECT":
          dispatch(connectWalletConnect());
          break;

        default:
          break;
      }
    }
    dispatch(getAcesPrice());
    dispatch(getLevelsInfo());
  }, []);

  useEffect(() => {
    if (userAddress) {
      setIsShowConnectWallet(false);
    }
  }, [userAddress]);

  useEffect(() => {
    if (isShowConnectWallet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isShowConnectWallet]);

  useEffect(() => {
    dispatch(getNftData());
    dispatch(getLottoData());
    dispatch(getNftLottoData());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HttpsRedirect>
          <div className="app">
            <div
              className="main"
              style={{ backgroundColor: theme.palette.background.main }}
            >
              <Navbar
                acesPrice={acesPrice}
                chainId={chainId}
                userAddress={userAddress}
                handleWallet={handleShowWallet}
              />
              {isShowConnectWallet && (
                <ConnectWallet
                  dispatch={dispatch}
                  connectMetamask={connectMetamask}
                  connectWalletConnect={connectWalletConnect}
                  onClose={handleShowWallet}
                />
              )}
              <div className="content">
                <Routes>
                  <Route path="/" element={<LotteryContainer />} />
                  <Route
                    path="nft_minting"
                    element={
                      <NftMintingContainer handleWallet={handleShowWallet} />
                    }
                  />
                  <Route path="nft_lottery" element={<NftLotteryContainer />} />
                  <Route path="Home" element={<HomeContainer />} />
                  <Route path="staking" element={<StackingContainer />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </div>
        </HttpsRedirect>
      </Router>
    </ThemeProvider>
  );
};

export default App;
