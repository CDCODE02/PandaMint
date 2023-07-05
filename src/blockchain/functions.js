import { ethers } from "ethers";
import { tokenABI, routerABI } from "../abis/abis";

let provider = new ethers.providers.JsonRpcProvider(
  // "https://data-seed-prebsc-2-s2.binance.org:8545/"
  "https://mainnet.block.caduceus.foundation"
);

// let tokenAddress = "0xBa847d96e2d702A9DCc016Dd524E74170B229b1A";
// let routerAddress = "0x56314e2Ed3caB059639522fC7e76a71231b4d42d";
let routerAddress = "0xb0240848456412D1a33792DF4A1178053b9aecAa"; // MAINNET
// let BNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
let CMP = "0x1fcbA3Cb797465F38839F48CA7c9cDA9d9aac28b"; // MAINNET

let routerInterface = new ethers.Contract(routerAddress, routerABI, provider);

export const getTokenBalance = async (type, address, userAddress) => {
  try {
    let balance;

    switch (type) {
      case "CMP":
        balance = await provider.getBalance(userAddress);

        return ethers.utils.formatEther(balance);
      default:
        let newInstance = new ethers.Contract(address, tokenABI, provider);
        balance = await newInstance.balanceOf(userAddress);
        let decimals = await newInstance.decimals();

        return ethers.utils.formatUnits(balance, decimals);
    }
  } catch (error) {
    console.log(error, "getTokenBalance");
  }
};

export const getQuote = async (_amount, path, quoteType, decimals) => {
  try {
    if (_amount <= 0) {
      return 0;
    }
    let receipt;
    let amount = ethers.utils.parseUnits(Number(_amount).toString(), decimals);

    if (quoteType === "IN") {
      receipt = await routerInterface.getAmountsOut(amount, path);
      return ethers.utils.formatUnits(receipt[1]);
    } else if (quoteType === "OUT") {
      receipt = await routerInterface.getAmountsIn(amount, path);
      return ethers.utils.formatUnits(receipt[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const Approve = async (address, signer) => {
  try {
    let newInstance = new ethers.Contract(address, tokenABI, signer);
    let tx = await newInstance.approve(
      routerAddress,
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error);
  }
};

export const checkAllowance = async (userAddress, address) => {
  if (userAddress) {
    try {
      let newInstance = new ethers.Contract(address, tokenABI, provider);
      let receipt = await newInstance.allowance(userAddress, routerAddress);

      return receipt;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("no user");
  }
};

export const swap = async (
  _amountIn,
  amountOut,
  path,
  userAddress,
  signer,
  decimals
) => {
  try {
    let tx;
    let newInstance = new ethers.Contract(routerAddress, routerABI, signer);
    let amountMin = (70 * amountOut) / 100;
    let amountIn = ethers.utils.parseUnits(_amountIn.toString(), decimals[0]);
    let amountOutMin = ethers.utils.parseUnits(
      amountMin.toString(),
      decimals[1]
    );
    let deadline = (Date.now() / 1000 + 1000 * 60 * 2).toFixed(0).toString();

    if (path[0] === CMP) {
      tx = await newInstance.swapExactETHForTokensSupportingFeeOnTransferTokens(
        amountOutMin,
        path,
        userAddress,
        deadline,
        { value: amountIn }
      );
    } else if (path[1] === CMP) {
      tx = await newInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountIn,
        amountOutMin,
        path,
        userAddress,
        deadline
      );
    } else {
      tx =
        await newInstance.swapExactTokensForTokensSupportingFeeOnTransferTokens(
          amountIn,
          amountOutMin,
          path,
          userAddress,
          deadline
        );
    }

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error);
  }
};
