let initialState = {
  loading: "",
  userAddress: "",
  connectionType: "",
  chainId: "",
  acesPrice: "",
  acesBalance: "15000",
  bnbBalance: "0.1",
  stakingApproved: false,
  userEntries: 0,
  nftBalance: 0,
  lotto: {
    roundNum: 0,
    results: [],
    entries: 0,
    addresses: [],
    jackpot: 0,
  },
  Nftlotto: {
    roundNum: 0,
    results: [],
    entries: 0,
    addresses: [],
    jackpot: 0,
  },
  nft: {
    minted: "",
    baseURI: "",
    price: "",
  },
  userNfts: [],
  staking: [
    {
      daily_back: "",
      APY: "",
      period: "",
    },
    {
      daily_back: "",
      APY: "",
      period: "",
    },
    {
      daily_back: "",
      APY: "",
      period: "",
    },
    {
      daily_back: "",
      APY: "",
      period: "",
    },
  ],
  userStaking: [
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
  ],
};

let commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        userAddress: action.payload.userAddress,
        connectionType: action.payload.connectionType,
      };
    case "UPDATE_PRICE":
      return {
        ...state,
        acesPrice: action.payload.price,
      };
    case "UPDATE_USER_BALANCES":
      return {
        ...state,
        acesBalance: action.payload.acesBalance,
        bnbBalance: action.payload.bnbBalance,
        userEntries: action.payload.userEntries,
        userNfts: action.payload.userNfts,
      };
    case "UPDATE_CHAIN":
      return {
        ...state,
        chainId: action.payload.chainId,
      };
    case "UPDATE_NFT":
      return {
        ...state,
        loading: false,
        nft: {
          minted: action.payload.minted,
          baseURI: action.payload.baseURI,
          price: action.payload.price,
        },
      };
    case "UPDATE_STAKING":
      return {
        ...state,
        loading: false,
        staking: [
          action.payload.level0,
          action.payload.level1,
          action.payload.level2,
          action.payload.level3,
        ],
      };
    case "UPDATE_USER_STAKING":
      return {
        ...state,
        loading: false,
        acesBalance: action.payload.balance,
        stakingApproved: action.payload.isApproved,
        userStaking: [
          action.payload.level0,
          action.payload.level1,
          action.payload.level2,
          action.payload.level3,
        ],
      };
    case "UPDATE_LOTTO_VALUES":
      return {
        ...state,
        lotto: {
          roundNum: action.payload.roundNum,
          results: action.payload.results,
          entries: action.payload.entries,
          addresses: action.payload.addresses,
          jackpot: action.payload.jackpot,
        },
      };
    case "UPDATE_NFT_LOTTO_VALUES":
      return {
        ...state,
        Nftlotto: {
          roundNum: action.payload.roundNum,
          results: action.payload.results,
          entries: action.payload.entries,
          addresses: action.payload.addresses,
          jackpot: action.payload.jackpot,
        },
      };
    case "UPDATE_NFT_BALANCE":
      return {
        ...state,
        nftBalance: action.payload.balance,
      };
    default: {
      return state;
    }
  }
};

export default commonReducer;
