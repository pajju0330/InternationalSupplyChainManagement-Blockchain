const { ethers } = require("hardhat");
require('dotenv').config();
const fs = require('fs');
exports.RMJConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();
        
        const RMJConnector = "0xE089BD810B64f6cadb05B026d05fAF59eB74cB6E"; 
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

exports.InventoryConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();
        
        const InventoryConnector = "0xD097f629D22bD66270fa49c0f28ddD68358e4a37"; 
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/InventoryContract.sol/InventoryContract.json').toString()).abi;
        // console.log(abi);
        const Inventory = new ethers.Contract(InventoryConnector, abi, owner);    
        // console.log(Inventory);  
        return Inventory;
    } catch (error) {
        console.log('Error initializing InventoryContract contract:');
        // throw error; // Rethrow the error for proper handling in the calling code
    }
}
