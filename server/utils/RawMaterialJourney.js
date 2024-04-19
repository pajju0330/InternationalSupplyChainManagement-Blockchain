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

exports.InventoryConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();
        
        const InventoryConnector = "0xA96b09EFDd272b55A120F1a8e2fE5770A6478382"; 
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
