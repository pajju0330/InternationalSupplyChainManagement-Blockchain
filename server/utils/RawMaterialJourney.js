const { ethers } = require("hardhat");
require('dotenv').config();
const fs = require('fs');
exports.RMJConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();

        const RMJConnector = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/RawMaterialContract.sol/RawMaterialJourney.json').toString()).abi;
        // console.log(abi);
        const Rmj = new ethers.Contract(RMJConnector, abi, owner);    
        // console.log(Rmj);  
        return Rmj;
    } catch (error) {
        console.log('Error initializing flipGem contract:');
        // throw error; // Rethrow the error for proper handling in the calling code
    }
};

