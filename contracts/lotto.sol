// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

interface ILotteryTracker {
    function updateAccount(address account, uint256 amount) external;
    function removeEntryFromWallet(address account, uint256 amount) external;
    function removeAccount(address account) external;
    function isActiveAccount(address account) external view returns(bool);
}

contract PandaLottery is Ownable {
    uint256 public roundEntries;
    uint256 public roundNum;
    uint256 public totalPayout;

    IERC20 public WCMP = IERC20(0x1fcbA3Cb797465F38839F48CA7c9cDA9d9aac28b);

    address public pandaToken = 0xb3890c342b38417fe3ea507d3004353b1a8c1b28;
    address public treasuryWallet = 0xc2a27043469197baa71601ff067504e1d4ed4e5a;

    struct Results {
        uint256 totalEntries;
        uint256 winningNumber;
        uint256 payout;
        uint256 endTime;
        address winningAddress;
    }

    mapping(uint256 => Results) public roundResults;
    mapping(uint256 => address) public roundEntry;
    mapping(address => uint256[]) public entriesIndex;

    event LotteryWon(address winner, uint256 amount);

    constructor(){}

    modifier restricted() {
        require(owner() == _msgSender() || pandaToken == _msgSender(), "Not allowed");
        _;
    }

    function updateAccount(address account, uint256 amount) public restricted{
        for(uint256 i; i < amount; i++){
            roundEntry[roundEntries + i] = account;
            entriesIndex[account].push(roundEntries + i);
        }

        roundEntries += amount;
    }

    function batchAdd(address [] memory accounts, uint256 [] memory amounts) external restricted{
        require(accounts.length == amounts.length, "Arrays don't have same lenght");

        for (uint256 i = 0; i < accounts.length; i++) {
            updateAccount(accounts[i],amounts[i]);
        }
    }

    function removeEntryFromWallet(address account, uint256 amount) public restricted {
        uint256 currentEntries = userEntries(account);
        if(currentEntries == 0){
            return;
        } else if(amount > currentEntries){
            amount = currentEntries;
        }

        for(uint256 i = 1; i <= amount; i++){
            uint256 lastIndex = entriesIndex[account][entriesIndex[account].length - 1];
            roundEntry[lastIndex] = roundEntry[roundEntries - i];
            entriesIndex[account].pop();
        }

        roundEntries -= amount;
    }

    function removeAccount(address account) external restricted{
        uint256 currentEntries = userEntries(account);
        removeEntryFromWallet(account, currentEntries);
    }

    function isActiveAccount(address account) external view returns(bool){
        uint256 currentEntries = userEntries(account);
        return currentEntries > 0;
    }

    function pickWinner(uint256 seed) external view returns(uint256 winnerNum, address winnerAddress) {
        winnerNum = random(seed) % roundEntries;
        winnerAddress = roundEntry[winnerNum];
    }

    function updateWinner(uint256 winnerNum, uint256 payout) external onlyOwner {
        address winnerAddress = roundEntry[winnerNum];

        roundResults[roundNum] = Results ({
            totalEntries: roundEntries,
            winningNumber: winnerNum,
            payout: payout,
            endTime: block.timestamp,
            winningAddress: winnerAddress
        });

        totalPayout += payout;
        roundNum++;

        emit LotteryWon(winnerAddress, payout);
    }

    function currentJackpot() public view returns (uint256) {
        return BUSD.balanceOf(treasuryWallet);
    }

    function userEntries(address account) public view returns (uint256) {
        return entriesIndex[account].length;
    }

    function resultLog(uint256 startIndex, uint256 endIndex) external view returns(Results [] memory log){
        if(roundNum == 0){
            return log = new Results[](0);
        }

        if (endIndex >= roundNum) {
            endIndex = roundNum - 1;
        }

        uint256 arrayLength = endIndex - startIndex + 1;
        uint256 currentIndex;
        log = new Results[](arrayLength);

        for (uint256 i = startIndex; i <= endIndex; i++) {
            log[currentIndex] = roundResults[startIndex + i];
            currentIndex++;
        }
    }

    function getUniqueUsers() public view returns (uint256 counter) {
        counter;
        for(uint256 i; i < roundEntries; i++){
            address user = roundEntry[i];
            if(i == entriesIndex[user][0]){
                counter++;
            }
        }
    }

    function getUniqueAddresses() public view returns (address [] memory addresses, uint256 [] memory entries) {
        uint256 arrayLength = getUniqueUsers();
        addresses = new address[](arrayLength);
        entries = new uint256[](arrayLength);
        uint256 currentIndex;
        for(uint256 i; i < roundEntries; i++){
            address user = roundEntry[i];
            if(i == entriesIndex[user][0]){
                addresses[currentIndex] = user;
                entries[currentIndex] = entriesIndex[user].length;
                currentIndex++;
            }
        }
    }

    function random(uint256 seed) internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        seed,
                        block.timestamp,
                        gasleft(),
                        msg.sender,
                        roundEntries
                    )
                )
            );
    }
}
