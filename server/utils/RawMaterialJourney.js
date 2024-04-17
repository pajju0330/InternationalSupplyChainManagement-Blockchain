const { ethers } = require("hardhat");
require('dotenv').config();
const fs = require('fs');
exports.RMJConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();
        
        const RMJConnector = "0xFd80e5e78B6b496697116AB807B6b918a106aE68"; 
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/RawMaterialJourney.sol/RawMaterialJourney.json').toString()).abi;
        // console.log(abi);
        const Rmj = new ethers.Contract(RMJConnector, abi, owner);    
        // console.log(Rmj);  
        return Rmj;
    } catch (error) {
        console.log('Error initializing RawMaterialJourney contract:');
        // throw error; // Rethrow the error for proper handling in the calling code
    }
};

