import React, { useState } from "react";
import NftMinting from "./NftMinting";
import nft1 from "../../Assets/banner.png";

const NftMintingContainer = ({ handleWallet }) => {
  const [currentNft, setCurrentNft] = useState({
    image: nft1,
  });

  const [limit, setLimit] = useState(1);

  const coinRate = 18.3;

  const handleLimit = (type) => {
    if (type === "plus") {
      if (limit + 1 <= 10) {
        setLimit(limit + 1);
      }
    } else {
      if (limit - 1 != 0) {
        setLimit(limit - 1);
      }
    }
  };

  return (
    <>
      <NftMinting
        handleWallet={handleWallet}
        item={currentNft}
        limit={limit}
        handleLimit={handleLimit}
        coinRate={coinRate}
      />
    </>
  );
};

export default NftMintingContainer;
